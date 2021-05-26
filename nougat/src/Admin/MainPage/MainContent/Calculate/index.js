import React, { useState } from "react";
import { useSelector } from "react-redux";
import convertToObj from "../../../../utils/arrayToObjectConverter";
import {
  Select,
  MenuItem,
  FormHelperText,
  FormControl,
  TextField,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Button,
} from "@material-ui/core";

import {
  Container,
  Form,
  Title,
  Ingredients,
  Ingredient,
  Text,
  ControlArea,
} from "./styles";

export default function Calculate() {
  const products = useSelector((state) => state.products);
  const ingredients = useSelector((state) => state.ingredients);
  const productsObj = convertToObj(products, "id");
  const [value, setValue] = useState("");
  const [error, setError] = useState({});
  const [data, setData] = useState({});

  function handleSelect(event) {
    setValue(event.target.value);
  }

  function onAmountChange(event, id) {
    data[id] = +event.target.value.trim();
    if (isNaN(data[id])) {
      error[id] = true;
    } else {
      delete error[id];
    }
  }

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

      {productsObj[value] ? (
        <FormControl>
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
                  />
                </ListItemSecondaryAction>
              </Ingredient>
            ))}
            <ControlArea>
              <Button variant="contained" color="secondary" disabled={true}>
                更新庫存
              </Button>
              <Button variant="contained" color="primary" type="submit">
                計算
              </Button>
            </ControlArea>
          </Ingredients>
        </FormControl>
      ) : (
        ""
      )}
    </Container>
  );
}
