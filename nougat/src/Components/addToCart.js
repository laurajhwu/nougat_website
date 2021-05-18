import React from "react";
import styled from "styled-components";
import Api from "../utils/Api";
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

function AddToCart(props) {
  const dispatch = useDispatch();
  const path = window.location.pathname;
  const isInCart = props.member.cart_items.some(
    (product) => product.id === props.productId
  );

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
      });
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
        <></>
      )}
    </Add>
  );
}

export default AddToCart;
