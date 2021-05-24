import styled from "styled-components";
import { useState, useEffect } from "react";
import { useHistory, Route, useRouteMatch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Profile from "./Profile";
import Orders from "./Orders";
import logout from "../../../../utils/logout";
import Api from "../../../../utils/Api";
import { getMemberOrders } from "../../../../redux/actions/order";
import { getOrderFixedData } from "../../../../redux/actions/fixedData";

const ProfilePage = styled.div``;
const OrderPage = styled.div``;
const EmailNotVerified = styled.div``;
const Logout = styled.a``;

function LoggedIn() {
  const history = useHistory();
  const match = useRouteMatch();
  const member = useSelector((state) => state.member);
  const dispatch = useDispatch();
  const [page, setPage] = useState("profile");

  function handleClick(page) {
    setPage(page);
  }

  useEffect(() => {
    history.push(`/member/logged-in/${page}`);
  }, [page]);

  useEffect(() => {
    if (member.id) {
      Api.getMemberOrders(member.id)
        .then((querySnapshot) => {
          const orders = [];
          querySnapshot.forEach((order) => {
            orders.push(order.data());
          });
          dispatch(getMemberOrders(orders));
          dispatch(getOrderFixedData());
        })
        .catch((error) => {
          throw error;
        });
    }
  }, []);

  return (
    <>
      {member.id ? (
        <>
          <ProfilePage onClick={() => handleClick("profile")}>
            會員資料
          </ProfilePage>
          <OrderPage onClick={() => handleClick("orders")}>訂單瀏覽</OrderPage>
          <Route path={`${match.url}/profile`}>
            <Profile />
          </Route>
          <Route path={`${match.url}/orders`}>
            <Orders />
          </Route>
        </>
      ) : (
        <>
          <EmailNotVerified>
            請查看您的信箱是否收到驗證信，驗證您的信箱後，方可看到會員資料
          </EmailNotVerified>
          <Logout onClick={logout}>登出</Logout>
        </>
      )}
    </>
  );
}

export default LoggedIn;
