import React, { useEffect } from "react";
import propTypes from "prop-types";
import Api from "../../../../../../utils/Api";
import TableCell from "../../TableCell";
import IngredientSection from "../IngredientSection";

import { Modal, Button, Form, Col } from "react-bootstrap";
import { Img, File } from "./styles";

export default function FormBase(props) {
  const {
    handleOnSubmit,
    changes,
    invalid,
    image,
    setImage,
    product,
    validateChanges,
    ingredientProps,
    postEdit,
    initValue,
    buttonProps,
    buttonLabel,
  } = props;

  const fixedCellProps = { changes, item: product };

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

  function submitEdit(initValue) {
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
            changes.name = initValue;
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
      submitEdit(initValue || "");
    }
  }, [invalid]);

  return (
    <Form onSubmit={handleOnSubmit}>
      <Modal.Body>
        <TableCell
          label="產品名稱"
          changeProp="name"
          isInvalid={invalid.name}
          invalidMsg="報錯：名稱已被使用過或未填"
          options={{ defaultValue: product?.name }}
          {...fixedCellProps}
        />
        <Form.Row>
          <TableCell
            label="售價"
            changeProp="price"
            isInvalid={invalid.price}
            invalidMsg="售價為必填數字"
            groupOptions={{ as: Col }}
            options={{ defaultValue: product?.price }}
            {...fixedCellProps}
          />
          <TableCell
            label="剩餘庫存"
            changeProp="stock"
            isInvalid={invalid.stock}
            invalidMsg="庫存為必填數字"
            groupOptions={{ as: Col }}
            options={{ defaultValue: product?.stock }}
            {...fixedCellProps}
          />
          <TableCell
            label="單位"
            changeProp="unit"
            isInvalid={invalid.unit}
            invalidMsg="請填入單位"
            options={{
              placeholder: "以出售單位為主",
              defaultValue: product?.unit,
            }}
            groupOptions={{ as: Col }}
            {...fixedCellProps}
          />
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
              {image || product?.image || ""}
            </Form.File.Label>
            <Img src={image || product?.image || ""} />
            <Form.Control.Feedback type="valid">上傳成功</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              請上傳圖片
            </Form.Control.Feedback>
          </File>
        </div>
        <TableCell
          label="產品簡述"
          changeProp="description"
          options={{
            placeholder: "成分、注意事項等",
            as: "textarea",
            rows: 3,
            defaultValue: product?.description,
          }}
          {...fixedCellProps}
        />
        <IngredientSection {...ingredientProps} invalid={invalid.ingredients} />
      </Modal.Body>
      <Modal.Footer>
        <Button {...buttonProps} type="submit">
          {buttonLabel}
        </Button>
      </Modal.Footer>
    </Form>
  );
}

FormBase.propTypes = {
  changes: propTypes.object.isRequired,
  handleOnSubmit: propTypes.func.isRequired,
  invalid: propTypes.object.isRequired,
  image: propTypes.string.isRequired,
  setImage: propTypes.func.isRequired,
  product: propTypes.object,
  validateChanges: propTypes.func.isRequired,
  postEdit: propTypes.func.isRequired,
  ingredientProps: propTypes.object.isRequired,
  buttonProps: propTypes.object,
  buttonLabel: propTypes.string.isRequired,
  initValue: propTypes.string,
};
