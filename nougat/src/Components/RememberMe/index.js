import React, { useEffect, useState } from "react";
import propTypes from "prop-types";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Container, Label } from "./styles";

export default function RememberMe(props) {
  const { handleRememberData, style, prop } = props;
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    if (checked) {
      handleRememberData();
    }
  }, [checked]);

  return (
    <Container style={style}>
      <FormControlLabel
        control={
          <Checkbox
            checked={checked}
            onChange={() => setChecked(!checked)}
            name="checkedB"
            color="primary"
            value={prop}
            id={prop}
          />
        }
        label={<Label>記住我</Label>}
      />
    </Container>
  );
}

RememberMe.propTypes = {
  handleRememberData: propTypes.object,
  style: propTypes.object,
  prop: propTypes.string,
};
