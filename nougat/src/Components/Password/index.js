import React, { useState } from "react";

import { Container, Input, Show, NoShow } from "./styles";

export default function Password(props) {
  const [display, setDisplay] = useState(false);

  function toggleDisplay() {
    setDisplay(!display);
  }

  return (
    <Container>
      <Input
        onChange={props.handleChange}
        type={display ? "text" : "password"}
        placeholder={props.placeholder || ""}
        notValid={props.notValid === undefined ? false : props.notValid}
      />
      {display ? (
        <Show onClick={toggleDisplay} />
      ) : (
        <NoShow onClick={toggleDisplay} />
      )}
    </Container>
  );
}
