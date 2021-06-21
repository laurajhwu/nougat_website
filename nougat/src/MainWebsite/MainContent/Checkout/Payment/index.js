import React from "react";
import RememberMe from "../../../../Components/RememberMe";
import propTypes from "prop-types";

import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { Label, Options, Option } from "../styles";
import { Container } from "./styles";

export default function Payment(props) {
  const { classes, setPayment, payment, handleRememberMe, remember } = props;

  function paymentOptionChange(event) {
    setPayment(event.target.value);
  }

  return (
    <Container>
      <Label> 付款方式* :</Label>
      <FormControl className={classes.formControl}>
        <Options
          onChange={paymentOptionChange}
          value={payment}
          className={classes.select}
          inputProps={{
            classes: {
              icon: classes.icon,
            },
          }}
        >
          <Option value="cash" className={classes.option}>
            面交現金
          </Option>
          <Option value="line-pay" className={classes.option}>
            Line Pay
          </Option>
        </Options>
        <FormHelperText className={classes.label}></FormHelperText>
      </FormControl>
      <RememberMe
        prop="payment"
        handleRememberData={() =>
          handleRememberMe("order_info", {
            ...remember.order_info,
            payment,
          })
        }
      />
    </Container>
  );
}

Payment.propTypes = {
  setPayment: propTypes.func,
  payment: propTypes.string,
  classes: propTypes.object,
  handleRememberMe: propTypes.func,
  remember: propTypes.object,
};
