import React, { useState } from "react";
import propTypes from "prop-types";

import { Container, Input, Show, NoShow } from "./styles";

export default function Password(props) {
  const {
    children,
    containerTheme,
    handleChange,
    placeholder,
    notValid,
    inputTheme,
    iconTheme,
  } = props;
  const [display, setDisplay] = useState(false);

  function toggleDisplay() {
    setDisplay(!display);
  }

  return (
    <Container theme={containerTheme || {}}>
      {children ? (
        <>{children(display ? "text" : "password")}</>
      ) : (
        <Input
          onChange={handleChange}
          type={display ? "text" : "password"}
          placeholder={placeholder || ""}
          notValid={notValid === undefined ? false : notValid}
          theme={inputTheme}
        />
      )}

      {display ? (
        <Show onClick={toggleDisplay} theme={iconTheme} />
      ) : (
        <NoShow onClick={toggleDisplay} theme={iconTheme} />
      )}
    </Container>
  );
}

Password.propTypes = {
  children: propTypes.node,
  containerTheme: propTypes.object,
  handleChange: propTypes.func,
  placeholder: propTypes.string,
  notValid: propTypes.bool,
  inputTheme: propTypes.object,
  iconTheme: propTypes.object,
};
