import styled from "styled-components";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useRouteMatch, Route } from "react-router-dom";
import { getMember } from "../../../redux/actions/member";
import Login from "./login/login";
import LoggedIn from "./loggedIn";
import Api from "../../../utils/Api";
import getLoginStatus from "../../../utils/loginStatus";

function Member() {
  const dispatch = useDispatch();
  const match = useRouteMatch();
  const history = useHistory();
  const member = useSelector((state) => state.member);
  const reRender = useSelector((state) => state.reRender);

  useEffect(() => {
    if (Object.keys(member) !== 0) {
      history.push("/member/logged-in");
    } else {
      history.push("/member/login");
    }
  }, [reRender]);

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
