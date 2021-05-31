import React from "react";
import { useHistory } from "react-router-dom";
import CreateAdmin from "./CreateAdmin";

import { Container, Logout } from "./styles";

export default function OtherSettings() {
  const history = useHistory();

  function logout() {
    history.push("/admin/login");
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
