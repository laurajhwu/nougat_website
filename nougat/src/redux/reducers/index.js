import productsReducer from "./products";
import orderReducer from "./order";
import locationsReducer from "./locations";
import memberReducer from "./member";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  products: productsReducer,
  order: orderReducer,
  locations: locationsReducer,
  member: memberReducer,
});

export default allReducers;
