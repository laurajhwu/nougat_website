import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useSelector } from "react-redux";

import { Container, Order, Title, OrderInfo } from "./styles";

export default function Orders() {
  const orders = useSelector((state) => state.orders).sort(
    (earliest, latest) => latest.timestamp - earliest.timestamp
  );
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Container>
      <Order>
        <Title>訂單編號</Title>
        <Title>訂單狀態</Title>
        <Title>下單時間</Title>
        <Title>總額</Title>
      </Order>
      {orders.map((order) => (
        <Order>
          <Button variant="link" onClick={handleShow}>
            {order.id}
          </Button>
        </Order>
      ))}
    </Container>
  );
}
