export const getAllIngredients = (ingredients) => ({
  type: "GET_ALL_INGREDIENTS",
  payload: ingredients,
});

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
