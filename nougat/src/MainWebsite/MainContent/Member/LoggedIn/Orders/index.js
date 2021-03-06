import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { stringDate } from "../../../../../utils/dateTimeFormat";
import pageSplitter from "../../../../../utils/pageSplitter";
import Loading from "../../../../../Components/LoadingPage";
import Pagination from "../../../../../Components/Pagination";
import OrderDetails from "./OrderDetails";
import { gsap } from "gsap";

import {
  Container,
  Order,
  Title,
  OrderInfo,
  OrderNumLink,
  BendMark,
  OrdersWrapper,
  useStyles,
} from "./styles";

export default function Orders() {
  const orders = useSelector((state) => state.orders).sort(
    (earliest, latest) => latest.timestamp.seconds - earliest.timestamp.seconds
  );
  const fixedData = useSelector((state) => state.fixedData);
  const [show, setShow] = useState(false);
  const [page, setPage] = useState(1);
  const timeline = gsap
    .timeline({
      repeat: -1,
      yoyo: true,
      defaults: { ease: "power1.inOut" },
    })
    .addLabel("start");
  const orderRef = useCallback((ref) => {
    orderAnimation(ref);
  }, []);
  const foldRef = useCallback((ref) => {
    paperFoldAnimation(ref);
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = (id) => setShow(id);

  function orderAnimation(ref) {
    timeline.to(ref, { "border-radius": "0 0 37% 0", duration: 1.5 }, "start");
  }

  function paperFoldAnimation(ref) {
    timeline.to(
      ref,
      {
        right: 2,
        bottom: 15,
        width: 140,
        height: 56,
        rotation: -8,
        duration: 1.5,
      },
      "start"
    );
  }

  if (Object.keys(fixedData).length !== 0 && orders) {
    return (
      <Container>
        <Order>
          <Title>訂單編號</Title>
          <Title>訂單狀態</Title>
          <Title>下單時間</Title>
          <Title>總額</Title>
        </Order>
        <OrdersWrapper>
          {pageSplitter(orders, 5)[page - 1].map((order) => (
            <Order className="order" ref={orderRef} key={order.id}>
              <OrderNumLink variant="link" onClick={() => handleShow(order.id)}>
                {order.id}
              </OrderNumLink>
              <OrderInfo>{fixedData.status[order.status]}</OrderInfo>
              <OrderInfo>{stringDate(order.timestamp.toDate())}</OrderInfo>
              <OrderInfo>${order.total}</OrderInfo>
              <OrderDetails
                show={show === order.id}
                handleClose={handleClose}
                order={order}
                fixedData={fixedData}
              />
              <BendMark className="fold-mark" ref={foldRef} />
            </Order>
          ))}
        </OrdersWrapper>
        <Pagination
          page={page}
          setPage={setPage}
          array={orders}
          itemsPerPage={5}
          useStyles={useStyles}
        />
      </Container>
    );
  } else {
    return <Loading />;
  }
}
