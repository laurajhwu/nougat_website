function member(state = null, action) {
  switch (action.type) {
    case "GET_MEMBER":
      return action.payload ? { ...action.payload } : null;
    default:
      return state;
  }
}

export default member;
