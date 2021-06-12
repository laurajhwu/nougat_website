import React from "react";
import { Col } from "react-bootstrap";
import { RemoveIcon, RemoveContainer } from "./styles";

export default function Remove(props) {
  function handleRemove() {
    if (props.noValue) {
      props.setAddNew(false);
    } else {
      const index = props.prodIngredient.findIndex(
        (ingredient) => ingredient.id === props.ingredientId
      );
      props.prodIngredient.splice(index, 1);
      props.setProdIngredient([...props.prodIngredient]);
    }
  }

  return (
    <RemoveContainer as={Col} xs={1}>
      <RemoveIcon onClick={handleRemove} />
    </RemoveContainer>
  );
}
