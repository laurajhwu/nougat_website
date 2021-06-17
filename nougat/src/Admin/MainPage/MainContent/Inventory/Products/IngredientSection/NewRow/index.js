import React from "react";
import { Form, Col } from "react-bootstrap";
import convertToObj from "../../../../../../../utils/arrayToObjectConverter";
import Remove from "../Remove";
import propTypes from "prop-types";

export default function NewRow(props) {
  const {
    setAddNew,
    product,
    prodIngredient,
    setProdIngredient,
    invalid,
    remaining,
  } = props;

  function addNewIngredient(event) {
    if (event.target.value !== "choose") {
      const originalIngredientsObj = convertToObj(product.ingredients, "id");
      setAddNew(false);
      prodIngredient.push({
        id: event.target.value,
        amount: originalIngredientsObj[event.target.value]
          ? originalIngredientsObj[event.target.value].amount
          : 0,
      });
      setProdIngredient([...prodIngredient]);
    }
  }

  function addNewProductIngredient(event) {
    if (event.target.value !== "choose") {
      setAddNew(false);

      setProdIngredient([
        ...prodIngredient,
        {
          id: event.target.value,
          amount: 0,
        },
      ]);
    }
  }

  return (
    <Form.Row>
      <Form.Group as={Col} controlId="formGridState">
        <Form.Label>食材</Form.Label>
        <Form.Control
          as="select"
          defaultValue="choose"
          onChange={product ? addNewIngredient : addNewProductIngredient}
          isInvalid={invalid}
        >
          <option key="choose" value="choose">
            選取食材
          </option>
          {Object.values(remaining).map((remain) => {
            return (
              <option key={remain.id} value={remain.id}>
                {remain.name}
              </option>
            );
          })}
        </Form.Control>
        <Form.Control.Feedback type="invalid">
          請至少選取一樣食材
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group as={Col} xs={7} controlId="formGridZip">
        <Form.Label>{`每${
          product ? product.unit : "單位"
        }所需公克數`}</Form.Label>
        <Form.Control placeholder="公克" />
      </Form.Group>
      {prodIngredient.length > 0 ? (
        <Remove
          prodIngredient={prodIngredient}
          setProdIngredient={setProdIngredient}
          setAddNew={setAddNew}
          noValue={true}
        />
      ) : (
        <></>
      )}
    </Form.Row>
  );
}

NewRow.propTypes = {
  setAddNew: propTypes.func,
  product: propTypes.object,
  prodIngredient: propTypes.array,
  setProdIngredient: propTypes.func,
  invalid: propTypes.bool,
  remaining: propTypes.object,
};
