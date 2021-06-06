import React from "react";
import styled from "styled-components";
import { useState } from "react";
import PasswordInput from "../../../../../Components/Password";
import Api from "../../../../../utils/Api";

import { Container } from "./styles";

const Form = styled.form``;
const Title = styled.div``;
const Email = styled(Title)``;
const Password = styled.div``;
const Label = styled.label``;
const Input = styled.input`
  border: 1px solid black;
  border-color: ${(props) => (props.notValid ? "red" : "black")};
`;
const Register = styled.button``;

function SignIn(props) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [register, setRegister] = useState(false);
  const [checkInput, setCheckInput] = useState(false);

  function handleChange(event, setFunc) {
    setFunc(event.target.value.trim());
  }

  function handleSubmit(event) {
    event.preventDefault();
    setRegister(true);
    setCheckInput(true);
    if (validateInfo()) {
      props.setIsLoading(true);
      Api.signIn(email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          props.initMemberState(user.uid);
          setRegister(false);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode === "auth/wrong-password") {
            alert("密碼錯誤");
          } else if (errorCode === "auth/user-not-found ") {
            alert("與該信箱相關的會員不存在，請註冊！");
          } else {
            alert(`登入失敗${errorCode} ${errorMessage}`);
          }
          props.setIsLoading(false);
          setRegister(false);
        });
    } else {
      setRegister(false);
    }
  }

  function validEmail() {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      email
    );
  }

  function validPassword() {
    return password && password.length >= 6;
  }

  function validateInfo() {
    if (!validEmail()) {
      alert("信箱格式有誤！");
    } else if (!validPassword()) {
      alert("密碼需至少有6字！");
    } else {
      return true;
    }
    return false;
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Email>
        <Label>信箱</Label>
        <Input
          type="text"
          onChange={(event) => handleChange(event, setEmail)}
          notValid={checkInput && !validEmail()}
        />
      </Email>
      <Password>
        <Label>密碼</Label>
        <PasswordInput
          handleChange={(event) => handleChange(event, setPassword)}
          placeholder="至少6個字"
          notValid={checkInput && !validPassword()}
        />
      </Password>
      <Register type="submit" disabled={register}>
        登入
      </Register>
    </Form>
  );
}

export default SignIn;
