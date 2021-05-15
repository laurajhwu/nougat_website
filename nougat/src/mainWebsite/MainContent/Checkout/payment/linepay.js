import axios from "axios";
import React from "react";
import styled from "styled-components";
import { useEffect, useState } from "react";
import uuid from "react-uuid";
import crypto from "crypto-js";

const Pay = styled.a``;

function Payment() {
  const requestUri = "/v3/payments/request";
  const order = {
    amount: 4000,
    currency: "TWD",
    orderId: "Order2019101500001",
    packages: [
      {
        id: "Item20191015001",
        amount: 4000,
        name: "testPackageName",
        products: [
          {
            name: "testProductName",
            quantity: 2,
            price: 2000,
          },
        ],
      },
    ],
    redirectUrls: {
      confirmUrl: `${window.location.protocol}//${window.location.host}/cart/line-pay/confirm-order`,
      cancelUrl: `${window.location.protocol}//${window.location.host}/cart/line-pay/cancel-payment`,
    },
  };
  const [paymentLink, setPaymentLink] = useState();

  function getConfigs(requestUri, order) {
    const key = "2ca8d49994ddcd0bf1075bb5e8a3f87c";
    const ChannelId = "1655987720";
    const nonce = uuid();
    const encrypt = crypto.HmacSHA256(
      key + requestUri + JSON.stringify(order) + nonce,
      key
    );
    const hmacBase64 = crypto.enc.Base64.stringify(encrypt);
    return {
      headers: {
        "Content-Type": "application/json",
        "X-LINE-ChannelId": ChannelId,
        "X-LINE-Authorization-Nonce": nonce,
        "X-LINE-Authorization": hmacBase64,
      },
    };
  }

  useEffect(() => {
    axios
      .post(requestUri, order, getConfigs(requestUri, order))
      .then((response) => {
        setPaymentLink(response.data.info.paymentUrl.web);
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
