import React, { useState } from "react";
import Api from "../../../../../utils/Api";
import propTypes from "prop-types";

import { InputAdornment } from "@material-ui/core";

import {
  Container,
  Input,
  Change,
  Done,
  Suggest,
  Suggests,
  Cancel,
} from "./styles";

export default function Location(props) {
  const { order, locations } = props;
  const currentLocation = order.order_info.delivery_address;
  const [value, setValue] = useState(currentLocation);
  const [edit, setEdit] = useState(false);
  const [suggest, setSuggest] = useState();

  function getFullAddress(location) {
    const { city, district, address } = location;
    return `${city}${district}${address}`;
  }

  function handleChange(event) {
    const inputValue = event.target.value.trim();
    const suggestions = [];

    locations.forEach((location) => {
      if (
        getFullAddress(location).includes(inputValue) ||
        location.description.includes(inputValue)
      ) {
        suggestions.push(getFullAddress(location));
      }
    });
    setValue(inputValue);
    setSuggest(suggestions);
  }

  function handleEdit() {
    setEdit(true);
  }

  function handleDoneEdit(id) {
    Api.updateOrder(id, { "order_info.delivery_address": value }).then(() => {
      setEdit(false);
    });
  }

  function handleCancel() {
    setEdit(false);
    setValue(currentLocation);
    setSuggest(null);
  }

  function onSelectSuggest(address) {
    setValue(address);
    setSuggest(null);
  }

  return (
    <Container key={`${order.id}location`}>
      <Input
        value={value}
        onChange={handleChange}
        id="input-with-icon-textfield"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {edit ? (
                <>
                  <Done onClick={() => handleDoneEdit(order.id)} />
                  <Cancel onClick={handleCancel} />
                </>
              ) : (
                <Change onClick={handleEdit} />
              )}
            </InputAdornment>
          ),
        }}
        disabled={!edit}
      />
      <Suggests>
        {suggest ? (
          suggest.map((option, index) => (
            <Suggest key={index} onClick={() => onSelectSuggest(option)}>
              {option}
            </Suggest>
          ))
        ) : (
          <></>
        )}
      </Suggests>
    </Container>
  );
}

Location.propTypes = {
  order: propTypes.object,
  locations: propTypes.array,
};
