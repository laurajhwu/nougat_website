import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Api from "../../../../utils/Api";
import updateProductStock from "../../../../utils/updateProductStock";
import { updateProduct } from "../../../../redux/actions/products";
// import { useEffect, useState } from "react";
// import axios from "axios";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const Order = styled.div``;

let isLoading = false;

function Confirm() {
  const order = JSON.parse(window.localStorage.getItem("order"));
  const dispatch = useDispatch();
  const history = useHistory();
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
    Api.postCheckoutOrder(order, member, (order) =>
      updateProductStock(order, allProducts, dispatch, updateProduct)
    );
  }

  useEffect(() => {}, []);

  return (
    <Order>感謝您的購物，您的訂單編號為：{useQuery().get("orderId")}</Order>
  );
}

export default Confirm;

// const order = {
//   amount: 4000,
//   currency: "TWD",
//   orderId: "Order2019101500001",
//   packages: [
//     {
//       id: "Item20191015001",
//       amount: 4000,
//       name: "testPackageName",
//       products: [
//         {
//           name: "testProductName",
//           quantity: 2,
//           price: 2000,
//         },
//       ],
//     },
//   ],
//   redirectUrls: {
//     confirmUrl: `${window.location.protocol}//${window.location.host}/cart/line-pay/confirm-order`,
//     cancelUrl: `${window.location.protocol}//${window.location.host}/cart/line-pay/cancel-payment`,
//   },
// };
// const data = {
//   amount: order.amount,
//   currency: order.currency,
// };
// const transactionID = useQuery().get("transactionId");
// const requestUri = `/v3/payments/${transactionID}/confirm`;
// const [orderID, setOrderID] = useState();

// function getConfigs(requestUri, data) {
//   const key = "2ca8d49994ddcd0bf1075bb5e8a3f87c";
//   const channelId = "1655987720";
//   const encrypt = crypto.HmacSHA256(
//     key + requestUri + JSON.stringify(data) + props.nonce,
//     key
//   );
//   const hmacBase64 = crypto.enc.Base64.stringify(encrypt);
//   return {
//     headers: {
//       "Content-Type": "application/json",
//       "X-LINE-ChannelId": channelId,
//       "X-LINE-Authorization-Nonce": props.nonce,
//       "X-LINE-Authorization": hmacBase64,
//     },
//   };
// }

// useEffect(() => {
//   axios
//     .post(requestUri, data, getConfigs(requestUri, order))
//     .then((response) => {
//       // setOrderID(response.data.info.orderId);
//       console.log(response);
//       console.log(response.data);
//     })
//     .catch((error) => console.log(error.message));
// }, []);
