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
        theme={props.inputTheme}
      />
      {display ? (
        <Show onClick={toggleDisplay} theme={props.iconTheme} />
      ) : (
        <NoShow onClick={toggleDisplay} theme={props.iconTheme} />
      )}
    </Container>
  );
}
