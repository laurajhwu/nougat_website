export const getProductsData = (products) => ({
  type: "GET_PRODUCTS",
  payload: products,
});

export const modifyProduct = (product) => ({
  type: "MODIFY_PRODUCT",
  payload: product,
});

export const addProduct = (product) => ({
  type: "ADD_PRODUCT",
  payload: product,
});

export const removeProduct = (product) => ({
  type: "REMOVE_PRODUCT",
  payload: product,
});
