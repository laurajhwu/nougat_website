import React, { useState, useEffect } from "react";
import { Form, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useSelector } from "react-redux";
import convertToObj from "../../../../../../utils/arrayToObjectConverter";
import AddNew from "./NewRow";
import Remove from "./Remove";

import { Add } from "./styles";

export default function IngredientSection(props) {
  const { prodIngredient } = props;
  const ingredients = useSelector((state) => state.ingredients);
  const [remaining, setRemaining] = useState(IngredientsNotUsed());
  const [addNew, setAddNew] = useState(!props.product);

  function IngredientsNotUsed() {
    const remaining = { ...ingredients };
    prodIngredient.forEach((ingredient) => {
      delete remaining[ingredient.id];
    });
    return remaining;
  }

  function handleChangeIngredient(event, oldIngredientId) {
    const newIngredientId = event.target.value;
    if (prodIngredient.length !== 0) {
      const originalIngredientsObj = convertToObj(
        props.product ? props.product.ingredients : prodIngredient,
        "id"
      );

      const index = prodIngredient.findIndex(
        (ingredient) => ingredient.id === oldIngredientId
      );

      prodIngredient.splice(index, 1, {
        id: newIngredientId,
        amount: originalIngredientsObj[newIngredientId]
          ? originalIngredientsObj[newIngredientId].amount
          : 0,
      });
    } else {
      prodIngredient.push({ id: newIngredientId, amount: 0 });
    }

    props.setProdIngredient([...prodIngredient]);
  }

  function handleChangeAmount(event, id) {
    const value = event.target.value;
    prodIngredient.find((ingredient) => ingredient.id === id).amount = isNaN(
      Number(value)
    )
      ? value
      : Number(value);
  }

  function handleClickAddNew() {
    setAddNew(true);
  }

  useEffect(() => {
    setRemaining(IngredientsNotUsed());
  }, [prodIngredient]);

  if (ingredients) {
    return (
      <>
        {prodIngredient.map((ingredient) => {
          return (
            <Form.Row key={ingredient.id}>
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
                <Form.Label>{`每${
                  props.product ? props.product.unit : "單位"
                }所需公克數`}</Form.Label>
                <div key={ingredient.amount}>
                  <Form.Control
                    placeholder="公克"
                    defaultValue={ingredient.amount || ""}
                    onChange={(event) =>
                      handleChangeAmount(event, ingredient.id)
                    }
                    isInvalid={
                      props.invalid ? props.invalid[ingredient.id] : false
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    請輸入數字
                  </Form.Control.Feedback>
                </div>
              </Form.Group>
              {props.prodIngredient.length > 1 ? (
                <Remove
                  prodIngredient={prodIngredient}
                  setProdIngredient={props.setProdIngredient}
                  ingredientId={ingredient.id}
                />
              ) : (
                <></>
              )}
            </Form.Row>
          );
        })}
        {addNew ? (
          <AddNew
            setProdIngredient={props.setProdIngredient}
            product={props.product}
            remaining={remaining}
            prodIngredient={prodIngredient}
            setAddNew={setAddNew}
            invalid={props.invalid}
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
  } else {
    return "Loading...";
  }
}
