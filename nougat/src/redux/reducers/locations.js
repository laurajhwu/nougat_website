function locations(state = [], action) {
  switch (action.type) {
    case "GET_LOCATIONS":
      return action.payload;
    case "MODIFY_LOCATION":
      const i = state.findIndex(
        (location) => !location.id || location.id === action.payload.id
      );

      state[i] = action.payload;
      return [...state];
    case "ADD_LOCATION":
      return [...state, action.payload];
    case "REMOVE_LOCATION":
      const index = state.findIndex(
        (location) => location.id === action.payload.id
      );
      state.splice(index, 1);
      return [...state];
    default:
      return state;
  }
}

export default locations;
