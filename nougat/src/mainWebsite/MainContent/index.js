import React from "react";
import { Switch, Route } from "react-router-dom";
import styled from "styled-components";
import Products from "./AllProducts";
import ProductDetails from "./ProductDetails";
import Cart from "./Checkout";
import LinePay from "./Checkout/Payment/Linepay";
import Confirm from "./Checkout/Payment/Confirm";
import Cancel from "./Checkout/Payment/Cancel";
import Member from "./Member";
import LandingPage from "./LandingPage";

const Main = styled.main`
  max-width: 1160px;
  margin: 0 auto;
  padding-top: 160px;
  height: 100%;
`;

function MainContent() {
  return (
    <Main>
      <Switch>
        <Route exact path="/" component={LandingPage} />
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
