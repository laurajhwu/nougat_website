import styled from "styled-components";
import { Modal, Button } from "react-bootstrap";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Order = styled.div`
  display: flex;
  width: 100%;
  max-width: 1024px;
  justify-content: space-between;
`;

export const Title = styled.div`
  text-align: center;
  width: 25%;
`;

export const OrderInfo = styled.div`
  text-align: center;
  flex-basis: 25%;
`;

export const OrderNumLink = styled(Button)`
  text-align: center;
  flex-basis: 25%;
`;
