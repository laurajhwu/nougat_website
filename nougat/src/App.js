import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProductsData } from "./redux/actions/products";
import db from "./firebase/firestore";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
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

  useEffect(() => {
    let products = [];
    productsDB.get().then((querySnapshot) => {
      querySnapshot.forEach((product) => {
        products = [...products, product.data()];
        console.log(product.data());
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
