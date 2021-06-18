import React from "react";
import { Button, Header, Image, Modal } from "semantic-ui-react";
import LineQR from "../../../images/line-QR.png";
import propTypes from "prop-types";

import {
  headerStyle,
  contentStyle,
  descriptionStyle,
  titleStyle,
} from "./styles";

export default function ContactUs(props) {
  const { handleClose } = props;
  return (
    <>
      <Modal.Header style={headerStyle}>加入官方Line</Modal.Header>
      <Modal.Content image style={contentStyle}>
        <Image size="small" src={LineQR} wrapped />
        <Modal.Description style={descriptionStyle}>
          <Header style={titleStyle}>搜尋Line ID</Header>
          <p style={{ fontFamily: "chalk" }}>@921gopso</p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button
          content="已加入！"
          labelPosition="right"
          icon="checkmark"
          onClick={handleClose}
          positive
          style={{ fontFamily: "chalk" }}
        />
      </Modal.Actions>
    </>
  );
}

ContactUs.propTypes = {
  handleClose: propTypes.func,
};
