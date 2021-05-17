import axios from "axios";
import React from "react";
import styled from "styled-components";
import { useEffect, useState } from "react";
import uuid from "react-uuid";
import crypto from "crypto-js";

const Pay = styled.a``;

function Payment() {
  const requestUri = "/v3/payments/request";
  const order = JSON.parse(window.localStorage.getItem("order"));
  const data = {
    amount: order.total,
    currency: "TWD",
    orderId: order.id,
    packages: [
      {
        id: `package${order.id}`,
        amount: order.total,
        name: "蝸蝸牛軋糖",
        products: order.products.map((product) => {
          return {
            name: product.name,
            quantity: product.qty,
            price: product.price,
            imageUrl: product.image,
          };
        }),
      },
    ],
    redirectUrls: {
      confirmUrl: `${window.location.protocol}//${window.location.host}/cart/line-pay/confirm-order`,
      cancelUrl: `${window.location.protocol}//${window.location.host}/cart/line-pay/cancel-payment`,
    },
    options: {
      display: {
        locale: "zh_TW",
      },
    },
  };
  const [paymentLink, setPaymentLink] = useState();

  function getConfigs() {
    const key = "2ca8d49994ddcd0bf1075bb5e8a3f87c";
    const nonce = uuid();
    const channelId = "1655987720";
    const encrypt = crypto.HmacSHA256(
      key + requestUri + JSON.stringify(data) + nonce,
      key
    );
    const hmacBase64 = crypto.enc.Base64.stringify(encrypt);
    return {
      headers: {
        "Content-Type": "application/json",
        "X-LINE-ChannelId": channelId,
        "X-LINE-Authorization-Nonce": nonce,
        "X-LINE-Authorization": hmacBase64,
      },
    };
  }

  useEffect(() => {
    axios
      .post(requestUri, data, getConfigs())
      .then((response) => {
        setPaymentLink(response.data.info.paymentUrl.web);
        window.localStorage.setItem("order", JSON.stringify(order));
      })
      .catch((error) => console.log(error.message));
  }, []);

  if (paymentLink) {
    return <Pay href={paymentLink}>使用Line Pay結帳</Pay>;
  } else {
    return <Pay>Loading...</Pay>;
  }
}

export default Payment;
