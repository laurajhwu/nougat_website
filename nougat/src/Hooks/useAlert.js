import React from "react";
import { useHistory } from "react-router";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import HappySnail from "../images/snail-happy.svg";
import UseAnimations from "react-useanimations";
import alertTriangle from "react-useanimations/lib/alertTriangle";
import mail from "react-useanimations/lib/mail";

import {
  TitleCheckout,
  TextCheckout,
  ConfirmCheckout,
} from "./styles/checkoutAlert";

import { TitleError, TextError, CloseError } from "./styles/errorAlert";

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
      background: "#f5f1ec",
      closeOnConfirm: false,
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        history.push("/products");
      }
    });
  };
}

export function useSuccess(title, message) {
  return () => {
    MySwal.fire({
      icon: "success",
      imageUrl: HappySnail,
      imageWidth: 120,
      title: <TitleCheckout>{title}</TitleCheckout>,
      html: <TextCheckout>{message}</TextCheckout>,
      confirmButtonText: <ConfirmCheckout>確認</ConfirmCheckout>,
      confirmButtonColor: "#C86D5C",
      closeOnConfirm: true,
      allowOutsideClick: true,
    });
  };
}

export function useNotifyEmail(title, message) {
  return () => {
    MySwal.fire({
      icon: "question",
      iconHtml: (
        <UseAnimations
          animation={mail}
          size={75}
          strokeColor="#8cabbe"
          autoplay={true}
          loop={true}
          speed={0.5}
        />
      ),
      title: <TitleCheckout>{title}</TitleCheckout>,
      html: <TextCheckout>{message}</TextCheckout>,
      confirmButtonText: <ConfirmCheckout>確認</ConfirmCheckout>,
      confirmButtonColor: "#C86D5C",
      closeOnConfirm: true,
      allowOutsideClick: true,
    });
  };
}

export function useError(message, func = () => {}) {
  return () => {
    MySwal.fire({
      icon: "warning",
      iconHtml: (
        <UseAnimations
          animation={alertTriangle}
          size={90}
          strokeColor="#FEBA59"
        />
      ),
      title: <TitleError>出現錯誤</TitleError>,
      html: <TextError>{message}</TextError>,
      confirmButtonText: <CloseError>關閉</CloseError>,
      confirmButtonColor: "#ffdda1",
      closeOnConfirm: true,
      allowOutsideClick: true,
    }).then((result) => {
      if (result.isConfirmed) {
        func();
      }
    });
  };
}
