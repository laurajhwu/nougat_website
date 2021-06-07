import React from "react";
import { useHistory } from "react-router";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import HappySnail from "../images/snail-happy.svg";

import {
  TitleCheckout,
  TextCheckout,
  ConfirmCheckout,
} from "./styles/checkoutAlert";

const MySwal = withReactContent(Swal);

export function useConfirmCheckout(message) {
  const history = useHistory();

  return () => {
    MySwal.fire({
      icon: "success",
      imageUrl: HappySnail,
      imageWidth: 120,
      title: <TitleCheckout>感謝您的購物</TitleCheckout>,
      html: <TextCheckout>{message}</TextCheckout>,
      confirmButtonText: <ConfirmCheckout>確認</ConfirmCheckout>,
      confirmButtonColor: "#C86D5C",
      closeOnConfirm: false,
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        history.push("/products");
      }
    });
  };
}
