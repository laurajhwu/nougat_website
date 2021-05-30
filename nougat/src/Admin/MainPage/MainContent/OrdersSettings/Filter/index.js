import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { stringDate } from "../../../../../utils/dateTimeFormat";

import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {
  Container,
  FilterIcon,
  FilterArea,
  FilterOptions,
  FilterOption,
  InputArea,
  SelectArea,
} from "./styles";

export default function Filter(props) {
  const { orders, filteredOrders, setFilteredOrders } = props;
  const fixedData = useSelector((state) => state.fixedData);
  const [filter, setFilter] = useState("");
  const [selectOptions, setSelectOptions] = useState();
  const [searchValue, setSearchValue] = useState();

  function onChangeFilter(event) {
    setFilter(event.target.value);
  }

  function onChangeSearchInput(event) {
    const value = event.target.value;
    setSearchValue(typeof value === "string" ? value.trim() : value);
  }

  function handleSelectOptions() {
    if (filter === "status") {
      return Object.entries(fixedData.status).sort((a, b) => a[1] - b[1]);
    }
    if (filter === "order_info payment") {
      return Object.entries(fixedData.payment);
    }
    return null;
  }

  function searchOrders() {
    const prop = filter.split(" ");
    if (!filter || (!searchValue && searchValue !== 0)) {
      setFilteredOrders(null);
    } else if (filter === "email") {
    } else {
      setFilteredOrders(
        orders.filter((order) => {
          const orderValue = order[prop[0]][prop[1]] || order[prop[0]];
          return isNaN(orderValue)
            ? (typeof orderValue === "object"
                ? stringDate(orderValue.toDate())
                : orderValue
              ).includes(searchValue)
            : orderValue === searchValue;
        })
      );
    }
  }

  useEffect(() => {
    setSelectOptions(handleSelectOptions());
    setSearchValue("");
    setFilteredOrders(null);
  }, [filter]);

  useEffect(() => {
    searchOrders();
  }, [searchValue]);

  return (
    <Container>
      <FilterArea>
        <FilterIcon />
        <FilterOptions selected="" onChange={onChangeFilter}>
          <FilterOption value=""></FilterOption>
          <FilterOption value="email">信箱</FilterOption>
          <FilterOption value="personal_info line_id">Line ID</FilterOption>
          <FilterOption value="timestamp">下單日期</FilterOption>
          <FilterOption value="order_info delivery_time">面交日期</FilterOption>
          <FilterOption value="order_info delivery_address">
            面交地點
          </FilterOption>
          <FilterOption value="id">訂單編號</FilterOption>
          <FilterOption value="status">訂單狀態</FilterOption>
          <FilterOption value="order_info payment">付款方式</FilterOption>
        </FilterOptions>
      </FilterArea>

      {filter ? (
        (filter === "status" || filter === "order_info payment") &&
        selectOptions ? (
          <SelectArea>
            <FormControl>
              <Select value={searchValue} onChange={onChangeSearchInput}>
                {selectOptions.map(([key, value]) => (
                  <MenuItem value={isNaN(key) ? key : +key}>{value}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </SelectArea>
        ) : (
          <InputArea>
            <TextField
              id="standard-search"
              label="搜尋"
              type="search"
              value={searchValue}
              onChange={onChangeSearchInput}
            />
          </InputArea>
        )
      ) : (
        <></>
      )}
    </Container>
  );
}
