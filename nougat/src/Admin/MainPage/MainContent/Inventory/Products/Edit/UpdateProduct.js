import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import Api from "../../../../../../utils/Api";
import propTypes from "prop-types";
import FormBase from "./FormBase";

export default function Edit(props) {
  const { product, handleClose, show } = props;
  const [prodIngredient, setProdIngredient] = useState();
  const [invalid, setInvalid] = useState({});
  const [changes, setChanges] = useState({});
  const [image, setImage] = useState(product.image);

  function copyIngredients() {
    return product.ingredients.map((ingredient) => ({ ...ingredient }));
  }

  function handleCloseModal(submit = false) {
    if (!submit) {
      setProdIngredient(copyIngredients());
      setImage(product.image);
    }
    setChanges({});
    setInvalid({});
    handleClose();
  }

  function ingredientChanged() {
    if (prodIngredient.length !== product.ingredients.length) {
      return true;
    } else {
      const isSame = prodIngredient.reduce((isSame, ingredient) => {
        const match = product.ingredients.find(
          (match) =>
            match.id === ingredient.id && match.amount === ingredient.amount
        );
        if (!match) {
          return false;
        }
        return isSame;
      }, true);

      return !isSame;
    }
  }

  function handleOnSubmit(event) {
    event.preventDefault();
    changes.ingredients = prodIngredient;
    setChanges({ ...changes });
  }

  function validateChanges() {
    const { name, price, stock, unit, ingredients } = changes;

    invalid.ingredients = {};
    if (!ingredientChanged()) {
      delete changes.ingredients;
    } else {
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
    }

    setInvalid({
      ...invalid,
      ...{
        name: !name ? false : name === "empty",
        price:
          !price || price === 0 ? false : price === "empty" || isNaN(price),
        stock:
          !stock || stock === 0 ? false : stock === "empty" || isNaN(stock),
        unit: !unit ? false : unit === "empty",
        image: !image,
      },
    });
  }

  function postEdit() {
    Api.updateProduct(product.id, changes)
      .then(() => {
        handleCloseModal(true);
      })
      .catch((error) => {
        alert("修改失敗！");
        throw error;
      });
  }

  useEffect(() => {
    if (product) {
      setProdIngredient(copyIngredients());
    }
  }, [product]);

  if (prodIngredient) {
    return (
      <Modal
        show={show}
        onHide={handleCloseModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{product.name}</Modal.Title>
          <small
            style={{ alignSelf: "flex-end", marginLeft: 10, color: "#59594A" }}
          >
            {product.id}
          </small>
        </Modal.Header>
        <FormBase
          {...{
            handleOnSubmit,
            changes,
            invalid,
            image,
            setImage,
            product,
            initValue: "empty",
            validateChanges,
            ingredientProps: {
              prodIngredient,
              setProdIngredient,
              product,
            },
            postEdit,
            buttonProps: { variant: "danger" },
            buttonLabel: "修改",
          }}
        />
      </Modal>
    );
  } else {
    return <>Loading...</>;
  }
}

Edit.propTypes = {
  handleClose: propTypes.func,
  product: propTypes.object,
  show: propTypes.bool,
};
