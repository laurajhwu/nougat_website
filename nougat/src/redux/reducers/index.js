import productsReducer from "./products";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  products: productsReducer,
});

export default allReducers;
