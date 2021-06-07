import React, { useState } from "react";
import Api from "../../utils/Api";
import qtyOptions from "../../utils/qtyOptions";
import { useSelector } from "react-redux";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { QuantityBar } from "./styles";
import { makeStyles } from "@material-ui/core/styles";

let useStyles;

if (window.location.pathname === "/cart") {
  useStyles = makeStyles((theme) => ({
    option: {
      "background-color": "#EFD2CB",
      "&:hover": {
        "background-color": "#CC7B82",
      },
    },
    select: {
      width: "60px",
      "&:before": {
        borderColor: "#EFD2CB",
      },
      "&:after": {
        borderColor: "#CC7B82",
      },
    },
    icon: { fill: "#CC7B82" },
  }));
} else {
  useStyles = makeStyles((theme) => ({
    option: {
      backgroundColor: "#dbe6e6",
      "&:hover": {
        backgroundColor: "#f1f9f6",
      },
    },
  }));
}

export default function QuantityBtn(props) {
  const member = useSelector((state) => state.member);
  const cartItems = member.cart_items;
  const product = cartItems.find((cartItem) => cartItem.id === props.productId);
  const [selectedOption, setSelectedOption] = useState(props.qty);
  const classes = useStyles();

  function handleChange(event) {
    setSelectedOption(event.target.value);
    product.qty = Number(event.target.value);
    product.total = product.qty * product.price;
    Api.updateMember(member.id, "cart_items", cartItems);
  }

  return (
    <QuantityBar style={props.containerStyle}>
      <Select
        onChange={handleChange}
        value={selectedOption}
        style={props.selectStyle}
        className={classes.select}
        inputProps={{
          classes: {
            icon: classes.icon,
          },
        }}
      >
        {qtyOptions(props.stock).map((option) => {
          return (
            <MenuItem
              value={+option}
              style={props.menuStyle}
              className={classes.option}
            >
              {option}
            </MenuItem>
          );
        })}
      </Select>
      {product.unit}
    </QuantityBar>
  );
}
