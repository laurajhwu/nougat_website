import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./redux";
import FontStyles from "./fontStyles";
import(/* webpackPreload: true */ "./fonts/OzCaramel.ttf");
import(/* webpackPreload: true */ "./fonts/HanyiSentyMarshmallow.woff");
import(/* webpackPreload: true */ "./fonts/HanyiSentyChalk.woff");
import(/* webpackPreload: true */ "./fonts/HanyiSentyScholar.woff");
import(/* webpackPreload: true */ "./fonts/HanyiSentyLotus.woff");

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <FontStyles />
      <App />
    </Provider>
  </StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
