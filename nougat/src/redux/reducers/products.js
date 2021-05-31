import convertToObject from "../../utils/arrayToObjectConverter";

function products(state = [], action) {
  switch (action.type) {
    case "GET_PRODUCTS":
      return [...action.payload];
    case "MODIFY_PRODUCT":
      const i = state.findIndex(
        (product) => !product.id || product.id === action.payload.id
      );
      state[i] = action.payload;
      return [...state];
    case "ADD_PRODUCT":
      return [...state, action.payload];
    case "REMOVE_PRODUCT":
      const index = state.findIndex(
        (product) => product.id === action.payload.id
      );
      state.splice(index, 1);
      return [...state];
    default:
      return state;
  }
}

export default products;
