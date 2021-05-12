import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProductsData } from "./redux/actions/products";
import db from "./firebase/firestore";
import MainContent from "./mainWebsite/MainContent";

function App() {
  const dispatch = useDispatch();
  const productsDB = db.collection("product_details");

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
    <>
      <MainContent />
    </>
  );
}

export default App;
