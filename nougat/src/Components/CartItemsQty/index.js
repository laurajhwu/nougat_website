import React, { useState } from "react";
import Api from "../../utils/Api";
import qtyOptions from "../../utils/qtyOptions";
import { useSelector } from "react-redux";
import propTypes from "prop-types";

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
    select: {
      "&:before": {
        borderColor: "#9d858d",
      },
      "&:after": {
        borderColor: "#bba0b2",
      },
    },
    option: {
      color: "#710627",
      backgroundColor: "#bba0b2",
      "&:hover": {
        backgroundColor: "#e7dadc",
      },
      fontFamily: "chalk",
      "& *": {},
    },
  }));
}

export default function QuantityBtn(props) {
  const { productId, qty, stock, menuStyle, selectStyle, containerStyle } =
    props;
  const member = useSelector((state) => state.member);
  const cartItems = member.cart_items;
  const product = cartItems.find((cartItem) => cartItem.id === productId);
  const [selectedOption, setSelectedOption] = useState(qty);
  const classes = useStyles();

  function handleChange(event) {
    setSelectedOption(event.target.value);
    product.qty = Number(event.target.value);
    product.total = product.qty * product.price;
    Api.updateMember(member.id, "cart_items", cartItems);
  }

  return (
    <QuantityBar style={containerStyle}>
      <Select
        onChange={handleChange}
        value={selectedOption}
        style={selectStyle}
        className={classes.select}
        inputProps={{
          classes: {
            icon: classes.icon,
          },
        }}
      >
        {qtyOptions(stock).map((option, index) => {
          return (
            <MenuItem
              value={+option}
              style={menuStyle}
              className={classes.option}
              key={index}
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

QuantityBtn.propTypes = {
  productId: propTypes.string,
  qty: propTypes.number,
  stock: propTypes.number,
  menuStyle: propTypes.object,
  selectStyle: propTypes.object,
  containerStyle: propTypes.object,
};
