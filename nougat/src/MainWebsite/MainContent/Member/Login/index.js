import React from "react";
import { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Api from "../../../../utils/Api";
import CreateAccount from "./CreateAccount";
import LoginAccount from "./ExistingAccount";
import SocialLogin from "./SocialLogin";
import { useError, useSuccess } from "../../../../Hooks/useAlert";

import { Container, Email, Existing, Create, SocialMedia } from "./styles";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Login() {
  let verify = useQuery().get("apiKey");
  const history = useHistory();
  const [exist, setExist] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const successAlert = useSuccess("恭喜您", "驗證成功！");
  const errorAlert = useError("驗證失敗", () => history.push("/member"));

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
              successAlert();
            });
          }
        })
        .catch((error) => {
          errorAlert();
          setIsLoading(false);
        });
    }
    return function cleanup() {
      verify = "";
    };
  }, []);

  return (
    <Container isLoading={isLoading}>
      <SocialMedia>
        <SocialLogin setIsLoading={setIsLoading} />
      </SocialMedia>
      <Email>
        {exist ? (
          <LoginAccount setIsLoading={setIsLoading} />
        ) : (
          <CreateAccount />
        )}
        <Existing onClick={handleClickExist}>會員</Existing>
        <Create onClick={handleClickCreate}>註冊</Create>
      </Email>
    </Container>
  );
}

export default Login;
