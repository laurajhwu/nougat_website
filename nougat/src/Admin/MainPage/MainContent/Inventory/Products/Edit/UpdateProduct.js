import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Col } from "react-bootstrap";
import IngredientSection from "../IngredientSection";
import { useSelector } from "react-redux";
import Api from "../../../../../../utils/Api";

import { Img, File } from "./styles";

export default function Edit(props) {
  const product = props.product;
  const [prodIngredient, setProdIngredient] = useState(copyIngredients());
  const [invalid, setInvalid] = useState({});
  const [changes, setChanges] = useState({});
  const [image, setImage] = useState(product.image);

  function copyIngredients() {
    return product.ingredients.map((ingredient) => ({ ...ingredient }));
  }

  function handleCloseModal() {
    setProdIngredient(copyIngredients());
    setImage(product.image);
    setChanges({});
    setInvalid({});
    props.handleClose();
  }

  function getEditData(event, prop) {
    const rawValue = event.target.value.trim();
    const value = isNaN(Number(rawValue)) ? rawValue : Number(rawValue);

    if (product[prop] !== value) {
      if (value) {
        changes[prop] = value;
      } else {
        changes[prop] = "empty";
      }
    } else {
      delete changes[prop];
    }
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

  function validateChanges() {
    const { name, price, stock, unit, ingredients } = changes;
    invalid.ingredients = {};
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
        name: !name ? false : name === "empty",
        price:
          !price && price !== 0 ? false : price === "empty" || isNaN(price),
        stock:
          !stock && stock !== 0 ? false : stock === "empty" || isNaN(stock),
        unit: !unit ? false : unit === "empty",
        image: !image,
      },
    });
  }

  function postEdit() {
    Api.updateProduct(product.id, changes)
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
    const valid = Object.values(invalid).every((input) => {
      if (typeof input === "object") {
        return Object.values(input).every((amount) => amount === false);
      } else {
        return input === false;
      }
    });

    if (!ingredientChanged()) {
      delete changes.ingredients;
    }

    if (Object.keys(changes).length !== 0 && valid) {
      if (changes.name) {
        Api.checkSameProduct(changes.name).then((isValid) => {
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
              isInvalid={invalid.name}
            />
            <Form.Control.Feedback type="invalid">
              報錯：名稱已被使用過或未填
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>售價</Form.Label>
              <Form.Control
                defaultValue={product.price}
                onChange={(event) => getEditData(event, "price")}
                isInvalid={invalid.price}
              />
              <Form.Control.Feedback type="invalid">
                售價為必填數字
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>剩餘庫存</Form.Label>
              <Form.Control
                defaultValue={product.stock}
                onChange={(event) => getEditData(event, "stock")}
                isInvalid={invalid.stock}
              />
              <Form.Control.Feedback type="invalid">
                庫存為必填數字
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>單位</Form.Label>
              <Form.Control
                placeholder="以出售單位為主"
                defaultValue={product.unit}
                onChange={(event) => getEditData(event, "unit")}
                isInvalid={invalid.unit}
              />
              <Form.Control.Feedback type="invalid">
                請填入單位
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <div className="mb-3">
            <File id="formcheck-api-custom" custom>
              <Form.File.Input
                accept="image/*,.pdf"
                isValid={
                  image !== product.image ? (image ? true : false) : false
                }
                isInvalid={invalid.image}
                onChange={handleUploadImage}
              />
              <Form.File.Label data-browse="上傳產品圖">
                {image || product.image}
              </Form.File.Label>
              <Img src={image || product.image} />
              <Form.Control.Feedback type="valid">
                上傳成功
              </Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                請上傳圖片
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
            invalid={invalid.ingredients}
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
