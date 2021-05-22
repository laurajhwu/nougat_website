import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import Api from "../../utils/Api";
import Header from "./Header";
import MainContent from "./MainContent";
import { addNewOrder, getAllOrders } from "../../redux/actions/order";

export default function MainPage() {
  const dispatch = useDispatch();

  function handleAddOrder(order) {
    dispatch(addNewOrder(order));
  }

  function handleOrderModified(orders) {
    dispatch(getAllOrders(orders));
  }

  useEffect(() => {
    Api.getAllOrders(handleAddOrder, handleOrderModified);
  }, []);

  return (
    <>
      <Header />
      <MainContent />
    </>
  );
}
