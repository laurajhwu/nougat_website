import React, { useEffect } from "react";
import Api from "../../utils/Api";
import useOnSnapshot from "../../Hooks/useOnSnapshot";
import Header from "./Header";
import MainContent from "./MainContent";

import {
  addIngredient,
  getAllIngredients,
  modifyIngredient,
  removeIngredient,
} from "../../redux/actions/ingredients";

export default function MainPage() {
  const handleIngredientsOnSnapshot = useOnSnapshot({
    type: "object",
    getFunc: getAllIngredients,
    addFunc: addIngredient,
    modifyFunc: modifyIngredient,
    removeFunc: removeIngredient,
  });

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
