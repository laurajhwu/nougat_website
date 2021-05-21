export const getProductsData = (products) => ({
  type: "GET_PRODUCTS",
  payload: products,
});

export const updateProduct = (productId, prop, data) => ({
  type: "UPDATE_PRODUCT",
  payload: { id: productId, prop, data },
});
