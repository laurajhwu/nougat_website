import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import Api from "../../utils/Api";
import Header from "./Header";
import MainContent from "./MainContent";
import { addNewOrder, getAllOrders } from "../../redux/actions/order";
import {
  addIngredient,
  modifyIngredient,
  removeIngredient,
} from "../../redux/actions/ingredients";

export default function MainPage() {
  const dispatch = useDispatch();

  function handleAddOrder(order) {
    dispatch(addNewOrder(order));
  }

  function handleOrderModified(orders) {
    dispatch(getAllOrders(orders));
  }

  function handleAddIngredient(ingredient) {
    dispatch(addIngredient(ingredient));
  }

  function handleModifyIngredient(ingredient) {
    dispatch(modifyIngredient(ingredient));
  }

  function handleRemoveIngredient(ingredient) {
    dispatch(removeIngredient(ingredient));
  }

  useEffect(() => {
    Api.getAllOrders(handleAddOrder, handleOrderModified);
    Api.getIngredients(
      handleAddIngredient,
      handleModifyIngredient,
      handleRemoveIngredient
    );
  }, []);

  return (
    <>
      <Header />
      <MainContent />
    </>
  );
}
