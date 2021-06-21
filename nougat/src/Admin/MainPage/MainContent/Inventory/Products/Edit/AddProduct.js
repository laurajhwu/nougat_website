import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import propTypes from "prop-types";
import Api from "../../../../../../utils/Api";
import FormBase from "./FormBase";

export default function Edit(props) {
  const { handleClose, show } = props;
  const products = useSelector((state) => state.products);
  const [prodIngredient, setProdIngredient] = useState([]);
  const [invalid, setInvalid] = useState({});
  const [changes, setChanges] = useState({});
  const [image, setImage] = useState();

  function handleCloseModal() {
    setProdIngredient([]);
    setImage("");
    setChanges({});
    setInvalid({});
    handleClose();
  }

  function handleOnSubmit(event) {
    event.preventDefault();
    setChanges({
      ...changes,
      ...{
        ingredients: prodIngredient,
        created_time: new Date(),
        display_order: products.length + 1,
        description: changes.description ? changes.description : "",
      },
    });
  }

  function validateChanges() {
    const { name, price, stock, unit, ingredients } = changes;
    invalid.ingredients = ingredients.length === 0 ? true : {};
    ingredients.forEach((ingredient) => {
      if (isNaN(ingredient.amount)) {
        invalid.ingredients = {
          ...invalid.ingredients,
          [ingredient.id]: true,
        };
      } else {
        invalid.ingredients = {
          ...invalid.ingredients,
          [ingredient.id]: false,
        };
      }
    });

    setInvalid({
      ...invalid,
      ...{
        name: !name,
        price: (!price && price !== 0) || isNaN(price),
        stock: (!stock && stock !== 0) || isNaN(stock),
        unit: !unit,
        image: !image,
      },
    });
  }

  function postEdit() {
    Api.addProduct(changes)
      .then(() => {
        handleCloseModal();
      })
      .catch((error) => {
        alert("新增失敗！");
        throw error;
      });
  }

  return (
    <Modal
      show={show}
      onHide={handleCloseModal}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>新增產品</Modal.Title>
      </Modal.Header>
      <FormBase
        {...{
          handleOnSubmit,
          changes,
          invalid,
          image,
          setImage,
          validateChanges,
          ingredientProps: {
            prodIngredient,
            setProdIngredient,
          },
          postEdit,
          buttonProps: { variant: "warning" },
          buttonLabel: "新增",
        }}
      />
    </Modal>
  );
}

Edit.propTypes = {
  handleClose: propTypes.func,
  show: propTypes.bool,
};
