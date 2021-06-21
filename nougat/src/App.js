import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import useOnSnapshot from "./Hooks/useOnSnapshot";
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

function App() {
  const dispatch = useDispatch();
  const productsOnSnapshot = useOnSnapshot({
    getFunc: getProductsData,
    addFunc: addProduct,
    modifyFunc: modifyProduct,
    removeFunc: removeProduct,
  });
  const ordersOnSnapshot = useOnSnapshot({
    getFunc: getAllOrders,
    addFunc: addNewOrder,
    modifyFunc: getModifiedOrder,
    removeFunc: getRemovedOrder,
  });
  const locationsOnSnapshot = useOnSnapshot({
    getFunc: getLocations,
    addFunc: addLocation,
    modifyFunc: modifyLocation,
    removeFunc: removeLocation,
  });
  const excludedTimesOnSnapshot = useOnSnapshot({
    type: "object",
    getFunc: (result) =>
      getExcludedTimes(
        Object.entries(result).reduce(
          (obj, [key, value]) => ({
            ...obj,
            [key]: convertFirestoreDates(value),
          }),
          {}
        )
      ),
    addFunc: (data, doc) =>
      addExcludedTimes(doc.id, convertFirestoreDates(data)),
    modifyFunc: (data, doc) =>
      modifyExcludedTimes(doc.id, convertFirestoreDates(data)),
  });

  function convertFirestoreDates(dates) {
    return Object.values(dates).map((date) => date.toDate());
  }

  function dateOnSnapshot(data) {
    dispatch(getDate(data));
  }

  function timeOnSnapshot(data) {
    dispatch(getTime(data));
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
      <Router>
        <Switch>
          <Route path="/admin" component={Admin} />
          <Route path="/" component={MainWebsite} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
