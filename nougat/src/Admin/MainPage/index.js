import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import Api from "../../utils/Api";
import Header from "./Header";
import MainContent from "./MainContent";
import {
  addNewOrder,
  getAllOrders,
  getModifiedOrder,
  getRemovedOrder,
} from "../../redux/actions/order";
import {
  addIngredient,
  getAllIngredients,
  modifyIngredient,
  removeIngredient,
} from "../../redux/actions/ingredients";

export default function MainPage() {
  const dispatch = useDispatch();
  const [initState, setInitState] = useState(true);
  const orders = useSelector((state) => state.orders);
  const ingredients = useSelector((state) => state.orders);

  function handleAddOrder(order) {
    dispatch(addNewOrder(order));
  }

  function handleGetOrders(orders) {
    dispatch(getAllOrders(orders));
  }

  function handleModifyOrder(order) {
    dispatch(getModifiedOrder(order));
  }

  function handleRemoveOrder(order) {
    dispatch(getRemovedOrder(order));
  }

  function handleGetAllIngredients(ingredients) {
    dispatch(getAllIngredients(ingredients));
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
    if (orders && ingredients) {
      setInitState(false);
    }
  }, []);

  useEffect(() => {
    Api.getAllOrders(
      {
        handleInit: handleGetOrders,
        handleAdd: handleAddOrder,
        handleModify: handleModifyOrder,
        handleRemove: handleRemoveOrder,
      },
      initState
    );

    Api.getIngredients(
      {
        handleInit: handleGetAllIngredients,
        handleAdd: handleAddIngredient,
        handleModify: handleModifyIngredient,
        handleRemove: handleRemoveIngredient,
      },
      initState
    );
  }, [initState]);

  return (
    <>
      <Header />
      <MainContent />
    </>
  );
}
