function qtyChange(state = false, action) {
  switch (action.type) {
    case "SET_QTY":
      return action.payload;
    default:
      return state;
  }
}

export default qtyChange;
