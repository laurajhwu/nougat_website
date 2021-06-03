import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import {
  addProduct,
  getProductsData,
  modifyProduct,
  removeProduct,
} from "./redux/actions/products";
import {
  addNewOrder,
  getAllOrders,
  getModifiedOrder,
  getRemovedOrder,
} from "./redux/actions/order";
import {
  addLocation,
  getLocations,
  modifyLocation,
  removeLocation,
} from "./redux/actions/locations";
import {
  getDate,
  getTime,
  getExcludedTimes,
  addExcludedTimes,
  modifyExcludedTimes,
} from "./redux/actions/dateTime";
import MainWebsite from "./MainWebsite";
import Api from "./utils/Api";
import Calendar from "./utils/calendarSettings";
import Admin from "./Admin";

let initProducts = true;
let initLocations = true;
let initExcludedTimes = true;
let initOrders = true;

function App() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

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

  function ordersOnSnapshot(snapshot) {
    if (initOrders) {
      const orders = [];
      snapshot.forEach((order) => {
        orders.push(order.data());
      });
      dispatch(getAllOrders(orders));
      initOrders = false;
    } else {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          dispatch(addNewOrder(change.doc.data()));
        }
        if (change.type === "modified") {
          dispatch(getModifiedOrder(change.doc.data()));
        }
        if (change.type === "removed") {
          dispatch(getRemovedOrder(change.doc.data()));
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

  function dateOnSnapshot(data) {
    dispatch(getDate(data));
  }

  function timeOnSnapshot(data) {
    dispatch(getTime(data));
  }

  function excludedTimesOnSnapshot(snapshot) {
    const convertData = (data) =>
      Object.values(data).map((time) => time.toDate());

    if (initExcludedTimes) {
      const times = {};
      snapshot.forEach((time) => {
        times[time.id] = convertData(time.data());
      });
      dispatch(getExcludedTimes(times));
      initExcludedTimes = false;
    } else {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          dispatch(
            addExcludedTimes(change.doc.id, convertData(change.doc.data()))
          );
        }
        if (change.type === "modified") {
          dispatch(
            modifyExcludedTimes(change.doc.id, convertData(change.doc.data()))
          );
        }
      });
    }
  }

  useEffect(() => {
    Calendar.calendarSettings();

    const unsubscribeProducts = Api.getProducts(productsOnSnapshot);

    const unsubscribeOrders = Api.getAllOrders(ordersOnSnapshot);

    const unsubscribeLocations = Api.getLocations(locationsOnSnapshot);

    const unsubscribeDate = Api.getDate(dateOnSnapshot);

    const unsubscribeTime = Api.getTime(timeOnSnapshot);

    const unsubscribeExcludedTimes = Api.getExcludedTimes(
      excludedTimesOnSnapshot
    );

    return () => {
      unsubscribeProducts();
      unsubscribeOrders();
      unsubscribeLocations();
      unsubscribeDate();
      unsubscribeTime();
      unsubscribeExcludedTimes();
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
