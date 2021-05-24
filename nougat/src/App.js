import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  addProduct,
  getProductsData,
  modifyProduct,
  removeProduct,
} from "./redux/actions/products";
import { getLocations } from "./redux/actions/locations";
import { getMember } from "./redux/actions/member";
import MainContent from "./MainWebsite/MainContent";
import Header from "./MainWebsite/Header";
import Api from "./utils/Api";
import getLoginStatus from "./utils/loginStatus";
import Calendar from "./utils/calendarSettings";
import Admin from "./Admin";

let initState = true;

function App() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const MainWebsite = () => (
    <>
      <Header />
      <MainContent />
    </>
  );

  function orderOnSnapshot(snapshot) {
    if (initState) {
      const products = [];
      snapshot.forEach((order) => {
        products.push(order.data());
      });
      dispatch(getProductsData(products));
      initState = false;
    } else {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          dispatch(addProduct(change.doc.data()));
        }
        if (change.type === "modified") {
          dispatch(modifyProduct(change.doc.data()));
        }
        if (change.type === "removed") {
          dispatch(removeProduct(change.doc.data()));
        }
      });
    }
  }

  useEffect(() => {
    Calendar.calendarSettings();

    Api.getProducts(orderOnSnapshot);

    Api.getLocations().then((allLocations) => {
      dispatch(getLocations(allLocations));
    });

    getLoginStatus((user) => {
      if (user) {
        Api.getMemberInfo(user.uid).then((data) => {
          dispatch(getMember(data));
        });
      } else {
        dispatch(getMember({}));
      }
    });
  }, []);

  return (
    <>
      {products ? (
        <Router>
          <Switch>
            <Route path="/admin" component={Admin} />
            <Route path="/" component={MainWebsite} />
          </Switch>
        </Router>
      ) : (
        <></>
      )}
    </>
  );
}

export default App;
