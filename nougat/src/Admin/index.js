import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Route, useHistory, useRouteMatch } from "react-router-dom";
import Login from "./Login";
import Main from "./MainPage";

const Container = styled.div``;

function Admin() {
  const [isLogin, setIsLogin] = useState(false);
  const history = useHistory();
  const match = useRouteMatch();

  useEffect(() => {
    if (isLogin) {
      history.push(`/admin/auth/inventory`);
    } else {
      history.push(`/admin/login`);
    }
  }, [isLogin]);

  return (
    <Container>
      <Route exact path={`${match.url}/login`}>
        <Login setIsLogin={setIsLogin} />
      </Route>
      <Route path={`${match.url}/auth`}>
        <Main setIsLogin={setIsLogin} />
      </Route>
    </Container>
  );
}

export default Admin;
