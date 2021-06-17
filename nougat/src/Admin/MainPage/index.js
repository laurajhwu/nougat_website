import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Api from "../../utils/Api";
import Header from "./Header";
import MainContent from "./MainContent";

import {
  addIngredient,
  getAllIngredients,
  modifyIngredient,
  removeIngredient,
} from "../../redux/actions/ingredients";

let initIngredients = true;

export default function MainPage() {
  const dispatch = useDispatch();

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

    return () => {
      unsubscribeIngredients();
    };
  }, []);

  return (
    <>
      <Header />
      <MainContent />
    </>
  );
}
