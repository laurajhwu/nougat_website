export const getOrderStatus = () => ({
  type: "GET_ORDER_STATUS",
  payload: { 0: "面交待付款", 1: "待交貨", 2: "交接完畢", 3: "待付款" },
});
