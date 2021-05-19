import productsReducer from "./products";
import orderReducer from "./order";
import locationsReducer from "./locations";
import memberReducer from "./member";
import renderPageReducer from "./renderPage";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  products: productsReducer,
  order: orderReducer,
  locations: locationsReducer,
  member: memberReducer,
  reRender: renderPageReducer,
});

export default allReducers;
