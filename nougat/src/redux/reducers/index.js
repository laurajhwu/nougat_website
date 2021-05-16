import productsReducer from "./products";
import orderReducer from "./order";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  products: productsReducer,
  order: orderReducer,
});

export default allReducers;
