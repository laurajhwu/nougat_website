import convertToObj from "../../utils/arrayToObjectConverter";

function orders(state = null, action) {
  switch (action.type) {
    case "GET_ALL_ORDERS":
      return [...action.payload];
    case "GET_MEMBER_ORDERS":
      return [...action.payload];
    case "ADD_NEW_ORDER":
      return [...state, action.payload];
    case "GET_MODIFIED_ORDER":
      const modifyOrder = state.find(
        (order) => !order.id || order.id === action.payload.id
      );
      Object.assign(modifyOrder, action.payload);
      return [...state];
    case "GET_REMOVED_ORDER":
      const OrdersObj = convertToObj(state, "id");
      delete OrdersObj[action.payload.id];
      return Object.values(OrdersObj);
    default:
      return state;
  }
}

export default orders;
