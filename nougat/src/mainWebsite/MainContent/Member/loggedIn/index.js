import styled from "styled-components";
import { useState, useEffect } from "react";
import { useHistory, Route, useRouteMatch } from "react-router-dom";
import { useSelector } from "react-redux";
import Profile from "./profile/profile";
import Orders from "./orders/orders";

const ProfilePage = styled.div``;
const OrderPage = styled.div``;

function LoggedIn() {
  const history = useHistory();
  const memeber = useSelector((state) => state.member);
  const match = useRouteMatch();
  const [page, setPage] = useState("profile");

  function handleClick(page) {
    setPage(page);
  }

  useEffect(() => {
    history.push(`/member/logged-in/${page}`);
  }, [page]);

  return (
    <>
      <ProfilePage onClick={() => handleClick("profile")}>會員資料</ProfilePage>
      <OrderPage onClick={() => handleClick("orders")}>訂單瀏覽</OrderPage>
      <Route path={`${match.url}/profile`}>
        <Profile />
      </Route>
      <Route path={`${match.url}/orders`}>
        <Orders />
      </Route>
    </>
  );
}

export default LoggedIn;
