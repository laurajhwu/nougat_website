import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { stringDate } from "../../../../../utils/dateTimeFormat";
import Loading from "../../../../../Components/LoadingPage";
import OrderDetails from "./OrderDetails";
import { gsap } from "gsap";

import {
  Container,
  Order,
  Title,
  OrderInfo,
  OrderNumLink,
  BendMark,
} from "./styles";

export default function Orders() {
  const orders = useSelector((state) => state.orders).sort(
    (earliest, latest) => latest.timestamp.seconds - earliest.timestamp.seconds
  );
  const fixedData = useSelector((state) => state.fixedData);
  const [show, setShow] = useState(false);
  const [refs, setRefs] = useState({ order: null, fold: null });
  const orderRef = useCallback((ref) => {
    refs.order = refs.order ? [...refs.order, ref] : [ref];
    setRefs({ ...refs });
  }, []);
  const foldRef = useCallback((ref) => {
    refs.fold = refs.fold ? [...refs.fold, ref] : [ref];
    setRefs({ ...refs });
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = (id) => setShow(id);

  function noteAnimation() {
    gsap
      .timeline({ repeat: -1, yoyo: true, defaults: { ease: "power1.inOut" } })
      .addLabel("start")
      .to(refs.fold, {
        right: 2,
        bottom: 15,
        width: 140,
        height: 56,
        rotation: -8,
        duration: 1.5,
      })
      .to(refs.order, { "border-radius": "0 0 37% 0", duration: 1.5 }, "start");
  }

  useEffect(() => {
    if (refs.order && refs.fold) {
      noteAnimation();
    }
  }, [refs]);

  if (Object.keys(fixedData).length !== 0 && orders) {
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
            <Order className="order" ref={orderRef}>
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
          </>
        ))}
      </Container>
    );
  } else {
    return <Loading />;
  }
}
