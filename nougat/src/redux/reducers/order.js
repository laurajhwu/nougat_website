function order(state = [], action) {
  switch (action.type) {
    case "GET_MEMBER_ORDERS":
      return [...action.payload];
    case "GET_ALL_ORDERS":
      return [
        ...action.payload.sort(
          (old, recent) => recent.timestamp.seconds - old.timestamp.seconds
        ),
      ];
    case "ADD_NEW_ORDER":
      return [...state, action.payload];
    default:
      return state;
  }
}

export default order;
