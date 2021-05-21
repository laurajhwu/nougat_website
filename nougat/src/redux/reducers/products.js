import convertToObject from "../../utils/arrayToObjectConverter";

function products(state = [], action) {
  switch (action.type) {
    case "GET_PRODUCTS":
      return action.payload;
    case "UPDATE_PRODUCT":
      const args = action.payload;
      const productObj = convertToObject(state, "id");
      productObj[args.id][args.prop] = args.data;
      return [...state];
    default:
      return state;
  }
}

export default products;
