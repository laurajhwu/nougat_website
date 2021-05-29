export const getDate = (date) => ({
  type: "GET_DATE",
  payload: date,
});

export const getTime = (time) => ({
  type: "GET_TIME",
  payload: time,
});

export const getExcludedTimes = (times) => ({
  type: "GET_EXCLUDED_TIMES",
  payload: times,
});

export const addExcludedTimes = (id, times) => ({
  type: "ADD_EXCLUDED_TIMES",
  payload: { [id]: times },
});

export const modifyExcludedTimes = (id, times) => ({
  type: "MODIFY_EXCLUDED_TIMES",
  payload: { [id]: times },
});
