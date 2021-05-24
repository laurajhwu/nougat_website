import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Col } from "react-bootstrap";
import Api from "../../../../../../utils/Api";

import {} from "./styles";

export default function Edit(props) {
  const [invalid, setInvalid] = useState({});
  const [changes, setChanges] = useState({});

  function handleCloseModal() {
    setChanges({});
    setInvalid({});
    props.handleClose();
  }

  function getEditData(event, prop) {
    const rawValue = event.target.value.trim();
    const value = isNaN(Number(rawValue)) ? rawValue : Number(rawValue);
    changes[prop] = value;
  }

  function handOnSubmit(event) {
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
        alert("已新增");
        handleCloseModal();
      })
      .catch((error) => {
        alert("新增失敗！");
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
            changes.name = "";
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
      show={props.show}
      onHide={handleCloseModal}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>新增食材</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handOnSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Label>材料名稱</Form.Label>
            <Form.Control
              onChange={(event) => getEditData(event, "name")}
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
              onChange={(event) => getEditData(event, "notes")}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" type="submit">
            新增
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
