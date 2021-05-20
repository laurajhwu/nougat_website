import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import Api from "../../../../../utils/Api";
import logout from "../../../../../utils/logout";
import { getMember } from "../../../../../redux/actions/member";

const ProfilePage = styled.div``;
const Logout = styled.button``;

function Profile() {
  const dispatch = useDispatch();

  return (
    <>
      <ProfilePage>profile</ProfilePage>
      <Logout onClick={logout}>登出</Logout>
    </>
  );
}

export default Profile;
