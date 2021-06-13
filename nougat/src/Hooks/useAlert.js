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

import {
  TitleVerify,
  TextVerify,
  ConfirmVerify,
  LogoutVerify,
  TitleAdded,
} from "./styles/verifyEmail";

const MySwal = withReactContent(Swal);

export function useConfirmCheckout(message) {
  const history = useHistory();

  return () => {
    MySwal.fire({
      icon: "success",
      imageUrl: HappySnail,
      imageWidth: 120,
      title: <TitleCheckout>感謝您的購物</TitleCheckout>,
      html: (
        <TextCheckout>
          {typeof message === "string" ? message : message(MySwal)}
        </TextCheckout>
      ),
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

export function useVerifyEmail(title, message, callback) {
  const history = useHistory();

  return () => {
    MySwal.fire({
      icon: "question",
      iconHtml: (
        <UseAnimations
          animation={mail}
          size={75}
          strokeColor="#474973"
          autoplay={true}
          loop={true}
          speed={0.5}
        />
      ),
      title: <TitleVerify>{title}</TitleVerify>,
      html: <TextVerify>{message}</TextVerify>,
      showDenyButton: true,
      denyButtonText: <LogoutVerify>登出</LogoutVerify>,
      denyButtonColor: "#9d858d",
      confirmButtonText: <ConfirmVerify>了解</ConfirmVerify>,
      confirmButtonColor: "#5d2e46",
      closeOnConfirm: false,
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        history.push("/products");
      }
      if (result.isDenied) {
        callback();
      }
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

export function useAddedAlert() {
  const width = () => {
    if (window.innerWidth > 760) {
      return "400px";
    } else {
      return "200px";
    }
  };

  const text = () => {
    if (window.innerWidth > 760) {
      return "已加入購物車";
    } else {
      return "已加入";
    }
  };
  return MySwal.mixin({
    toast: true,
    icon: "success",
    title: <TitleAdded>{text()}</TitleAdded>,
    animation: true,
    position: "top-right",
    showConfirmButton: false,
    timer: 2000,
    heightAuto: false,
    width: width(),
    background: "rgba(246, 244, 244, 0.5)",
  });
}
