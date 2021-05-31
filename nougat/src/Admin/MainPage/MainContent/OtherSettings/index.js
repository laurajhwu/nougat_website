import React from "react";
import { useHistory } from "react-router-dom";
import CreateAdmin from "./CreateAdmin";

import { Container } from "./styles";

export default function OtherSettings() {
  const history = useHistory();
  return (
    <Container>
      <CreateAdmin />
    </Container>
  );
}
