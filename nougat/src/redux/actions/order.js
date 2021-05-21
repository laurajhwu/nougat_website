export const getMemberOrders = (orders) => ({
  type: "GET_MEMBER_ORDERS",
  payload: orders,
});

export const addNewOrder = (order) => ({
  type: "ADD_NEW_ORDER",
  payload: order,
});
