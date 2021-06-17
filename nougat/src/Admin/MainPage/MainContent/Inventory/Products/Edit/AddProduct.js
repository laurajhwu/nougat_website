import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Modal, Button, Form, Col } from "react-bootstrap";
import IngredientSection from "../IngredientSection";
import Api from "../../../../../../utils/Api";
import propTypes from "prop-types";

import { Img, File } from "./styles";

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

  function getEditData(event, prop) {
    const rawValue = event.target.value.trim();
    const value = isNaN(Number(rawValue)) ? rawValue : Number(rawValue);

    changes[prop] = value;
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

  function submitEdit() {
    const valid = Object.values(invalid).every((input) => {
      if (typeof input === "object") {
        return Object.values(input).every((amount) => amount === false);
      } else {
        return input === false;
      }
    });

    if (Object.keys(changes).length !== 0 && valid) {
      if (changes.name) {
        Api.checkSameProduct(changes.name).then((isValid) => {
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
      show={show}
      onHide={handleCloseModal}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>新增產品</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handOnSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Label>產品名稱</Form.Label>
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
              <Form.Label>售價</Form.Label>
              <Form.Control
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
                isValid={!!image}
                isInvalid={invalid.image}
                onChange={handleUploadImage}
              />
              <Form.File.Label data-browse="上傳產品圖">
                {image || ""}
              </Form.File.Label>
              <Img src={image || ""} />
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
              placeholder="成分、注意事項等"
              onChange={(event) => getEditData(event, "description")}
            />
          </Form.Group>

          <IngredientSection
            prodIngredient={prodIngredient}
            setProdIngredient={setProdIngredient}
            getEditData={getEditData}
            invalid={invalid.ingredients}
          />
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

Edit.propTypes = {
  handleClose: propTypes.func,
  show: propTypes.bool,
};
