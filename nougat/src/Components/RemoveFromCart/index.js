import React from "react";
import Api from "../../utils/Api";

import { DeleteIcon } from "./styles";

export default function Delete(props) {
  function deleteOnClick() {
    const cartItems = props.member.cart_items.filter(
      (item) => item.id !== props.productId
    );

    props.isClickedRef.current = false;

    Api.updateMember(props.member.id, "cart_items", cartItems).then(() => {
      props.setIsClicked && props.setIsClicked(false);
    });
  }

  return (
    <DeleteIcon onClick={deleteOnClick} styles={props.styles}></DeleteIcon>
  );
}
