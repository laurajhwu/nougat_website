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

  function productsOnSnapshot(snapshot) {
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
          console.log(
            "🚀 ~ file: App.js ~ line 49 ~ snapshot.docChanges ~ change.doc.data()",
            change.doc.data()
          );
        }
      });
    }
  }

  function onLoginStatusChange(user) {
    if (user) {
      Api.getMemberInfo(user.uid).then((data) => {
        dispatch(getMember(data));
      });
    } else {
      dispatch(getMember({}));
    }
  }

  useEffect(() => {
    Calendar.calendarSettings();

    const unsubscribeProducts = Api.getProducts(productsOnSnapshot);

    Api.getLocations().then((allLocations) => {
      dispatch(getLocations(allLocations));
    });

    const unsubscribeLogin = Api.getLoginStatus(onLoginStatusChange);

    return () => {
      unsubscribeLogin();
      unsubscribeProducts();
    };
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
