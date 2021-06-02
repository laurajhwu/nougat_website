import React, { useState } from "react";
import Api from "../../utils/Api";
import qtyOptions from "../../utils/qtyOptions";
import { useSelector, useDispatch } from "react-redux";
import { updateMember } from "../../redux/actions/member";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { QuantityBar } from "./styles";

export default function QuantityBtn(props) {
  const dispatch = useDispatch();
  const member = useSelector((state) => state.member);
  const cartItems = member.cart_items;
  const product = cartItems.find((cartItem) => cartItem.id === props.productId);
  const [selectedOption, setSelectedOption] = useState(+props.qty);

  function handleChange(event) {
    setSelectedOption(event.target.value);
    product.qty = Number(event.target.value);
    product.total = product.qty * product.price;
    Api.updateMember(member.id, "cart_items", cartItems);
    dispatch(updateMember("cart_items", cartItems));
  }

  return (
    <QuantityBar style={props.containerStyle}>
      <Select
        onChange={handleChange}
        value={selectedOption}
        style={props.selectStyle}
      >
        {qtyOptions(props.stock).map((option) => {
          return (
            <MenuItem value={+option} style={props.menuStyle}>
              {option}
            </MenuItem>
          );
        })}
      </Select>
      {product.unit}
    </QuantityBar>
  );
}
