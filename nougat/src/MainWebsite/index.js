import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import Header from "./Header";
import MainContent from "./MainContent";
import Api from "../utils/Api";
import { getMember } from "../redux/actions/member";

import { Container } from "./styles";

export default function MainWebsite() {
  const dispatch = useDispatch();
  const unsubscribeMember = useRef();

  function memberOnSnapshot(doc) {
    dispatch(getMember(doc.data()));
  }

  function onLoginStatusChange(user) {
    if (user) {
      unsubscribeMember.current = Api.getMemberInfo(user.uid, memberOnSnapshot);
    } else {
      dispatch(getMember(null));
      if (unsubscribeMember.current) {
        unsubscribeMember.current();
      }
    }
  }

  useEffect(() => {
    const unsubscribeLogin = Api.getLoginStatus(onLoginStatusChange);

    return () => {
      unsubscribeLogin();
      if (unsubscribeMember.current) {
        unsubscribeMember.current();
      }
    };
  }, []);

  return (
    <Container>
      <Header />
      <MainContent />
    </Container>
  );
}
