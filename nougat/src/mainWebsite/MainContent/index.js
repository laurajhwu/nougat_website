import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import styled from "styled-components";
import Products from "./products";
import ProductDetails from "./productDetails";
import Cart from "./Checkout";

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
      </Switch>
    </Main>
  );
}

export default MainContent;
