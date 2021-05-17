import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { getProductsData } from "./redux/actions/products";
import { getLocations } from "./redux/actions/locations";
import MainContent from "./mainWebsite/MainContent";
import Header from "./mainWebsite/Header";
import Api from "./utils/Api";
import Calendar from "./utils/calendarSettings";

function App() {
  const dispatch = useDispatch();
  console.log(process.env.REACT_APP_MAPS_API_KEY);
  const MainWebsite = () => (
    <>
      <Header />
      <MainContent />
    </>
  );

  Calendar.calendarSettings();

  useEffect(() => {
    Api.getProducts().then((products) => {
      dispatch(getProductsData(products));
    });

    Api.getLocations().then((allLocations) => {
      dispatch(getLocations(allLocations));
    });
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/admin" />
        <Route path="/" component={MainWebsite} />
      </Switch>
    </Router>
  );
}

export default App;
