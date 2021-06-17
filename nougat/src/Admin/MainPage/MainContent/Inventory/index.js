import React from "react";
import { Accordion, Card, Button } from "react-bootstrap";
import TabsBS from "./TabsBS";
import DragAndDropOrders from "./OrderProducts";

import { AccordionContainer, CardContainer, CardBody } from "./styles";

export default function Inventory() {
  return (
    <>
      <AccordionContainer defaultActiveKey="0">
        <CardContainer>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              所有庫存
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <CardBody>
              <TabsBS />
            </CardBody>
          </Accordion.Collapse>
        </CardContainer>
        <CardContainer>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="1">
              產品首頁排列
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="1">
            <CardBody>
              <DragAndDropOrders />
            </CardBody>
          </Accordion.Collapse>
        </CardContainer>
      </AccordionContainer>
    </>
  );
}
