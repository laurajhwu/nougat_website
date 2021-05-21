function order(state = [], action) {
  switch (action.type) {
    case "GET_MEMBER_ORDERS":
      return [...action.payload];
    case "ADD_NEW_ORDER":
      return [...state, action.payload];
    default:
      return state;
  }
}

export default order;
