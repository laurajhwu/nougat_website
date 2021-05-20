function fixedData(state = {}, action) {
  switch (action.type) {
    case "GET_ORDER_STATUS":
      return { ...action.payload };
    default:
      return state;
  }
}

export default fixedData;
