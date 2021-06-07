import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Api from "../../../../utils/Api";
import CreateAccount from "./CreateAccount";
import LoginAccount from "./ExistingAccount";
import SocialLogin from "./SocialLogin";

import { Container, Email, Existing, Create, SocialMedia } from "./styles";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Login() {
  let verify = useQuery().get("apiKey");

  const [exist, setExist] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  function handleClickCreate() {
    setExist(false);
  }

  function handleClickExist() {
    setExist(true);
  }

  useEffect(() => {
    if (verify) {
      setIsLoading(true);
      Api.verifyEmail()
        .then((result) => {
          if (result) {
            window.localStorage.removeItem("emailForSignIn");
            const user = result.user;
            Api.updateMember(user.uid, "id", user.uid).then(() => {
              alert("驗證成功！");
            });
          }
        })
        .catch((error) => {
          alert("驗證失敗！");
          console.log(error.message);
          setIsLoading(false);
        });
    }
    return function cleanup() {
      verify = "";
    };
  }, []);

  return (
    <Container isLoading={isLoading}>
      <Email>
        {exist ? (
          <LoginAccount setIsLoading={setIsLoading} />
        ) : (
          <CreateAccount />
        )}
        <Existing onClick={handleClickExist}>會員</Existing>
        <Create onClick={handleClickCreate}>註冊</Create>
      </Email>
      <SocialMedia>
        <SocialLogin setIsLoading={setIsLoading} />
      </SocialMedia>
    </Container>
  );
}

export default Login;
