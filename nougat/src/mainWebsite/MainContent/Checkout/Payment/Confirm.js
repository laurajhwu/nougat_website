import React, { useEffect } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Api from "../../../../utils/Api";
import updateProductStock from "../../../../utils/updateProductStock";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const Order = styled.div``;

let isLoading = false;

function Confirm() {
  const order = JSON.parse(window.localStorage.getItem("order"));
  const member = useSelector((state) => state.member);
  const allProducts = useSelector((state) => state.products);

  if (
    order &&
    allProducts.length !== 0 &&
    Object.keys(member).length !== 0 &&
    !isLoading
  ) {
    isLoading = true;
    order.status = 1;
    order.order_info.delivery_time = new Date(order.order_info.delivery_time);
    order.timestamp = new Date(order.timestamp);
    Api.postCheckoutOrder(order, member, (order) =>
      updateProductStock(order, allProducts)
    );
  }

  return (
    <Order>感謝您的購物，您的訂單編號為：{useQuery().get("orderId")}</Order>
  );
}

export default Confirm;
