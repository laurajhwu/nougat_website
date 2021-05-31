import React, { useState } from "react";
import Password from "../../../../../Components/Password";
import Api from "../../../../../utils/Api";

import { Container, Username, Title, Label, Btn } from "./styles";

const inputTheme = {
  height: "50px",
  padding: "5px 15px",
  "font-size": "18px",
  "border-radius": "24px",
  width: "100%",
};

const iconTheme = {
  position: "absolute",
  right: "10px",
  top: "12.5px",
  width: "25px",
};

export default function CreateAdmin() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [invalidUsername, setInvalidUsername] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);

  function handleChangeUsername(event) {
    setUsername(event.target.value.trim());
  }

  function handleChangePassword(event) {
    setPassword(event.target.value.trim());
  }

  function submitForm(event) {
    event.preventDefault();
    if (!username || !password) {
      if (!username) {
        setInvalidUsername(true);
      }
      if (!password) {
        setInvalidPassword(true);
      }
    } else {
      Promise.all([
        Api.checkSameAdminUsername(username),
        Api.checkSameAdminPassword(password),
      ]).then((values) => {
        if (values.every((value) => !value)) {
          Api.createAdmin(username, password).then(() => {
            alert("已新增！");
            event.target.reset();
            setUsername("");
            setInvalidUsername(false);
            setInvalidPassword(false);
          });
        } else {
          alert("帳號或密碼有重複");
          setInvalidUsername(false);
          setInvalidPassword(false);
        }
      });
    }
  }

  return (
    <Container onSubmit={submitForm}>
      <Title>創建新管理員</Title>
      <Label htmlFor="username">帳號</Label>
      <Username
        id="username"
        onChange={handleChangeUsername}
        value={username}
        notValid={invalidUsername}
      />
      <Label htmlFor="password">密碼</Label>
      <Password
        id="password"
        inputTheme={inputTheme}
        iconTheme={iconTheme}
        handleChange={handleChangePassword}
        notValid={invalidPassword}
      />
      <Btn type="submit" variant="contained">
        註冊
      </Btn>
    </Container>
  );
}
