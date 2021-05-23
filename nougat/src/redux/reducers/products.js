import convertToObject from "../../utils/arrayToObjectConverter";

function products(state = [], action) {
  switch (action.type) {
    case "GET_PRODUCTS":
      return [...action.payload];
    case "UPDATE_PRODUCT":
      const args = action.payload;
      const productObj = convertToObject(state, "id");
      productObj[args.id][args.prop] = args.data;
      return [...[], ...state];
    case "MODIFY_PRODUCT":
      const i = state.findIndex((product) => product.id === action.payload.id);
      state[i] = action.payload;
      return [...state];
    case "ADD_PRODUCT":
      return [...state, action.payload];
    case "REMOVE_PRODUCT":
      const index = state.findIndex(
        (product) => product.id === action.payload.id
      );
      return [...state.splice(index, 1)];
    default:
      return state;
  }
}

export default products;
