function member(state = {}, action) {
  switch (action.type) {
    case "UPDATE_MEMBER":
      return { ...state, ...action.payload };
    case "GET_MEMBER":
      return { ...action.payload };
    default:
      return state;
  }
}

export default member;
