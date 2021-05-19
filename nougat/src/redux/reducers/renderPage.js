function renderPage(state = true, action) {
  switch (action.type) {
    case "RENDER":
      return !state;
    default:
      return state;
  }
}

export default renderPage;
