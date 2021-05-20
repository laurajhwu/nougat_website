import React from "react";
import styled from "styled-components";
import Api from "../utils/Api";
import { DeleteOutline } from "@styled-icons/typicons";
import { useDispatch } from "react-redux";
import { updateMember } from "../redux/actions/member";

const DeleteIcon = styled(DeleteOutline)`
  width: 25px;
  &:hover {
    cursor: pointer;
  }
`;

function Delete(props) {
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

export default Delete;
