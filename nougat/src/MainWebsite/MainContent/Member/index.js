import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory, useRouteMatch, Route } from "react-router-dom";
import Login from "./Login";
import LoggedIn from "./LoggedIn";
import BGImage from "../../../images/wall.png";

import { Container } from "./styles";

function Member() {
  const match = useRouteMatch();
  const history = useHistory();
  const member = useSelector((state) => state.member);
  const reRender = useSelector((state) => state.reRender);

  useEffect(() => {
    if (!member) {
      history.push("/member/login");
    } else {
      history.push("/member/logged-in/profile");
    }
  }, [reRender, member]);

  return (
    <Container url={BGImage}>
      <Route path={`${match.url}/logged-in`}>
        <LoggedIn />
      </Route>
      <Route path={`${match.url}/login`}>
        <Login />
      </Route>
      <Route path={`${match.url}/verify`}>
        <Login />
      </Route>
    </Container>
  );
}

export default Member;
