import React from "react";
import { Button, Header, Image, Modal } from "semantic-ui-react";
import LineQR from "../../../images/line-QR.png";
import propTypes from "prop-types";

export default function ContactUs(props) {
  const { handleClose } = props;
  return (
    <>
      <Modal.Header
        style={{ color: "#00B900", "font-size": "28px", fontFamily: "chalk" }}
      >
        加入官方Line
      </Modal.Header>
      <Modal.Content
        image
        style={{
          background: "rgb(0,185,0)",
          // eslint-disable-next-line no-dupe-keys
          background:
            "linear-gradient(156deg, rgba(0,185,0,1) 0%, rgba(134,230,178,1) 100%)",
          "font-size": "20px",
        }}
      >
        <Image size="small" src={LineQR} wrapped />
        <Modal.Description
          style={{
            color: "#fff",
            display: "flex",
            "flex-flow": "column nowrap",
            margin: "auto 0",
            "font-size": "18px",
            fontFamily: "chalk",
          }}
        >
          <Header
            style={{
              color: "#fff",
              "border-bottom": "3px solid white",
              "padding-bottom": "5px",
              "margin-top": "5px",
              fontFamily: "chalk",
            }}
          >
            搜尋Line ID
          </Header>
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
