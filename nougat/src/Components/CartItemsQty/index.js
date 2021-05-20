import React from "react";
import Api from "../../utils/Api";
import qtyOptions from "../../utils/qtyOptions";
import { useSelector, useDispatch } from "react-redux";
import { updateMember } from "../../redux/actions/member";

import { QuantityBar, Select, Option } from "./styles";

export default function QuantityBtn(props) {
  const dispatch = useDispatch();
  const member = useSelector((state) => state.member);

  function handleChange(event) {
    const cartItems = member.cart_items;
    const product = cartItems.find(
      (cartItem) => cartItem.id === props.productId
    );
    product.qty = Number(event.target.value);
    product.total = product.qty * product.price;
    Api.updateMember(member.id, "cart_items", cartItems);
    dispatch(updateMember("cart_items", cartItems));
  }

  return (
    <QuantityBar>
      <Select onChange={handleChange}>
        {qtyOptions(props.stock).map((option) =>
          option === props.qty.toFixed(1) ? (
            <Option value={option} selected>
              {option}
            </Option>
          ) : (
            <Option value={option}>{option}</Option>
          )
        )}
      </Select>
      斤
    </QuantityBar>
  );
}
