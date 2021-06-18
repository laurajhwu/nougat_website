function locations(state = [], action) {
  switch (action.type) {
    case "GET_LOCATIONS":
      return action.payload;
    case "MODIFY_LOCATION": {
      const copiedState = [...state];
      const index = state.findIndex(
        (location) => !location.id || location.id === action.payload.id
      );
      copiedState.splice(index, 1, action.payload);
      return [...copiedState];
    }
    case "ADD_LOCATION":
      return [...state, action.payload];
    case "REMOVE_LOCATION": {
      const copiedState = [...state];
      const index = state.findIndex(
        (location) => location.id === action.payload.id
      );
      copiedState.splice(index, 1);
      return [...copiedState];
    }
    default:
      return state;
  }
}

export default locations;
