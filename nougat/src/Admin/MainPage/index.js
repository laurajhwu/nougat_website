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

let initIngredients = true;
let initOrders = true;

export default function MainPage() {
  const dispatch = useDispatch();

  function handleOrdersOnSnapshot(snapshot) {
    if (initOrders) {
      const orders = [];
      snapshot.forEach((order) => {
        orders.push(order.data());
      });
      dispatch(getAllOrders(orders));
      initOrders = false;
    } else {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          dispatch(addNewOrder(change.doc.data()));
        }
        if (change.type === "modified") {
          dispatch(getModifiedOrder(change.doc.data()));
        }
        if (change.type === "removed") {
          dispatch(getRemovedOrder(change.doc.data()));
        }
      });
    }
  }

  function handleIngredientsOnSnapshot(snapshot) {
    if (initIngredients) {
      const ingredients = {};
      snapshot.forEach((doc) => {
        Object.assign(ingredients, { [doc.data().id]: doc.data() });
      });
      dispatch(getAllIngredients(ingredients));
      initIngredients = false;
    } else {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          dispatch(addIngredient(change.doc.data()));
        }
        if (change.type === "modified") {
          dispatch(modifyIngredient(change.doc.data()));
        }
        if (change.type === "removed") {
          dispatch(removeIngredient(change.doc.data()));
        }
      });
    }
  }

  useEffect(() => {
    const unsubscribeIngredients = Api.getIngredients(
      handleIngredientsOnSnapshot
    );

    const unsubscribeOrders = Api.getAllOrders(handleOrdersOnSnapshot);

    return () => {
      unsubscribeIngredients();
      unsubscribeOrders();
    };
  }, []);

  return (
    <>
      <Header />
      <MainContent />
    </>
  );
}
