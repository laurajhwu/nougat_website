import styled from "styled-components";
import { ListGroup } from "react-bootstrap";

export const Img = styled.img`
  width: 100%;
`;

export const List = styled(ListGroup)`
  width: 100%;
  & div {
    text-align: center;
    width: 100px;
  }
`;

export const Item = styled(ListGroup.Item)`
  width: 100px;
`;

export const Description = styled(ListGroup.Item)`
  width: 100% !important;
`;
