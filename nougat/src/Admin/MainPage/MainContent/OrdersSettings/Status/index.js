import React from "react";
import { useSelector } from "react-redux";
import Api from "../../../../../utils/Api";

import { FormControl, MenuItem, Select } from "@material-ui/core";

import { Container } from "./styles";

export default function Status(props) {
  const { order } = props;
  const fixedData = useSelector((state) => state.fixedData);

  function handleStatusChange(event) {
    const statusNum = event.target.value;

    if (window.confirm(`確認更改狀態為"${fixedData.status[statusNum]}"嗎?`)) {
      Api.updateOrder(order.id, { status: +statusNum });
    }
  }

  if (Object.keys(fixedData).length !== 0) {
    return (
      <Container>
        <FormControl>
          <Select value={order.status} onChange={handleStatusChange}>
            {Object.entries(fixedData.status)
              .sort((a, b) => a[1] - b[1])
              .map(([key, value], index) => (
                <MenuItem key={index} value={+key}>
                  {value}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Container>
    );
  } else {
    return <>Loading...</>;
  }
}
