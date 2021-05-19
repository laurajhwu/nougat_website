import styled from "styled-components";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useRouteMatch, Route } from "react-router-dom";
import Login from "./login/login";
import LoggedIn from "./loggedIn";
import Api from "../../../utils/Api";

function Member() {
  const match = useRouteMatch();
  const history = useHistory();
  const member = useSelector((state) => state.member);

  useEffect(() => {
    // if (member.id) {
    //   history.push("/member/logged-in");
    // } else {
    //   alert("請先驗證您的信箱，方可登入");
    //   history.push("/member/login");
    // }
    // history.push("/member/login");
  }, []);

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
