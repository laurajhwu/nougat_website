import React from "react";
import CartItems from "./CartItems";
import propTypes from "prop-types";

import { Label } from "../styles";
import { Products, GrandTotal } from "./styles";

export default function Purchases(props) {
  const { member, getOrderTotal, cartItems } = props;
  return (
    <>
      <Label> 購物車 ({cartItems.length})</Label>
      <Products>
        <CartItems member={member} />
        <GrandTotal>
          <div>總計：</div>
          <div>$ {getOrderTotal()}</div>
        </GrandTotal>
      </Products>
    </>
  );
}

Purchases.propTypes = {
  member: propTypes.object,
  getOrderTotal: propTypes.func,
  cartItems: propTypes.array,
};
