import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Api from "../../../../../utils/Api";
import logout from "../../../../../utils/logout";
import EditableInput from "../../../../../Components/EditableInput";
import { updateMember } from "../../../../../redux/actions/member";

import { ProfilePage, Logout, Picture, Info } from "./styles";

export default function Profile() {
  const dispatch = useDispatch();
  const member = useSelector((state) => state.member);
  const fixedData = useSelector((state) => state.fixedData);

  function handleFinishEdit(prop, data) {
    if (prop === "email") {
      Api.updateMemberAuthEmail(data, () => {
        dispatch(updateMember(prop, data));
        Api.updateMember(member.id, prop, data);
      });
    } else {
      dispatch(updateMember(prop, data));
      Api.updateMember(member.id, prop, data);
    }
  }

  return (
    <>
      <ProfilePage>
        {member.image ? <Picture src={member.image} /> : <></>}
        <Info>
          姓名：
          <EditableInput
            initValue={member.name}
            handleFinishEdit={(data) => handleFinishEdit("name", data)}
          />
        </Info>
        <Info>
          信箱：
          <EditableInput
            initValue={member.email}
            handleFinishEdit={(data) => handleFinishEdit("email", data)}
          />
        </Info>
        <Info>
          Line：
          <EditableInput
            initValue={member.line_id || ""}
            handleFinishEdit={(data) => handleFinishEdit("line_id", data)}
          />
        </Info>
        {Object.keys(fixedData).length === 0 ? (
          <></>
        ) : (
          <>
            <Info>
              運送方式 ：{fixedData.delivery[member.order_info.delivery] || ""}
            </Info>
            <Info>
              付款方式 ：{fixedData.payment[member.order_info.payment] || ""}
            </Info>
          </>
        )}
      </ProfilePage>

      <Logout onClick={logout}>登出</Logout>
    </>
  );
}
