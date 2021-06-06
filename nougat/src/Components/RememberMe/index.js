import React, { useEffect, useState } from "react";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Container } from "./styles";

export default function RememberMe(props) {
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    if (checked) {
      props.handleRememberData();
    }
  }, [checked]);

  return (
    <Container style={props.style}>
      <FormControlLabel
        control={
          <Checkbox
            checked={checked}
            onChange={() => setChecked(!checked)}
            name="checkedB"
            color="primary"
            value={props.prop}
            id={props.prop}
          />
        }
        label="記住我"
      />

      {/* <Checkbox
        type="checkbox"
        value={props.prop}
        id={props.prop}
        onChange={() => setChecked(!checked)}
      />
      <Label for={props.prop}>記住我</Label> */}
    </Container>
  );
}
