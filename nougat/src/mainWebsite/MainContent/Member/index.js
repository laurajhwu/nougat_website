import styled from "styled-components";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory, useRouteMatch, Route } from "react-router-dom";
import Login from "./login/login";
import LoggedIn from "./loggedIn";
import Api from "../../../utils/Api";
import getLoginStatus from "../../../utils/loginStatus";

function Member() {
  const match = useRouteMatch();
  const history = useHistory();
  const member = useSelector((state) => state.member);
  const reRender = useSelector((state) => state.reRender);

  useEffect(() => {
    if (Object.keys(member).length === 0) {
      history.push("/member/login");
    } else {
      history.push("/member/logged-in/profile");
    }
  }, [reRender, member]);

  return (
    <>
      <Route path={`${match.url}/logged-in`}>
        <LoggedIn />
      </Route>
      <Route path={`${match.url}/login`}>
        <Login />
      </Route>
      <Route path={`${match.url}/verify`}>
        <Login />
      </Route>
    </>
  );
}

export default Member;
