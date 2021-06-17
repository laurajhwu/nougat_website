import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Col } from "react-bootstrap";
import Api from "../../../../../../utils/Api";
import propTypes from "prop-types";

import {} from "./styles";

export default function Edit(props) {
  const { ingredient, handleClose, show } = props;
  const [invalid, setInvalid] = useState({});
  const [changes, setChanges] = useState({});

  function handleCloseModal() {
    setChanges({});
    setInvalid({});
    handleClose();
  }

  function getEditData(event, prop) {
    const rawValue = event.target.value.trim();
    const value = isNaN(Number(rawValue)) ? rawValue : Number(rawValue);

    if (ingredient[prop] !== value) {
      if (value || value === 0) {
        changes[prop] = value;
      } else {
        changes[prop] = "empty";
      }
    } else {
      delete changes[prop];
    }
  }

  function handOnSubmit(event) {
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

  function submitEdit() {
    const valid = Object.values(invalid).every((input) => input === false);

    if (Object.keys(changes).length !== 0 && valid) {
      if (changes.name) {
        Api.checkSameIngredient(changes.name).then((isValid) => {
          if (isValid) {
            postEdit();
          } else {
            changes.name = "empty";
            validateChanges();
          }
        });
      } else {
        postEdit();
      }
    }
  }

  useEffect(() => {
    if (Object.keys(changes).length !== 0) {
      validateChanges();
    }
  }, [changes]);

  useEffect(() => {
    if (Object.keys(invalid).length !== 0) {
      submitEdit();
    }
  }, [invalid]);

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
      <Form onSubmit={handOnSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Label>材料名稱</Form.Label>
            <Form.Control
              onChange={(event) => getEditData(event, "name")}
              defaultValue={ingredient.name}
              isInvalid={invalid.name}
            />
            <Form.Control.Feedback type="invalid">
              報錯：名稱已被使用過或未填
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>已使用</Form.Label>
              <Form.Control
                defaultValue={ingredient.used}
                onChange={(event) => getEditData(event, "used")}
                isInvalid={invalid.used}
              />
              <Form.Control.Feedback type="invalid">
                已使用量為必填數字
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>剩餘庫存</Form.Label>
              <Form.Control
                defaultValue={ingredient.stock}
                onChange={(event) => getEditData(event, "stock")}
                isInvalid={invalid.stock}
              />
              <Form.Control.Feedback type="invalid">
                庫存為必填數字
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>

          <Form.Group>
            <Form.Label>食材備註</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              defaultValue={ingredient.notes}
              onChange={(event) => getEditData(event, "notes")}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" type="submit">
            修改
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

Edit.propTypes = {
  handleClose: propTypes.func,
  ingredient: propTypes.object,
  show: propTypes.bool,
};
