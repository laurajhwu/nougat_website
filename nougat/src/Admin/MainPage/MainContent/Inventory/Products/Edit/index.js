import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Col } from "react-bootstrap";
import IngredientSection from "../IngredientSection";
import { useSelector } from "react-redux";
import Api from "../../../../../../utils/Api";

import { Container, Img, File } from "./styles";

export default function Edit(props) {
  const product = props.product;
  const [prodIngredient, setProdIngredient] = useState([
    ...product.ingredients,
  ]);
  const [changes, setChanges] = useState({});
  const [image, setImage] = useState();

  function handleCloseModal() {
    setProdIngredient([...product.ingredients]);
    setImage(null);
    setChanges({});
    props.handleClose();
  }

  function getEditData(event, prop) {
    const value = event.target.value;
    if (product[prop] !== value.trim()) {
      changes[prop] = isNaN(Number(value)) ? value : Number(value);
    } else {
      delete changes[prop];
    }
  }

  function handleUploadImage(event) {
    if (event.target.files[0]) {
      Api.getImageUrl("product_image", event.target.files[0])
        .then((url) => {
          changes.image = url;
          setImage(url);
        })
        .catch((error) => {
          setImage(null);
          delete changes.image;
          throw error;
        });
    } else {
      setImage(null);
      delete changes.image;
    }
  }

  function handOnSubmit(event) {
    event.preventDefault();
    changes.ingredients = prodIngredient;
    setChanges({ ...changes });
  }

  function postEdit() {
    Api.submitProductEdit(product.id, changes)
      .then(() => {
        alert("已修改");
        handleCloseModal();
      })
      .catch((error) => {
        alert("修改失敗！");
        throw error;
      });
  }

  function submitEdit() {
    if (Object.keys(changes).length !== 0) {
      if (changes.name) {
        Api.checkSameProduct(changes.name).then((isValid) => {
          if (isValid) {
            postEdit();
          } else {
            alert("該產品名稱已被使用！");
          }
        });
      } else {
        postEdit();
      }
    }
  }

  useEffect(() => {
    submitEdit();
  }, [changes]);

  return (
    <Modal
      show={props.show}
      onHide={handleCloseModal}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>{product.name}</Modal.Title>
        <small>{product.id}</small>
      </Modal.Header>
      <Form onSubmit={handOnSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Label>產品名稱</Form.Label>
            <Form.Control
              onChange={(event) => getEditData(event, "name")}
              defaultValue={product.name}
            />
          </Form.Group>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>售價</Form.Label>
              <Form.Control
                defaultValue={product.price}
                onChange={(event) => getEditData(event, "price")}
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>剩餘庫存</Form.Label>
              <Form.Control
                defaultValue={product.stock}
                onChange={(event) => getEditData(event, "stock")}
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>單位</Form.Label>
              <Form.Control
                placeholder="請以出售單位為主"
                defaultValue={product.unit}
                onChange={(event) => getEditData(event, "unit")}
              />
            </Form.Group>
          </Form.Row>
          <div className="mb-3">
            <File id="formcheck-api-custom" custom>
              <Form.File.Input
                accept="image/*,.pdf"
                isValid={image ? "true" : ""}
                onChange={handleUploadImage}
              />
              <Form.File.Label data-browse="上傳產品圖">
                {image || product.image}
              </Form.File.Label>
              <Img src={image || product.image} />
              <Form.Control.Feedback type="valid">
                上傳成功
              </Form.Control.Feedback>
            </File>
          </div>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>產品簡述</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              defaultValue={product.description}
              onChange={(event) => getEditData(event, "description")}
            />
          </Form.Group>

          <IngredientSection
            prodIngredient={prodIngredient}
            setProdIngredient={setProdIngredient}
            product={product}
            getEditData={getEditData}
          />
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
