import styled from "styled-components";
import { Accordion, Card, Button } from "react-bootstrap";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

export const AccordionContainer = styled(Accordion)``;

export const CardContainer = styled(Card)``;
export const CardBody = styled(Card.Body)`
  height: 70vh;
  overflow: scroll;
  min-height: 600px;
  max-height: 1000px;
`;
