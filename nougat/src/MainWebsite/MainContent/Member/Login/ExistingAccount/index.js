import React, { useEffect } from "react";
import { useState } from "react";
import PasswordInput from "../../../../../Components/Password";
import ErrorComponent from "../../../../../Components/Error";
import Api from "../../../../../utils/Api";
import { useError } from "../../../../../Hooks/useAlert";

import Input from "@material-ui/core/Input";
import {
  Container,
  Form,
  Email,
  Label,
  Password,
  Register,
  useStyles,
  iconTheme,
} from "./styles";

function SignIn(props) {
  const classes = useStyles();
  const [errorMsg, setErrorMsg] = useState();
  const [email, setEmail] = useState("test@test.com");
  const [password, setPassword] = useState("test123");
  const [register, setRegister] = useState(false);
  const [checkInput, setCheckInput] = useState(false);
  const errorAlert = useError(errorMsg, () => setErrorMsg(null));

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
          setRegister(false);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode === "auth/wrong-password") {
            setErrorMsg("密碼錯誤");
          } else if (errorCode === "auth/user-not-found ") {
            setErrorMsg("與該信箱相關的會員不存在，請註冊！");
          } else {
            setErrorMsg(`登入失敗`);
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
      setErrorMsg("信箱格式有誤！");
    } else if (!validPassword()) {
      setErrorMsg("密碼需至少有6字！");
    } else {
      return true;
    }
    return false;
  }

  useEffect(() => {
    if (errorMsg) {
      errorAlert();
    }
  }, [errorMsg]);

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Email>
          <Label>信箱</Label>
          <Input
            onChange={(event) => handleChange(event, setEmail)}
            value={email}
            className={classes.input}
          />
          {ErrorComponent(checkInput && !validEmail())}
        </Email>
        <Password>
          <Label>密碼</Label>
          <PasswordInput
            children={(type) => (
              <Input
                onChange={(event) => handleChange(event, setPassword)}
                value={password}
                className={classes.input}
                type={type}
              />
            )}
            iconTheme={iconTheme}
          />
          {ErrorComponent(checkInput && !validPassword())}
        </Password>
        <Register type="submit" disabled={register}>
          登入
        </Register>
      </Form>
    </Container>
  );
}

export default SignIn;
