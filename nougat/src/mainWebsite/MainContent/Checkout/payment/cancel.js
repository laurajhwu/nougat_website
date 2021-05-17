import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Order = styled.div``;

function Cancel() {
  return (
    <Link to="/cart">
      <Order>取消付款，返回購物車</Order>
    </Link>
  );
}

export default Cancel;
