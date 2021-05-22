import React from "react";
import { Route, useRouteMatch } from "react-router-dom";
import Inventory from "./Inventory";

import { Container } from "./styles";

export default function MainContent() {
  const match = useRouteMatch();

  return (
    <>
      <Route path={`${match.url}/inventory`}>
        <Inventory />
      </Route>
    </>
  );
}
