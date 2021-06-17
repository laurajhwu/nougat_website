import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import convertToObj from "../../../../utils/arrayToObjectConverter";
import Dialog from "./Dialog";
import { SnackbarProvider } from "notistack";
import {
  Select,
  MenuItem,
  FormHelperText,
  TextField,
  ListItemSecondaryAction,
  InputAdornment,
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
  const providerRef = useRef();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [error, setError] = useState();
  const [isValid, setIsValid] = useState(false);
  const [data, setData] = useState();
  const [result, setResult] = useState();

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function setInit() {
    setError({});
    setData({});
    formRef.current.reset();
    setResult("");
    setIsValid(false);
  }

  function handleSelect(event) {
    setValue(event.target.value);
    setError({});
    setData({});
    setResult("");
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

  function handleReset() {
    setError({});

    setResult("");
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
    <SnackbarProvider
      maxSnack={2}
      autoHideDuration={3000}
      anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
      ref={providerRef}
    >
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
              <MenuItem value={product.id} key={product.id}>
                {product.name}
              </MenuItem>
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
                <Ingredient key={ingredient.id}>
                  <Text
                    id={ingredient.id}
                    primary={ingredients[ingredient.id].name}
                  />
                  <ListItemSecondaryAction>
                    <TextField
                      id="standard-size-small"
                      size="small"
                      onChange={(event) => onAmountChange(event, ingredient.id)}
                      error={error[ingredient.id]}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">克</InputAdornment>
                        ),
                      }}
                    />
                    <FormHelperText id="standard-helper-text">
                      欲使用克數
                    </FormHelperText>
                  </ListItemSecondaryAction>
                </Ingredient>
              ))}
              <ControlArea>
                <Btn
                  variant="contained"
                  color="secondary"
                  disabled={!result}
                  onClick={handleOpen}
                >
                  更新庫存
                </Btn>
                {result || result === 0 ? (
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
                      onClick={handleReset}
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

        <Dialog
          open={open}
          handleClose={handleClose}
          productId={value}
          ingredients={ingredients}
          data={data}
          productAmount={result}
          productsObj={productsObj}
          reset={setInit}
          providerRef={providerRef}
        />
      </Container>
    </SnackbarProvider>
  );
}
