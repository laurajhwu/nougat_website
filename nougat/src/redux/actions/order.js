export const getMemberOrders = (orders) => ({
  type: "GET_MEMBER_ORDERS",
  payload: orders,
});

export const getAllOrders = (orders) => ({
  type: "GET_ALL_ORDERS",
  payload: orders,
});

export const addNewOrder = (order) => ({
  type: "ADD_NEW_ORDER",
  payload: order,
});

export const getModifiedOrder = (order) => ({
  type: "GET_MODIFIED_ORDER",
  payload: order,
});

export const getRemovedOrder = (order) => ({
  type: "GET_REMOVED_ORDER",
  payload: order,
});
