import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Modal, Button, Alert, Fade } from "react-bootstrap";
import Api from "../../../../../../utils/Api";

import {
  Img,
  List,
  Item,
  Description,
  CameraIcon,
  FileInput,
  Title,
} from "./styles";

export default function Details(props) {
  const product = props.product;
  const ingredients = useSelector((state) => state.ingredients);
  const [show, setShow] = useState(false);

  function uploadImage(event, id) {
    const file = event.target.files[0];
    if (file) {
      Api.getImageUrl("product_image", file).then((url) => {
        if (url) {
          Api.updateProduct(id, { image: url });
          setShow(true);
          window.setTimeout(() => {
            setShow(false);
          }, 2000);
        } else {
          alert("上傳失敗");
        }
      });
    } else {
      alert("檔案有誤");
    }
  }

  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{product.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Fade in={true} show={show}>
          <Alert variant="success">上傳成功</Alert>
        </Fade>
        <label htmlFor="upload-image">
          <CameraIcon />
          <FileInput
            type="file"
            accept="image/*"
            id="upload-image"
            onChange={(event) => uploadImage(event, product.id)}
          />
        </label>
        <Img src={product.image} />
        <List horizontal>
          <div> 成分：</div>
          {product.ingredients.map((ingredient, index) => {
            if (ingredients[ingredient.id]) {
              if (index % 2 === 0) {
                return (
                  <Item action variant="primary" key={ingredient.id}>
                    {ingredients[ingredient.id].name}
                  </Item>
                );
              } else {
                return (
                  <Item action variant="warning" key={ingredient.id}>
                    {ingredients[ingredient.id].name}
                  </Item>
                );
              }
            } else {
              return <></>;
            }
          })}
        </List>
        <List>
          <Description variant="light" key={product.id}>
            <Title>簡述</Title>
            {product.description}
          </Description>
        </List>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          關閉
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
