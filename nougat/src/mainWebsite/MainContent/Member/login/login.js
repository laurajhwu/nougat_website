import styled from "styled-components";
import { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getMember } from "../../../../redux/actions/member";
import Api from "../../../../utils/Api";
import CreateAccount from "./createAccount";
import LoginAccount from "./existingAccount";

const Email = styled.div``;
const Create = styled.div``;
const Existing = styled.div``;
const SocialMedia = styled.div``;
const Container = styled.div`
  & * {
    opacity: ${(props) => (props.isLoading ? 0.5 : 1)};
  }
`;

// "#99a4ad71"

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Login() {
  const verify = useQuery().get("apiKey");
  const history = useHistory();
  const dispatch = useDispatch();
  const [exist, setExist] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  function initMemberState(id) {
    Api.getMemberInfo(id).then((data) => {
      dispatch(getMember(data));
      setIsLoading(false);
      history.push("/member/logged-in");
    });
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
              initMemberState(user.uid);
            });
          }
        })
        .catch((error) => {
          alert("驗證失敗！");
          console.log(error.message);
          setIsLoading(false);
        });
    }
  }, []);

  function handleClickCreate() {
    setExist(false);
  }

  function handleClickExist() {
    setExist(true);
  }

  return (
    <Container isLoading={isLoading}>
      <Email>
        {exist ? <LoginAccount /> : <CreateAccount />}
        <Existing onClick={handleClickExist}>登入</Existing>
        <Create onClick={handleClickCreate}>註冊</Create>
      </Email>
    </Container>
  );
}

export default Login;
