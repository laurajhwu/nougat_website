import React, { useEffect, useState } from "react";

import { Container, Checkbox, Label } from "./styles";

export default function RememberMe(props) {
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    if (checked) {
      props.handleRememberData();
    }
  }, [checked]);

  return (
    <Container>
      <Checkbox
        type="checkbox"
        value={props.prop}
        id={props.prop}
        onChange={() => setChecked(!checked)}
      />
      <Label for={props.prop}>記住我</Label>
    </Container>
  );
}
