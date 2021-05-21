export const getOrderFixedData = () => ({
  type: "GET_ORDER_FIXED_DATA",
  payload: {
    status: { 0: "面交待付款", 1: "待交貨", 2: "交接完畢", 3: "待付款" },
    payment: { cash: "付現", "line-pay": "Line Pay" },
    delivery: { "face-to-face": "面交" },
  },
});
