export const getMemberOrders = (orders) => ({
  type: "GET_MEMBER_ORDERS",
  payload: orders,
});

export const addNewOrder = (order) => ({
  type: "ADD_NEW_ORDER",
  payload: order,
});

export const getAllOrders = (orders) => ({
  type: "GET_All_ORDERS",
  payload: orders,
});
