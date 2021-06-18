import React from "react";
import RememberMe from "../../../../Components/RememberMe";
import ErrorComponent from "../../../../Components/Error";
import propTypes from "prop-types";

import TextField from "@material-ui/core/TextField";
import { Label } from "../styles";
import { Container, Info } from "./styles";

export default function PersonalInfo(props) {
  const { personalInfo, setPersonalInfo, order, classes, handleRememberMe } =
    props;
  function personalInfoOnChange(event) {
    const target = event.target;
    const prop = target.getAttribute("name");
    setPersonalInfo({
      ...personalInfo,
      [prop]: target.value.trim(),
    });
  }
  return (
    <Container>
      <Info>
        <ErrorComponent
          isError={order.personal_info && !order.personal_info.name}
        />

        <Label>姓名* :</Label>
        <TextField
          name="name"
          type="text"
          defaultValue={personalInfo.name}
          onChange={personalInfoOnChange}
          className={classes.input}
        />
        <div></div>
      </Info>
      <Info>
        <ErrorComponent
          isError={order.personal_info && !order.personal_info.line_id}
        />
        <Label>Line ID* :</Label>
        <TextField
          name="line_id"
          defaultValue={personalInfo.line_id}
          type="text"
          onChange={personalInfoOnChange}
          className={classes.input}
        />
        <RememberMe
          prop="line-pay"
          handleRememberData={() =>
            handleRememberMe("line_id", personalInfo.line_id)
          }
        />
      </Info>
      <Info>
        <Label>備註 :</Label>
        <TextField
          name="notes"
          type="text"
          onChange={personalInfoOnChange}
          className={classes.input}
        />
      </Info>
    </Container>
  );
}

PersonalInfo.propTypes = {
  setPersonalInfo: propTypes.func,
  personalInfo: propTypes.object,
  order: propTypes.object,
  classes: propTypes.object,
  handleRememberMe: propTypes.func,
};
