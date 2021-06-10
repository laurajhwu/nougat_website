import React, { useState, useEffect } from "react";
import PasswordInput from "../../../../../Components/Password";
import ErrorComponent from "../../../../../Components/Error";
import Api from "../../../../../utils/Api";
import { useError, useNotifyEmail } from "../../../../../Hooks/useAlert";

import Input from "@material-ui/core/Input";
import {
  Container,
  Form,
  Name,
  Label,
  Line,
  Email,
  Password,
  Register,
  useStyles,
  iconTheme,
} from "./styles";

function CreateAccount() {
  const classes = useStyles();
  const [errorMsg, setErrorMsg] = useState();
  const [name, setName] = useState();
  const [line_id, setLine] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPW, setConfirmPW] = useState();
  const [register, setRegister] = useState(false);
  const [checkInput, setCheckInput] = useState(false);
  const errorAlert = useError(errorMsg, () => setErrorMsg(null));
  const emailSentAlert = useNotifyEmail("已寄出驗證信", "請查看信箱進行驗證");

  function handleChange(event, setFunc) {
    setFunc(event.target.value.trim());
  }

  function handleSubmit(event) {
    event.preventDefault();
    setRegister(true);
    setCheckInput(true);
    if (validateInfo()) {
      Api.createAccount(email, password)
        .then((user) => {
          const actionCodeSettings = {
            url: `${window.location.origin}/member/login/verify`,
            handleCodeInApp: true,
          };
          Api.addNewMember(user.uid, {
            name,
            line_id,
            email,
            cart_items: [],
            order_info: {},
          });

          Api.sendVerificationEmail(email, actionCodeSettings)
            .then(() => {
              window.localStorage.setItem("emailForSignIn", email);
              emailSentAlert();
              event.target.reset();
              setRegister(false);
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              setErrorMsg("寄件失敗");
              throw (errorCode, errorMessage);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode === "auth/email-already-in-use") {
            setErrorMsg("該信箱已有註冊帳號！");
          } else {
            setErrorMsg(`註冊失敗，請在試一次`);
          }
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

  function validConfirmPW() {
    return confirmPW && password === confirmPW;
  }

  function validateInfo() {
    if (!validEmail()) {
      setErrorMsg("信箱格式有誤！");
    } else if (!(name && line_id)) {
      setErrorMsg("所有空格皆為必填");
    } else if (!validPassword()) {
      setErrorMsg("密碼需至少有6字！");
    } else if (!validConfirmPW()) {
      setErrorMsg("密碼與確認密碼不同！");
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
        <Name>
          <Label>姓名</Label>
          <Input
            onChange={(event) => handleChange(event, setName)}
            value={name}
            className={classes.input}
          />
          {ErrorComponent(checkInput && !name)}
        </Name>
        <Line>
          <Label>Line ID</Label>
          <Input
            onChange={(event) => handleChange(event, setLine)}
            value={line_id}
            className={classes.input}
          />
          {ErrorComponent(checkInput && !line_id)}
        </Line>
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
                placeholder="至少6個字"
              />
            )}
            iconTheme={iconTheme}
          />
          {ErrorComponent(checkInput && !validPassword())}
        </Password>
        <Password>
          <Label>確認密碼</Label>
          <PasswordInput
            children={(type) => (
              <Input
                onChange={(event) => handleChange(event, setConfirmPW)}
                value={confirmPW}
                className={classes.input}
                type={type}
              />
            )}
            iconTheme={iconTheme}
          />
          {ErrorComponent(checkInput && !validConfirmPW())}
        </Password>
        <Register type="submit" disabled={register}>
          註冊
        </Register>
      </Form>
    </Container>
  );
}

export default CreateAccount;
