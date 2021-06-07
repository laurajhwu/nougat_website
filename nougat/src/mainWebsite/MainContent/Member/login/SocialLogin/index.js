import React, { useEffect, useRef } from "react";
import styled from "styled-components";

import Api from "../../../../../utils/Api";

import { FbContainer, GoogleContainer, FbIcon, GoogleIcon } from "./styles";

function SocialLogin(props) {
  function login(api) {
    props.setIsLoading(true);
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
          alert("該信箱已被使用過！");
        }
        console.log(errorCode, errorMessage);
        props.setIsLoading(false);
      });
  }

  return (
    <>
      <FbContainer>
        <FbIcon />
        <div onClick={() => login(Api.facebookLogin)}>Facebook 登入</div>
      </FbContainer>
      <GoogleContainer>
        <GoogleIcon />
        <div onClick={() => login(Api.googleLogin)}>Google 登入</div>
      </GoogleContainer>
    </>
  );
}

export default SocialLogin;
