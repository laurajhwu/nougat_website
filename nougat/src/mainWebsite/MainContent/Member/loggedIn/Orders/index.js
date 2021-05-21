import React, { useState } from "react";
import { useSelector } from "react-redux";
import convertTimestamp from "../../../../../utils/convertTimestamp";
import OrderDetails from "./OrderDetails";

import { Container, Order, Title, OrderInfo, OrderNumLink } from "./styles";

export default function Orders() {
  const orders = useSelector((state) => state.orders).sort(
    (earliest, latest) => latest.timestamp.seconds - earliest.timestamp.seconds
  );
  const fixedData = useSelector((state) => state.fixedData);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (id) => setShow(id);

  return (
    <Container>
      <Order>
        <Title>訂單編號</Title>
        <Title>訂單狀態</Title>
        <Title>下單時間</Title>
        <Title>總額</Title>
      </Order>
      {orders.map((order) => (
        <>
          <Order>
            <OrderNumLink variant="link" onClick={() => handleShow(order.id)}>
              {order.id}
            </OrderNumLink>
            <OrderInfo>{fixedData.status[order.status]}</OrderInfo>
            <OrderInfo>{convertTimestamp(order.timestamp.toDate())}</OrderInfo>
            <OrderInfo>${order.total}</OrderInfo>
            <OrderDetails
              show={show === order.id}
              handleClose={handleClose}
              order={order}
              fixedData={fixedData}
            />
          </Order>
        </>
      ))}
    </Container>
  );
}
