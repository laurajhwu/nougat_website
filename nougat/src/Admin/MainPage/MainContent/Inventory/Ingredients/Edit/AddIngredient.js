import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import propTypes from "prop-types";
import Api from "../../../../../../utils/Api";
import FormBase from "./FormBase";

export default function Edit(props) {
  const { handleClose, show } = props;
  const [invalid, setInvalid] = useState({});
  const [changes, setChanges] = useState({});

  function handleCloseModal() {
    setChanges({});
    setInvalid({});
    handleClose();
  }

  function handleOnSubmit(event) {
    event.preventDefault();
    changes.notes = changes.notes ? changes.notes : "";
    setChanges({ ...changes });
  }

  function validateChanges() {
    const { name, used, stock } = changes;

    setInvalid({
      ...invalid,
      ...{
        name: !name,
        used: (!used && used !== 0) || isNaN(used),
        stock: (!stock && stock !== 0) || isNaN(stock),
      },
    });
  }

  function postEdit() {
    Api.addIngredient(changes)
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
        <Modal.Title>新增食材</Modal.Title>
      </Modal.Header>
      <FormBase
        {...{
          handleOnSubmit,
          changes,
          invalid,
          buttonProps: { variant: "warning" },
          buttonLabel: "新增",
          postEdit,
          validateChanges,
        }}
      />
    </Modal>
  );
}

Edit.propTypes = {
  handleClose: propTypes.func,
  show: propTypes.bool,
};
