import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PasswordInput from "../../Components/Password";

const Main = styled.main`
  display: flex;
  flex-direction: column;
`;

const Username = styled.div``;
const Password = styled.div``;
const Label = styled.label``;
const Input = styled.input``;
const LoginBtn = styled.button``;

export default function Login(props) {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  function handleChange(event, callback) {
    callback(event.target.value);
  }

  return (
    <Main>
      <Username>
        <Label>使用者帳號</Label>
        <Input onChange={(event) => handleChange(event, setUsername)} />
      </Username>
      <Password>
        <Label>密碼</Label>
        <PasswordInput
          handleChange={(event) => handleChange(event, setPassword)}
        />
      </Password>
      <LoginBtn>登入</LoginBtn>
    </Main>
  );
}
