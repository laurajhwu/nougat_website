/* eslint-disable react/no-children-prop */
import React, { useState } from "react";
import PasswordInput from "../../Components/Password";
import Api from "../../utils/Api";
import propTypes from "prop-types";

import { Main, Username, Label, Password, Input, LoginBtn } from "./styles";

export default function Login(props) {
  const { setIsLogin } = props;
  const [username, setUsername] = useState("test");
  const [password, setPassword] = useState("test123");
  const [notValid, setNotValid] = useState();

  function handleChange(event, callback) {
    callback(event.target.value.trim());
  }

  function handleLogin() {
    if (username && password) {
      Api.adminLogin(username, password).then((result) => {
        if (result === "usernameInvalid") {
          alert("該管理帳號不存在！");
          setNotValid("username");
        } else if (!result) {
          alert("密碼有誤！");
          setNotValid("password");
        } else {
          setIsLogin(true);
        }
      });
    } else {
      if (!username && !password) {
        setNotValid(false);
      } else if (!username) {
        setNotValid("username");
      } else {
        setNotValid("password");
      }
    }
  }

  return (
    <Main>
      <Username>
        <Label>管理者帳號</Label>
        <Input
          onChange={(event) => handleChange(event, setUsername)}
          notValid={!!(notValid === "username" || notValid === false)}
          value={username}
        />
      </Username>
      <Password>
        <Label>密碼</Label>
        <PasswordInput
          children={(type) => (
            <Input
              onChange={(event) => handleChange(event, setPassword)}
              notValid={!!(notValid === "password" || notValid === false)}
              type={type}
              value={password}
            />
          )}
          iconTheme={{
            width: "30px",
            position: "absolute",
            right: "10px",
            top: "5px",
            color: "#7e7f9a",
          }}
        />
      </Password>
      <LoginBtn onClick={handleLogin}>登入蝸蝸系統</LoginBtn>
    </Main>
  );
}

Login.propTypes = {
  setIsLogin: propTypes.func.isRequired,
};
