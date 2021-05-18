import React from "react";
import styled from "styled-components";
import Api from "../utils/Api";
import convertArrToObj from "../utils/arrayToObjectConverter";
import { CartPlus, CartPlusFill } from "@styled-icons/bootstrap";
import { useDispatch } from "react-redux";
import { updateMember } from "../redux/actions/member";

const Add = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

const CartPlusIcon = styled(CartPlus)`
  width: 25px;
`;
const CartPlusFillIcon = styled(CartPlusFill)`
  width: 25px;
`;

const CartButton = styled.button``;

function AddToCart(props) {
  const dispatch = useDispatch();
  const path = window.location.pathname;
  const cartObject = convertArrToObj(props.member.cart_items, "id");
  const isInCart = cartObject[props.productId];

  function addOnClick() {
    if (!isInCart) {
      Api.getSpecificProduct(props.productId).then((product) => {
        const { name, image, id, price, stock } = product;
        const newCartItem = {
          name,
          image,
          id,
          price,
          stock,
          qty: props.qty,
        };
        props.member.cart_items.push(newCartItem);
        Api.updateCartItems(props.member);
        dispatch(updateMember(props.member));
        alert("已加入購物車");
      });
    } else if (cartObject[props.productId].qty !== props.qty) {
      cartObject[props.productId].qty = props.qty;
      Api.updateCartItems(props.member);
      alert("已更換商品數量");
    }
  }

  return (
    <Add onClick={addOnClick}>
      {path === "/products" ? (
        isInCart ? (
          <CartPlusFillIcon />
        ) : (
          <CartPlusIcon className="cart-plus-icon" />
        )
      ) : (
        <CartButton>加入購物車</CartButton>
      )}
    </Add>
  );
}

export default AddToCart;
