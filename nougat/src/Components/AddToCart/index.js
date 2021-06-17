import React from "react";
import { useDispatch } from "react-redux";
import Api from "../../utils/Api";
import convertArrToObj from "../../utils/arrayToObjectConverter";
import { useAddedAlert, useError } from "../../Hooks/useAlert";
import propTypes from "prop-types";

import {
  Add,
  CartPlusFillIcon,
  CartPlusIcon,
  CartButton,
  CartDisableIcon,
} from "./styles";
import { setQtyDiff } from "../../redux/actions/qtyChange";

export default function AddToCart(props) {
  const addedAlert = useAddedAlert();
  const errorAlert = useError("請先登入！");
  const dispatch = useDispatch();
  const {
    setAddEvent,
    setIsClicked,
    addToCartAnimation,
    isClickedRef,
    member,
    soldOut,
    productId,
    qty,
  } = props;
  const path = window.location.pathname;
  const cartItems = member ? member.cart_items : null;
  const cartObject = cartItems ? convertArrToObj(cartItems, "id") : {};
  const isInCart = cartObject[productId];

  function addOnClick() {
    if (!cartItems) {
      errorAlert();
    } else if (!isInCart) {
      Api.getSpecificProduct(productId).then((product) => {
        const { name, image, id, price, unit } = product;
        const newCartItem = {
          name,
          image,
          id,
          price,
          unit,
          qty: qty,
          total: price * qty,
        };

        cartItems.push(newCartItem);

        if (path === "/products") {
          isClickedRef.current = true;
        }

        Api.updateMember(member.id, "cart_items", cartItems)
          .then(() => {
            if (path === "/products") {
              setAddEvent(product.id);
              setIsClicked(true);
            } else {
              addToCartAnimation();
            }
            addedAlert.fire();
          })
          .catch(() => (isClickedRef.current = false));
      });
    } else if (cartObject[productId].qty !== qty && path === "/product") {
      const original = cartObject[productId].qty;
      cartObject[productId].qty = qty;
      cartObject[productId].total = qty * cartObject[productId].price;
      Api.updateMember(member.id, "cart_items", cartItems).then(() => {
        dispatch(setQtyDiff(qty - original));
      });
    }
  }

  return (
    <Add onClick={addOnClick} disabled={soldOut}>
      {path === "/products" ? (
        isInCart ? (
          <CartPlusFillIcon />
        ) : soldOut ? (
          <CartDisableIcon />
        ) : (
          <CartPlusIcon className="cart-plus-icon" />
        )
      ) : (
        <CartButton disabled={soldOut ? "disabled" : ""}>加入購物車</CartButton>
      )}
    </Add>
  );
}

AddToCart.propTypes = {
  setAddEvent: propTypes.func,
  setIsClicked: propTypes.func,
  addToCartAnimation: propTypes.func,
  isClickedRef: propTypes.oneOfType([
    propTypes.func,
    propTypes.shape({ current: propTypes.bool }),
  ]),
  member: propTypes.object,
  soldOut: propTypes.bool,
  productId: propTypes.string,
  qty: propTypes.number,
};
