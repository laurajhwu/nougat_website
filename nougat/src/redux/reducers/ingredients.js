function ingredients(state = null, action) {
  switch (action.type) {
    case "GET_ALL_INGREDIENTS":
      return action.payload;
    case "ADD_INGREDIENT":
      return {
        ...(state ? state : {}),
        ...{ [action.payload.id]: action.payload },
      };
    case "MODIFY_INGREDIENT":
      return {
        ...state,
        [action.payload.id]: action.payload,
      };
    case "REMOVE_INGREDIENT":
      delete state[action.payload.id];
      return { ...state };
    default:
      return state;
  }
}

export default ingredients;
