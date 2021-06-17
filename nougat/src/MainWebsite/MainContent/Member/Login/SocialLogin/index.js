import React from "react";
import Api from "../../../../../utils/Api";
import { useError } from "../../../../../Hooks/useAlert";
import GoogleImage from "../../../../../images/google-logo.svg";
import propTypes from "prop-types";

import { FbContainer, GoogleContainer, FbIcon, GoogleIcon } from "./styles";

function SocialLogin(props) {
  const { setIsLoading } = props;
  const errorAlert = useError("該信箱已被使用過囉！");
  function login(api) {
    setIsLoading(true);
    api()
      .then((result) => {
        const user = result.user;
        Api.isMember(user.uid).then((isMember) => {
          if (!isMember) {
            Api.addNewMember(user.uid, {
              id: user.uid,
              name: user.displayName,
              email: user.email,
              image: user.photoURL,
              line_id: "",
              cart_items: [],
              order_info: {},
            });
          }
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        if (email) {
          errorAlert();
        }
        setIsLoading(false);
        throw (errorCode, errorMessage);
      });
  }

  return (
    <>
      <FbContainer>
        <FbIcon />
        <div onClick={() => login(Api.facebookLogin)}>Facebook 登入</div>
      </FbContainer>
      <GoogleContainer>
        <GoogleIcon src={GoogleImage} />
        <div onClick={() => login(Api.googleLogin)}>Google 登入</div>
      </GoogleContainer>
    </>
  );
}

SocialLogin.propTypes = {
  setIsLoading: propTypes.func,
};

export default SocialLogin;
