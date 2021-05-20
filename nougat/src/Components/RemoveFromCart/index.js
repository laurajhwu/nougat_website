import React from "react";
import { useDispatch } from "react-redux";
import { updateMember } from "../../redux/actions/member";
import Api from "../../utils/Api";

import { DeleteIcon } from "./styles";

export default function Delete(props) {
  const dispatch = useDispatch();

  function deleteOnClick() {
    const cartItems = props.member.cart_items.filter(
      (item) => item.id !== props.productId
    );
    Api.updateMember(props.member.id, "cart_items", cartItems);
    alert("已從購物車移除");
    dispatch(updateMember("cart_items", cartItems));
  }

  return <DeleteIcon onClick={deleteOnClick}></DeleteIcon>;
}
