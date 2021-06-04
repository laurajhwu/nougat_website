import React, { useState, useEffect } from "react";
import Api from "../../utils/Api";
import convertArrToObj from "../../utils/arrayToObjectConverter";
import { gsap } from "gsap";

import {
  Add,
  CartPlusFillIcon,
  CartPlusIcon,
  CartButton,
  CartDisableIcon,
} from "./styles";

export default function AddToCart(props) {
  const { setAddEvent, setIsClicked, addToCartAnimation } = props;
  const path = window.location.pathname;
  const cartItems = props.member ? props.member.cart_items : null;
  const cartObject = cartItems ? convertArrToObj(cartItems, "id") : {};
  const isInCart = cartObject[props.productId];

  function addOnClick() {
    if (!cartItems) {
      alert("請先登入！");
    } else if (!isInCart) {
      Api.getSpecificProduct(props.productId).then((product) => {
        const { name, image, id, stock, price, unit } = product;
        const newCartItem = {
          name,
          image,
          id,
          stock,
          price,
          unit,
          qty: props.qty,
          total: price * props.qty,
        };
        cartItems.push(newCartItem);
        Api.updateMember(props.member.id, "cart_items", cartItems).then(() => {
          if (path === "/products") {
            setAddEvent(product.id);
            setIsClicked(true);
          } else {
            addToCartAnimation();
            // alert("已加入購物車");
          }
        });
      });
    } else if (
      cartObject[props.productId].qty !== props.qty &&
      path === "/product"
    ) {
      cartObject[props.productId].qty = props.qty;
      cartObject[props.productId].total =
        props.qty * cartObject[props.productId].price;
      Api.updateMember(props.member.id, "cart_items", cartItems);
      alert("已更換商品數量");
    }
  }

  return (
    <Add onClick={addOnClick} disabled={props.soldOut}>
      {path === "/products" ? (
        isInCart ? (
          <CartPlusFillIcon />
        ) : props.soldOut ? (
          <CartDisableIcon />
        ) : (
          <CartPlusIcon className="cart-plus-icon" />
        )
      ) : (
        <CartButton disabled={props.soldOut ? "disabled" : ""}>
          加入購物車
        </CartButton>
      )}
    </Add>
  );
}
