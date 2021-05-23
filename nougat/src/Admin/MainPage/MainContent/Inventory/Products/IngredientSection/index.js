import React, { useState, useEffect } from "react";
import { Form, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useSelector } from "react-redux";
import convertToObj from "../../../../../../utils/arrayToObjectConverter";
import AddNew from "./NewRow";
import Remove from "./Remove";

import { Add } from "./styles";

export default function IngredientSection(props) {
  const prodIngredient = props.prodIngredient;
  const ingredients = useSelector((state) => state.ingredients);
  const [remaining, setRemaining] = useState(IngredientsNotUsed());
  const [addNew, setAddeNew] = useState(false);

  function IngredientsNotUsed() {
    const remaining = { ...ingredients };
    prodIngredient.forEach((ingredient) => {
      delete remaining[ingredient.id];
    });
    return remaining;
  }

  function handleChangeIngredient(event, oldIngredientId) {
    const originalIngredientsObj = convertToObj(
      props.product.ingredients,
      "id"
    );
    const newIngredientId = event.target.value;
    const index = prodIngredient.findIndex(
      (ingredient) => ingredient.id === oldIngredientId
    );

    prodIngredient.splice(index, 1, {
      id: newIngredientId,
      amount: originalIngredientsObj[newIngredientId]
        ? originalIngredientsObj[newIngredientId].amount
        : 0,
    });

    props.setProdIngredient([...prodIngredient]);
  }

  function handleClickAddNew() {
    setAddeNew(true);
  }

  useEffect(() => {
    setRemaining(IngredientsNotUsed());
  }, [prodIngredient]);

  return (
    <>
      {prodIngredient.map((ingredient) => {
        return (
          <Form.Row>
            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>食材</Form.Label>
              <Form.Control
                as="select"
                defaultValue={ingredient.id}
                onChange={(event) =>
                  handleChangeIngredient(event, ingredient.id)
                }
              >
                <option key={ingredient.id} value={ingredient.id}>
                  {ingredients[ingredient.id].name}
                </option>
                {Object.values(remaining).map((remain) => {
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
              <div key={ingredient.amount}>
                <Form.Control
                  placeholder="公克"
                  defaultValue={ingredient.amount || ""}
                />
              </div>
            </Form.Group>
            <Remove
              prodIngredient={prodIngredient}
              setProdIngredient={props.setProdIngredient}
              ingredientId={ingredient.id}
            />
          </Form.Row>
        );
      })}
      {addNew ? (
        <AddNew
          setProdIngredient={props.setProdIngredient}
          product={props.product}
          remaining={remaining}
          prodIngredient={prodIngredient}
          setAddeNew={setAddeNew}
        />
      ) : (
        <></>
      )}
      {Object.keys(remaining).length === 0 ? (
        <></>
      ) : (
        <Form.Row>
          <Form.Group as={Col} xs={12}>
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip id="button-tooltip-2">新增食材</Tooltip>}
            >
              {({ ref, ...triggerHandler }) => (
                <Add
                  ref={ref}
                  {...triggerHandler}
                  onClick={handleClickAddNew}
                />
              )}
            </OverlayTrigger>
          </Form.Group>
        </Form.Row>
      )}
    </>
  );
}
