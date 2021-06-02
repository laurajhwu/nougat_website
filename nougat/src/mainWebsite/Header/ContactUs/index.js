import React from "react";
import { Button, Header, Image, Modal } from "semantic-ui-react";
import LineQR from "../../../images/line-QR.png";

import { Container } from "./styles";

export default function ContactUs(props) {
  const { handleClose } = props;
  return (
    <>
      <Modal.Header style={{ color: "#00B900", "font-size": "28px" }}>
        加入官方Line
      </Modal.Header>
      <Modal.Content
        image
        style={{
          background: "rgb(0,185,0)",
          background:
            "linear-gradient(156deg, rgba(0,185,0,1) 0%, rgba(134,230,178,1) 100%)",
          "font-size": "18px",
        }}
      >
        <Image size="small" src={LineQR} wrapped />
        <Modal.Description
          style={{
            color: "#fff",
            display: "flex",
            "flex-flow": "column nowrap",
            margin: "auto 0",
            "font-size": "16px",
          }}
        >
          <Header
            style={{
              color: "#fff",
              "border-bottom": "3px solid white",
              "padding-bottom": "5px",
              "margin-top": "5px",
            }}
          >
            或搜尋Line ID
          </Header>
          <p>@921gopso</p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        {/* <Button color="black" onClick={handleClose}>
          Nope
        </Button> */}
        <Button
          content="已加入！"
          labelPosition="right"
          icon="checkmark"
          onClick={handleClose}
          positive
        />
      </Modal.Actions>
    </>
  );
}
