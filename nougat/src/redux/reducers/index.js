import productsReducer from "./products";
import orderReducer from "./order";
import locationsReducer from "./locations";
import memberReducer from "./member";
import renderPageReducer from "./renderPage";
import fixedDataReducer from "./fixedData";
import ingredientsReducer from "./ingredients";
import dateTimeReducer from "./dateTime";
import qtyChangeReducer from "./qtyChange";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  products: productsReducer,
  orders: orderReducer,
  locations: locationsReducer,
  member: memberReducer,
  reRender: renderPageReducer,
  fixedData: fixedDataReducer,
  ingredients: ingredientsReducer,
  dateTime: dateTimeReducer,
  qtyDiff: qtyChangeReducer,
});

export default allReducers;
