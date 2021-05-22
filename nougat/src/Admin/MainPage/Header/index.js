import React from "react";
import { ButtonGroup } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import {
  Container,
  Btn,
  DropdownBtn,
  DropdownItem,
  SettingIcon,
} from "./styles";

export default function Header() {
  const history = useHistory();

  function handleClick(path) {
    history.push(path);
  }

  return (
    <Container>
      <DropdownBtn
        id="dropdown-button-drop-down"
        title="庫存管理"
        variant="outline-info"
        key="down"
        drop="down"
      >
        <DropdownItem onClick={() => handleClick("/admin/auth/inventory")}>
          總庫存
        </DropdownItem>
        <DropdownItem onClick={() => handleClick("/admin/auth/calculate")}>
          計算庫存
        </DropdownItem>
      </DropdownBtn>
      <Btn
        variant="outline-info"
        onClick={() => handleClick("/admin/auth/orders")}
      >
        面交設定
      </Btn>
      <Btn
        variant="outline-info"
        onClick={() => handleClick("/admin/auth/orders")}
      >
        訂單管理
      </Btn>
      <Btn
        variant="outline-info"
        onClick={() => handleClick("/admin/auth/finance")}
      >
        財務管理
      </Btn>
      <SettingIcon onClick={() => handleClick("/admin/auth/settings")} />
    </Container>
  );
}
