import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Profile from "./Profile";
import Orders from "./Orders";
import logout from "../../../../utils/logout";
import Api from "../../../../utils/Api";
import { getMemberOrders } from "../../../../redux/actions/order";
import { getOrderFixedData } from "../../../../redux/actions/fixedData";
import Loading from "../../../../Components/LoadingPage";
import { useVerifyEmail } from "../../../../Hooks/useAlert";

import { Container, ProfilePage, OrderPage, Header } from "./styles";

function LoggedIn() {
  const history = useHistory();
  const member = useSelector((state) => state.member);
  const dispatch = useDispatch();
  const [page, setPage] = useState("profile");
  const verifyEmailAlert = useVerifyEmail(
    "查看信箱驗證信",
    "驗證您的信箱後，方可看到會員資料",
    logout
  );

  function handleClick(page) {
    setPage(page);
  }

  useEffect(() => {
    history.push(`/member/logged-in/${page}`);
  }, [page]);

  useEffect(() => {
    if (!member) {
      history.push(`/member`);
    } else if (member.id) {
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
    } else if (!member.id) {
      verifyEmailAlert();
    }
  }, []);

  if (member) {
    return (
      <Container>
        {member.id ? (
          <Header
            fill
            justify
            variant="tabs"
            activeKey={page}
            onSelect={(key) => handleClick(key)}
          >
            <ProfilePage title="會員資料" eventKey="profile">
              <Profile />
            </ProfilePage>
            <OrderPage title="訂單瀏覽" eventKey="orders">
              <Orders />
            </OrderPage>
          </Header>
        ) : (
          <></>
        )}
      </Container>
    );
  } else {
    return <Loading />;
  }
}

export default LoggedIn;
