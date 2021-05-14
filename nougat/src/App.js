import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import ch from "date-fns/locale/zh-TW";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { getProductsData } from "./redux/actions/products";
import db from "./utils/firebase/firestore";
import MainContent from "./mainWebsite/MainContent";
import Header from "./mainWebsite/Header";

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
    let products = [];
    productsDB.get().then((querySnapshot) => {
      querySnapshot.forEach((product) => {
        products = [...products, product.data()];
      });
      dispatch(getProductsData(products));
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
