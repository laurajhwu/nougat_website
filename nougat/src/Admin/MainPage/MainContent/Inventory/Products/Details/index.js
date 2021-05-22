import React from "react";
import { useSelector } from "react-redux";
import { Modal, Button } from "react-bootstrap";

import { Img, List, Item, Description } from "./styles";

export default function Details(props) {
  const product = props.product;
  const ingredients = useSelector((state) => state.ingredients);
  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{product.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Img src={product.image} />
        <List horizontal>
          <div> 成分：</div>
          {product.ingredients.map((ingredient, index) => {
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
          })}
        </List>
        <List>
          <Description variant="light" key={product.id}>
            {`簡述：${product.description}`}
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
