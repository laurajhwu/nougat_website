function locations(state = [], action) {
  switch (action.type) {
    case "GET_LOCATIONS":
      return action.payload;
    default:
      return state;
  }
}

export default locations;
