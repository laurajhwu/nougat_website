import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import Api from "../../utils/Api";
import Header from "./Header";
import MainContent from "./MainContent";
import { addNewOrder, getAllOrders } from "../../redux/actions/order";
import {
  addIngredient,
  getAllIngredients,
  modifyIngredient,
  removeIngredient,
} from "../../redux/actions/ingredients";

export default function MainPage() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const orders = useSelector((state) => state.orders);
  const ingredients = useSelector((state) => state.orders);

  function handleAddOrder(order) {
    dispatch(addNewOrder(order));
  }

  function handleGetOrders(orders) {
    dispatch(getAllOrders(orders));
  }

  function handleAddIngredient(ingredient) {
    dispatch(getAllIngredients(ingredients));
  }

  function handleModifyIngredient(ingredient) {
    dispatch(modifyIngredient(ingredient));
  }

  function handleRemoveIngredient(ingredient) {
    dispatch(removeIngredient(ingredient));
  }

  useEffect(() => {
    Api.initAllOrders().then((orders) => {
      dispatch(getAllOrders(orders));
    });
    Api.initIngredients().then((ingredients) => {
      dispatch(getAllIngredients(ingredients));
    });

    Api.getAllOrders(handleGetOrders);
    Api.getIngredients(
      handleAddIngredient,
      handleModifyIngredient,
      handleRemoveIngredient
    );
  }, []);

  useEffect(() => {}, []);

  return (
    <>
      <Header />
      <MainContent />
    </>
  );
}
