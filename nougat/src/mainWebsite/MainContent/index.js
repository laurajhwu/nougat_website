import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import styled from "styled-components";
import Products from "./products";

const Main = styled.main`
  max-width: 1160px;
  margin: 0 auto;
`;

function MainContent() {
  return (
    <Main>
      <Switch>
        <Route exact path="/products" component={Products} />
      </Switch>
    </Main>
  );
}

export default MainContent;
