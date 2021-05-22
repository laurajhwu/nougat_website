export const addIngredient = (ingredient) => ({
  type: "ADD_INGREDIENT",
  payload: ingredient,
});

export const modifyIngredient = (ingredient) => ({
  type: "MODIFY_INGREDIENT",
  payload: ingredient,
});

export const removeIngredient = (ingredient) => ({
  type: "REMOVE_INGREDIENT",
  payload: ingredient,
});
