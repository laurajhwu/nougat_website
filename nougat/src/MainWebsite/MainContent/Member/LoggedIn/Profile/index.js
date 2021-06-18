import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Api from "../../../../../utils/Api";
import useLogout from "../../../../../Hooks/useLogout";
import EditableInput from "../../../../../Components/EditableInput";
import ProfilePic from "../../../../../images/snail-profile2.svg";
import { useError } from "../../../../../Hooks/useAlert";

import {
  Container,
  ProfilePage,
  Logout,
  Picture,
  Info,
  doneIconStyle,
} from "./styles";

export default function Profile() {
  const [errorMsg, setErrorMsg] = useState();
  const member = useSelector((state) => state.member);
  const fixedData = useSelector((state) => state.fixedData);
  const errorAlert = useError(errorMsg, () => setErrorMsg(null));
  const logout = useLogout();

  function handleFinishEdit(prop, data) {
    if (prop === "email") {
      Api.updateMemberAuthEmail(data, () => {
        Api.updateMember(member.id, prop, data);
      }).catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          setErrorMsg("該信箱已被註冊過！");
        } else if (error.code === "auth/requires-recent-login") {
          setErrorMsg("因更改敏感資料，請登出後再重新登入試一次");
        }

        throw error;
      });
    } else {
      Api.updateMember(member.id, prop, data);
    }
  }

  useEffect(() => {
    if (errorMsg) {
      errorAlert();
    }
  }, [errorMsg]);

  return (
    <Container>
      {member.image ? (
        <Picture src={member.image} />
      ) : (
        <Picture src={ProfilePic} />
      )}
      <ProfilePage>
        <Info>
          <span>姓名：</span>
          <EditableInput
            initValue={member.name}
            handleFinishEdit={(data) => handleFinishEdit("name", data)}
            doneIconStyle={doneIconStyle}
          />
        </Info>
        <Info>
          <span> 信箱：</span>
          <EditableInput
            initValue={member.email}
            handleFinishEdit={(data) => handleFinishEdit("email", data)}
            doneIconStyle={doneIconStyle}
          />
        </Info>
        <Info>
          <span> Line：</span>
          <EditableInput
            initValue={member.line_id || ""}
            handleFinishEdit={(data) => handleFinishEdit("line_id", data)}
            doneIconStyle={doneIconStyle}
          />
        </Info>
        {Object.keys(fixedData).length === 0 ? (
          ""
        ) : (
          <>
            <Info>
              <span>運送方式 ：</span>
              <span>
                {fixedData.delivery[member.order_info.delivery] || ""}
              </span>
            </Info>
            <Info>
              <span>付款方式 ：</span>
              <span>{fixedData.payment[member.order_info.payment] || ""}</span>
            </Info>
          </>
        )}
      </ProfilePage>

      <Logout onClick={logout}>登出</Logout>
    </Container>
  );
}
