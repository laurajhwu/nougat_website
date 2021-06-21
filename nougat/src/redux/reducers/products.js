function products(state = [], action) {
  switch (action.type) {
    case "GET_PRODUCTS":
      return [...action.payload];
    case "MODIFY_PRODUCT": {
      const copiedState = [...state];
      const index = state.findIndex(
        (product) => !product.id || product.id === action.payload.id
      );
      copiedState.splice(index, 1, action.payload);
      return [...copiedState];
    }
    case "ADD_PRODUCT":
      return [...state, action.payload];
    case "REMOVE_PRODUCT": {
      const copiedState = [...state];
      const index = state.findIndex(
        (product) => product.id === action.payload.id
      );
      copiedState.splice(index, 1);
      return [...copiedState];
    }
    default:
      return state;
  }
}

export default products;
