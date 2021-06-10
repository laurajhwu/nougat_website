import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../../../../Components/LoadingPage";
import LinepayLogo from "../../../../images/linepay-logo.png";
import BGImage from "../../../../images/checkout-bg2.png";
import UseAnimations from "react-useanimations";
import arrowDown from "react-useanimations/lib/arrowDown";

import { Pay, Text, Logo } from "./styles";

function Payment() {
  const requestUri = process.env.REACT_APP_SERVER;
  const order = JSON.parse(window.localStorage.getItem("order"));
  const amount = order.products.reduce(
    (total, product) => total + product.price * product.qty,
    0
  );
  const data = {
    amount,
    currency: "TWD",
    orderId: order.id,
    packages: [
      {
        id: `package${order.id}`,
        amount,
        name: "蝸蝸牛軋糖",
        products: order.products.map((product) => {
          return {
            name: product.name,
            quantity: product.qty * 10,
            price: product.price / 10,
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

  useEffect(() => {
    axios
      .post(requestUri, data)
      .then((response) => {
        setPaymentLink(response.data.info.paymentUrl.web);
      })
      .catch((error) => {
        throw error;
      });
  }, []);

  if (paymentLink) {
    return (
      <Pay url={BGImage}>
        <Text>點擊Line Pay結帳</Text>
        <UseAnimations animation={arrowDown} size={50} strokeColor="#08BF5B" />
        <a href={paymentLink}>
          <Logo src={LinepayLogo} />
        </a>
      </Pay>
    );
  } else {
    return <Loading />;
  }
}

export default Payment;
