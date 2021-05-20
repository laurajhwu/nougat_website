import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PasswordInput from "../../Components/Password";
import Api from "../../utils/Api";

const Main = styled.main`
  display: flex;
  flex-direction: column;
`;

const Username = styled.div``;
const Password = styled.div``;
const Label = styled.label``;
const Input = styled.input`
  border: 1px solid black;
  border-color: ${(props) => (props.notValid ? "red" : "black")};
`;
const LoginBtn = styled.button``;

export default function Login(props) {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [notValid, setNotValid] = useState();

  function handleChange(event, callback) {
    callback(event.target.value.trim());
  }

  function handleLogin() {
    Api.adminLogin(username, password).then((result) => {
      if (result === "usernameInvalid") {
        alert("該管理帳號不存在！");
        setNotValid("username");
      } else if (!result) {
        alert("密碼有誤！");
        setNotValid("password");
      } else {
        props.setIsLogin(true);
      }
    });
  }

  return (
    <Main>
      <Username>
        <Label>管理者帳號</Label>
        <Input
          onChange={(event) => handleChange(event, setUsername)}
          notValid={notValid === "username" ? true : false}
        />
      </Username>
      <Password>
        <Label>密碼</Label>
        <PasswordInput
          handleChange={(event) => handleChange(event, setPassword)}
          notValid={notValid === "password" ? true : false}
        />
      </Password>
      <LoginBtn onClick={handleLogin}>登入</LoginBtn>
    </Main>
  );
}
