import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  addProduct,
  getProductsData,
  modifyProduct,
  removeProduct,
} from "./redux/actions/products";
import {
  addLocation,
  getLocations,
  modifyLocation,
  removeLocation,
} from "./redux/actions/locations";
import { getMember } from "./redux/actions/member";
import MainContent from "./MainWebsite/MainContent";
import Header from "./MainWebsite/Header";
import Api from "./utils/Api";
import Calendar from "./utils/calendarSettings";
import Admin from "./Admin";

let initProducts = true;
let initLocations = true;

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
    if (initProducts) {
      const products = [];
      snapshot.forEach((product) => {
        products.push(product.data());
      });
      dispatch(getProductsData(products));
      initProducts = false;
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

  function locationsOnSnapshot(snapshot) {
    if (initLocations) {
      const locations = [];
      snapshot.forEach((location) => {
        locations.push(location.data());
      });
      dispatch(getLocations(locations));
      initLocations = false;
    } else {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          dispatch(addLocation(change.doc.data()));
        }
        if (change.type === "modified") {
          dispatch(modifyLocation(change.doc.data()));
        }
        if (change.type === "removed") {
          dispatch(removeLocation(change.doc.data()));
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

    const unsubscribeLocations = Api.getLocations(locationsOnSnapshot);

    const unsubscribeLogin = Api.getLoginStatus(onLoginStatusChange);

    return () => {
      unsubscribeLogin();
      unsubscribeProducts();
      unsubscribeLocations();
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
