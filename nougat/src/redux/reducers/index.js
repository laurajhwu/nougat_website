import productsReducer from "./products";
import orderReducer from "./order";
import locationsReducer from "./locations";
import memberReducer from "./member";
import renderPageReducer from "./renderPage";
import fixedDataReducer from "./fixedData";
import ingredientsReducer from "./ingredients";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  products: productsReducer,
  orders: orderReducer,
  locations: locationsReducer,
  member: memberReducer,
  reRender: renderPageReducer,
  fixedData: fixedDataReducer,
  ingredients: ingredientsReducer,
});

export default allReducers;
