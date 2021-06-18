function dateTime(state = {}, action) {
  switch (action.type) {
    case "GET_DATE":
      return { ...state, date: action.payload };
    case "GET_TIME":
      return { ...state, time: { ...(state.time || {}), ...action.payload } };
    case "GET_EXCLUDED_TIMES":
      return {
        ...state,
        time: { ...state.time, excluded_times: action.payload },
      };
    case "ADD_EXCLUDED_TIMES":
      state.time.excluded_times = {
        ...state.time.excluded_times,
        ...action.payload,
      };
      return { ...state };
    case "MODIFY_EXCLUDED_TIMES":
      state.time.excluded_times = {
        ...state.time.excluded_times,
        ...action.payload,
      };
      return { ...state };
    default:
      return state;
  }
}

export default dateTime;
