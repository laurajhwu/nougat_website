import styled from "styled-components";
import { useState } from "react";

const ProfilePage = styled.div``;
const OrderPage = styled.div``;

function Orders() {
  const [page, setPage] = useState("profile");

  return (
    <>
      <ProfilePage>order</ProfilePage>
    </>
  );
}

export default Orders;
