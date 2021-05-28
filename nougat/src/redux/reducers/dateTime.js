function dateTime(state = {}, action) {
  switch (action.type) {
    case "GET_DATE":
      return { ...state, date: action.payload };
    case "GET_TIME":
      return { ...state, time: action.payload };
    default:
      return state;
  }
}

export default dateTime;
