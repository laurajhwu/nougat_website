import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Col } from "react-bootstrap";
import IngredientSection from "../IngredientSection";
import { useSelector } from "react-redux";

import { Container } from "./styles";

export default function Edit(props) {
  const product = props.product;
  const [prodIngredient, setProdIngredient] = useState([
    ...product.ingredients,
  ]);

  return (
    <Modal
      show={props.show}
      onHide={() => {
        props.handleClose();
        setProdIngredient([...product.ingredients]);
        console.log("hi");
      }}
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

          <IngredientSection
            prodIngredient={prodIngredient}
            setProdIngredient={setProdIngredient}
            product={product}
          />
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
