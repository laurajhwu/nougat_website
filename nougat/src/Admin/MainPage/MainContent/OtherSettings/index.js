import React from "react";
import CreateAdmin from "./CreateAdmin";

import { Container, Logout } from "./styles";

export default function OtherSettings() {
  function logout() {
    window.location.reload();
  }

  return (
    <Container>
      <CreateAdmin />
      <Logout variant="contained" onClick={logout}>
        登出
      </Logout>
    </Container>
  );
}
