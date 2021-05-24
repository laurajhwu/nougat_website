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

  // function handleAddOrder(order) {
  //   dispatch(addNewOrder(order));
  // }

  // function handleGetOrders(orders) {
  //   dispatch(getAllOrders(orders));
  // }

  // function handleModifyOrder(order) {
  //   dispatch(getModifiedOrder(order));
  // }

  // function handleRemoveOrder(order) {
  //   dispatch(getRemovedOrder(order));
  // }

  // function handleGetAllIngredients(ingredients) {
  //   dispatch(getAllIngredients(ingredients));
  // }

  // function handleAddIngredient(ingredient) {
  //   dispatch(addIngredient(ingredient));
  // }

  // function handleModifyIngredient(ingredient) {
  //   dispatch(modifyIngredient(ingredient));
  // }

  // function handleRemoveIngredient(ingredient) {
  //   dispatch(removeIngredient(ingredient));
  // }

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
    Api.getIngredients(handleIngredientsOnSnapshot);

    Api.getAllOrders(handleOrdersOnSnapshot);
  }, []);

  useEffect(() => {
    // Api.getAllOrders(
    //   {
    //     handleInit: handleGetOrders,
    //     handleAdd: handleAddOrder,
    //     handleModify: handleModifyOrder,
    //     handleRemove: handleRemoveOrder,
    //   },
    //   initState
    // );
    // Api.getIngredients(
    //   {
    //     handleInit: handleGetAllIngredients,
    //     handleAdd: handleAddIngredient,
    //     handleModify: handleModifyIngredient,
    //     handleRemove: handleRemoveIngredient,
    //   },
    //   initState
    // );
  }, []);

  return (
    <>
      <Header />
      <MainContent />
    </>
  );
}
