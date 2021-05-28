export const getDate = (date) => ({
  type: "GET_DATE",
  payload: date,
});

export const getTime = (time) => ({
  type: "GET_TIME",
  payload: time,
});
