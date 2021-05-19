import styled from "styled-components";
import { useState } from "react";
import CreateAccount from "./createAccount";
import LoginAccount from "./existingAccount";

const Email = styled.div``;
const Create = styled.div``;
const Existing = styled.div``;
const SocialMedia = styled.div``;

function Login() {
  const [exist, setExist] = useState(true);

  function handleClickCreate() {
    setExist(false);
  }

  function handleClickExist() {
    setExist(true);
  }

  return (
    <>
      <Email>
        {exist ? <LoginAccount /> : <CreateAccount />}
        <Existing onClick={handleClickExist}>登入</Existing>
        <Create onClick={handleClickCreate}>註冊</Create>
      </Email>
    </>
  );
}

export default Login;
