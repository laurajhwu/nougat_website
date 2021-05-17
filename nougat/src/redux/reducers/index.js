import productsReducer from "./products";
import orderReducer from "./order";
import locationsReducer from "./locations";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  products: productsReducer,
  order: orderReducer,
  locations: locationsReducer,
});

export default allReducers;
