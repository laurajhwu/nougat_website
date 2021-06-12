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
      props.setAddNew(false);
      props.prodIngredient.push({
        id: event.target.value,
        amount: originalIngredientsObj[event.target.value]
          ? originalIngredientsObj[event.target.value].amount
          : 0,
      });
      props.setProdIngredient([...props.prodIngredient]);
    }
  }

  function addNewProductIngredient(event) {
    if (event.target.value !== "choose") {
      props.setAddNew(false);

      props.setProdIngredient([
        ...props.prodIngredient,
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
          onChange={props.product ? addNewIngredient : addNewProductIngredient}
          isInvalid={props.invalid ? props.invalid : false}
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
        <Form.Control.Feedback type="invalid">
          請至少選取一樣食材
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group as={Col} xs={7} controlId="formGridZip">
        <Form.Label>{`每${
          props.product ? props.product.unit : "單位"
        }所需公克數`}</Form.Label>
        <Form.Control placeholder="公克" />
      </Form.Group>
      {props.prodIngredient.length > 0 ? (
        <Remove
          prodIngredient={props.prodIngredient}
          setProdIngredient={props.setProdIngredient}
          setAddNew={props.setAddNew}
          noValue={true}
        />
      ) : (
        <></>
      )}
    </Form.Row>
  );
}
