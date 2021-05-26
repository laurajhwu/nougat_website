import React from "react";
import { Route, useRouteMatch } from "react-router-dom";
import Inventory from "./Inventory";
import Calculate from "./Calculate";

import { Container } from "./styles";

export default function MainContent() {
  const match = useRouteMatch();

  return (
    <Container>
      <Route path={`${match.url}/inventory`}>
        <Inventory />
      </Route>
      <Route path={`${match.url}/calculate`}>
        <Calculate />
      </Route>
    </Container>
  );
}
