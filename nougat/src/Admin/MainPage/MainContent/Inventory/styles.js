import styled from "styled-components";
import { Accordion, Card, Button } from "react-bootstrap";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

export const AccordionContainer = styled(Accordion)`
  margin-left: 160px;
  width: 80%;
  max-width: 1000px;
`;

export const CardContainer = styled(Card)``;
export const CardBody = styled(Card.Body)`
  height: 70vh;
  overflow: scroll;
  min-height: 600px;
  max-height: 1000px;
`;
