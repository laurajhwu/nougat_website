import React from "react";
import { Switch, Route } from "react-router-dom";
import styled from "styled-components";
import Products from "./AllProducts/products";
import ProductDetails from "./ProductDetails/productDetails";
import Cart from "./Checkout";
import LinePay from "./Checkout/payment/linepay";
import Confirm from "./Checkout/payment/confirm";
import Cancel from "./Checkout/payment/cancel";
import Member from "./Member";

const Main = styled.main`
  max-width: 1160px;
  margin: 0 auto;
`;

function MainContent() {
  return (
    <Main>
      <Switch>
        <Route exact path="/products" component={Products} />
        <Route exact path="/product" component={ProductDetails} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/cart/line-pay" component={LinePay} />
        <Route path="/cart/line-pay/confirm-order" component={Confirm} />
        <Route path="/cart/line-pay/cancel-payment" component={Cancel} />
        <Route path="/member" component={Member} />
      </Switch>
    </Main>
  );
}

export default MainContent;
