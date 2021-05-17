import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import ch from "date-fns/locale/zh-TW";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { getProductsData } from "./redux/actions/products";
import { getLocations } from "./redux/actions/locations";
import db from "./utils/firebase/firestore";
import MainContent from "./mainWebsite/MainContent";
import Header from "./mainWebsite/Header";
import Api from "./utils/Api";

function App() {
  const dispatch = useDispatch();
  const productsDB = db.collection("product_details");
  const MainWebsite = () => (
    <>
      <Header />
      <MainContent />
    </>
  );

  registerLocale("zh-TW", ch);
  setDefaultLocale("zh-TW");

  useEffect(() => {
    productsDB.get().then((querySnapshot) => {
      let products = [];
      querySnapshot.forEach((product) => {
        products = [...products, product.data()];
      });
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
