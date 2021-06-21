import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Api from "../../../../../../utils/Api";
import propTypes from "prop-types";
import FormBase from "./FormBase";

export default function Edit(props) {
  const { ingredient, handleClose, show } = props;
  const [invalid, setInvalid] = useState({});
  const [changes, setChanges] = useState({});

  function handleCloseModal() {
    setChanges({});
    setInvalid({});
    handleClose();
  }

  function handleOnSubmit(event) {
    event.preventDefault();
    setChanges({ ...changes });
  }

  function validateChanges() {
    const { name, used, stock } = changes;

    setInvalid({
      ...invalid,
      ...{
        name: !name ? false : name === "empty",
        used: !used || used === 0 ? false : used === "empty" || isNaN(used),
        stock:
          !stock || stock === 0 ? false : stock === "empty" || isNaN(stock),
      },
    });
  }

  function postEdit() {
    Api.updateIngredients(ingredient.id, changes)
      .then(() => {
        handleCloseModal();
      })
      .catch((error) => {
        alert("修改失敗！");
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
        <Modal.Title>{ingredient.name}</Modal.Title>
        <small
          style={{ alignSelf: "flex-end", marginLeft: 10, color: "#59594A" }}
        >
          {ingredient.id}
        </small>
      </Modal.Header>
      <FormBase
        {...{
          handleOnSubmit,
          changes,
          invalid,
          ingredient,
          buttonProps: { variant: "danger" },
          buttonLabel: "修改",
          postEdit,
          validateChanges,
        }}
      />
    </Modal>
  );
}

Edit.propTypes = {
  handleClose: propTypes.func,
  ingredient: propTypes.object,
  show: propTypes.bool,
};
