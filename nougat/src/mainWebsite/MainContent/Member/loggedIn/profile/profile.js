import styled from "styled-components";
import { useState } from "react";

const ProfilePage = styled.div``;
const OrderPage = styled.div``;

function Login() {
  const [page, setPage] = useState("profile");

  return (
    <>
      <ProfilePage>profile</ProfilePage>
    </>
  );
}

export default Login;
