function member(
  state = {
    id: "CQuJUQzLvvbrlPiDYC9SaWkrcg23",
    cart_items: [],
  },
  action
) {
  switch (action.type) {
    case "UPDATE_MEMBER":
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export default member;
