import React from "react";
import { Route, useHistory, useRouteMatch } from "react-router-dom";

import {
  Container,
  Btn,
  DropdownBtn,
  DropdownItem,
  SettingIcon,
} from "./styles";

export default function Header() {
  const history = useHistory();
  const match = useRouteMatch();

  function handleClick(path) {
    history.push(path);
  }

  return (
    <Container>
      <DropdownBtn
        id="dropdown-basic-button"
        title="庫存管理"
        variant="outline-info"
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
        訂單
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
