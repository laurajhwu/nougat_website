import React from "react";
import { Col } from "react-bootstrap";
import { RemoveIcon, RemoveContainer } from "./styles";
import propTypes from "prop-types";

export default function Remove(props) {
  const {
    noValue,
    setAddNew,
    prodIngredient,
    setProdIngredient,
    ingredientId,
  } = props;

  function handleRemove() {
    if (noValue) {
      setAddNew(false);
    } else {
      const index = prodIngredient.findIndex(
        (ingredient) => ingredient.id === ingredientId
      );
      prodIngredient.splice(index, 1);
      setProdIngredient([...prodIngredient]);
    }
  }

  return (
    <RemoveContainer as={Col} xs={1}>
      <RemoveIcon onClick={handleRemove} />
    </RemoveContainer>
  );
}

Remove.propTypes = {
  setAddNew: propTypes.func,
  prodIngredient: propTypes.array,
  setProdIngredient: propTypes.func,
  noValue: propTypes.bool,
  ingredientId: propTypes.string,
};
