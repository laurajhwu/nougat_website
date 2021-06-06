import React from "react";
import { useSelector } from "react-redux";
import Api from "../../../../../utils/Api";
import logout from "../../../../../utils/logout";
import EditableInput from "../../../../../Components/EditableInput";
import ProfilePic from "../../../../../images/snail-profile2.svg";

import {
  Container,
  ProfilePage,
  Logout,
  Picture,
  Info,
  doneIconStyle,
} from "./styles";

export default function Profile() {
  const member = useSelector((state) => state.member);
  const fixedData = useSelector((state) => state.fixedData);

  function handleFinishEdit(prop, data) {
    if (prop === "email") {
      Api.updateMemberAuthEmail(data, () => {
        Api.updateMember(member.id, prop, data);
      });
    } else {
      Api.updateMember(member.id, prop, data);
    }
  }

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
          <></>
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
