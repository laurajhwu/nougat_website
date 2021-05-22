import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Col } from "react-bootstrap";
import { useSelector } from "react-redux";

import { Container } from "./styles";

export default function Edit(props) {
  const product = props.product;
  const ingredients = useSelector((state) => state.ingredients);
  const [remaining, setRemaining] = useState(IngredientsNotUsed());

  function IngredientsNotUsed() {
    const remaining = { ...ingredients };
    console.log(remaining);
    product.ingredients.forEach((ingredient) => {
      delete remaining[ingredient.id];
    });
    console.log(product.ingredients);
    return remaining;
  }

  useEffect(() => {
    console.log(remaining);
  }, []);

  return (
    <Modal
      show={props.show}
      onHide={props.handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>{product.name}</Modal.Title>
        <small>{product.id}</small>
      </Modal.Header>
      <Form>
        <Modal.Body>
          <Form.Group>
            <Form.Label>產品名稱</Form.Label>
            <Form.Control defaultValue={product.name} />
          </Form.Group>

          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>售價</Form.Label>
              <Form.Control defaultValue={product.price} />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>剩餘庫存</Form.Label>
              <Form.Control defaultValue={product.stock} />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>單位</Form.Label>
              <Form.Control
                placeholder="請以出售單位為主"
                defaultValue={product.unit}
              />
            </Form.Group>
          </Form.Row>

          <div className="mb-3">
            <Form.File id="formcheck-api-custom" custom>
              <Form.File.Input accept="image/*,.pdf" isValid="" />
              <Form.File.Label data-browse="上傳產品圖">
                {product.image}
              </Form.File.Label>
              <Form.Control.Feedback type="valid">
                上傳成功
              </Form.Control.Feedback>
            </Form.File>
          </div>

          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>產品簡述</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              defaultValue={product.description}
            />
          </Form.Group>
          {product.ingredients.map((ingredient) => {
            return (
              <Form.Row>
                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>食材</Form.Label>
                  <Form.Control as="select" defaultValue={ingredient.id}>
                    <option key={ingredient.id} value={ingredient.id}>
                      {ingredients[ingredient.id].name}
                    </option>
                    {Object.values(remaining).map((remain) => {
                      return (
                        <option key={remain.id} value={remain.id}>
                          {remain.name}
                        </option>
                      );
                    })}
                  </Form.Control>
                </Form.Group>

                <Form.Group as={Col} xs={8} controlId="formGridZip">
                  <Form.Label>{`每${product.unit}所需公克數`}</Form.Label>
                  <Form.Control
                    placeholder="公克"
                    defaultValue={ingredient.amount}
                  />
                </Form.Group>
              </Form.Row>
            );
          })}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" type="submit" onClick={props.handleClose}>
            修改
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
