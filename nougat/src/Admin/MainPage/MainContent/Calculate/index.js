import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import convertToObj from "../../../../utils/arrayToObjectConverter";
import {
  Select,
  MenuItem,
  FormHelperText,
  TextField,
  ListItemSecondaryAction,
} from "@material-ui/core";

import {
  Container,
  Form,
  Title,
  Ingredients,
  Ingredient,
  Text,
  ControlArea,
  Result,
  ProduceAmount,
  Btn,
  Reset,
} from "./styles";

export default function Calculate() {
  const products = useSelector((state) => state.products);
  const ingredients = useSelector((state) => state.ingredients);
  const productsObj = convertToObj(products, "id");
  const formRef = useRef();
  const [value, setValue] = useState("");
  const [error, setError] = useState();
  const [isValid, setIsValid] = useState(false);
  const [data, setData] = useState();
  const [result, setResult] = useState();

  function handleSelect(event) {
    setValue(event.target.value);
    setError({});
    setData({});
    formRef.current.reset();
  }

  function initErrorState() {
    if (productsObj[value]) {
      const obj = {};
      productsObj[value].ingredients.forEach((ingredient) => {
        obj[ingredient.id] = false;
      });
      return obj;
    } else {
      return null;
    }
  }

  function onAmountChange(event, id) {
    data[id] = +event.target.value.trim();

    if (data[id] === 0) {
      delete data[id];
    } else if (isNaN(data[id])) {
      error[id] = true;
    }
  }

  function validateData() {
    if (Object.values(data).every((value) => !isNaN(value))) {
      setIsValid(true);
    } else {
      setError({ ...initErrorState(), ...error });
    }
  }

  function calculate() {
    const productIngredientObj = convertToObj(
      productsObj[value].ingredients,
      "id"
    );

    const filterIngredients = Object.entries(data).map(([id, amount]) =>
      Math.floor(amount / productIngredientObj[id].amount)
    );

    return Math.min(...filterIngredients);
  }

  function onClickCalculate() {
    if (data) {
      setData({ ...data });
    }
  }

  function onClickReset() {
    setError({});
    setData({});
    setResult("");
    formRef.current.reset();
    setIsValid(false);
  }

  useEffect(() => {
    if (data && Object.keys(data).length !== 0) {
      validateData();
    }
  }, [data]);

  useEffect(() => {
    if (isValid) {
      setResult(calculate());
    }
  }, [isValid]);

  return (
    <Container>
      <Form>
        <Select
          value={value}
          onChange={handleSelect}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem value="" disabled>
            請選擇產品
          </MenuItem>
          {products.map((product) => (
            <MenuItem value={product.id}>{product.name}</MenuItem>
          ))}
        </Select>
        <FormHelperText>產品</FormHelperText>
      </Form>
      <form ref={formRef}>
        {productsObj[value] ? (
          <Ingredients
            dense
            subheader={
              <Title>
                食材 <span>*若未填或值為0，則不列入計算</span>
              </Title>
            }
          >
            {productsObj[value].ingredients.map((ingredient) => (
              <Ingredient>
                <Text
                  id={ingredient.id}
                  primary={ingredients[ingredient.id].name}
                />
                <ListItemSecondaryAction>
                  <TextField
                    label="欲使用克數"
                    id="standard-size-small"
                    size="small"
                    onChange={(event) => onAmountChange(event, ingredient.id)}
                    error={error[ingredient.id]}
                  />
                </ListItemSecondaryAction>
              </Ingredient>
            ))}
            <ControlArea>
              <Btn
                variant="contained"
                color="secondary"
                disabled={result ? false : true}
              >
                更新庫存
              </Btn>
              {result ? (
                <Result>
                  <ProduceAmount
                    disabled
                    id="standard-disabled"
                    label="總計"
                    defaultValue={`${result} ${productsObj[value].unit}`}
                  />
                  <Reset
                    variant="outlined"
                    color="primary"
                    onClick={onClickReset}
                  >
                    重新計算
                  </Reset>
                </Result>
              ) : (
                <Btn
                  variant="contained"
                  color="primary"
                  onClick={onClickCalculate}
                >
                  計算
                </Btn>
              )}
            </ControlArea>
          </Ingredients>
        ) : (
          ""
        )}
      </form>
    </Container>
  );
}
