import React from "react";
import propTypes from "prop-types";

import { Span } from "./styles";

export default function CheckoutAlert(props) {
  const { swal } = props;

  return (
    <>
      <Span
        onClick={() => {
          swal.close();
          history.push("/member");
        }}
        onMouseEnter={(event) => (event.target.style.cursor = "pointer")}
      >
        會員頁面
      </Span>
      可瀏覽您的訂單
    </>
  );
}

CheckoutAlert.propTypes = {
  swal: propTypes.object,
};
