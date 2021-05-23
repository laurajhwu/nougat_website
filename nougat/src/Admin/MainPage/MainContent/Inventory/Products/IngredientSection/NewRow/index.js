import React, { useEffect } from "react";
import { Form, Col } from "react-bootstrap";
import convertToObj from "../../../../../../../utils/arrayToObjectConverter";
import Remove from "../Remove";

import { Container } from "./styles";

export default function NewRow(props) {
  function addNewIngredient(event) {
    if (event.target.value !== "choose") {
      const originalIngredientsObj = convertToObj(
        props.product.ingredients,
        "id"
      );
      props.setAddeNew(false);
      props.prodIngredient.push({
        id: event.target.value,
        amount: originalIngredientsObj[event.target.value]
          ? originalIngredientsObj[event.target.value].amount
          : 0,
      });
      props.setProdIngredient([...props.prodIngredient]);
    }
  }

  return (
    <Form.Row>
      <Form.Group as={Col} controlId="formGridState">
        <Form.Label>食材</Form.Label>
        <Form.Control
          as="select"
          defaultValue="choose"
          onChange={addNewIngredient}
        >
          <option key="choose" value="choose">
            選取食材
          </option>
          {Object.values(props.remaining).map((remain) => {
            return (
              <option key={remain.id} value={remain.id}>
                {remain.name}
              </option>
            );
          })}
        </Form.Control>
      </Form.Group>

      <Form.Group as={Col} xs={7} controlId="formGridZip">
        <Form.Label>{`每${props.product.unit}所需公克數`}</Form.Label>
        <Form.Control placeholder="公克" />
      </Form.Group>
      <Remove
        prodIngredient={props.prodIngredient}
        setProdIngredient={props.setProdIngredient}
        noValue={true}
        setAddeNew={props.setAddeNew}
      />
    </Form.Row>
  );
}
