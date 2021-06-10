import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { stringDate } from "../../../../../utils/dateTimeFormat";
import pageSplitter from "../../../../../utils/pageSplitter";
import Loading from "../../../../../Components/LoadingPage";
import OrderDetails from "./OrderDetails";
import { gsap } from "gsap";

import Pagination from "@material-ui/lab/Pagination";
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
  const classes = useStyles();
  const orders = useSelector((state) => state.orders).sort(
    (earliest, latest) => latest.timestamp.seconds - earliest.timestamp.seconds
  );
  const fixedData = useSelector((state) => state.fixedData);
  const [show, setShow] = useState(false);
  const [refs, setRefs] = useState({ order: null, fold: null });
  const [page, setPage] = useState(1);
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

  function changePage(event, value) {
    setPage(value);
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
        <OrdersWrapper>
          {pageSplitter(orders, 5)[page - 1].map((order) => (
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
          ))}
        </OrdersWrapper>
        <Pagination
          count={Math.ceil(orders.length / 5)}
          className={classes.pagination}
          size="large"
          page={page}
          onChange={changePage}
        />
      </Container>
    );
  } else {
    return <Loading />;
  }
}