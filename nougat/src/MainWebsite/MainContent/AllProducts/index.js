import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Loading from "../../../Components/LoadingPage";
import Pagination from "../../../Components/Pagination";
import BGImage from "../../../images/products-bg3.png";
import Products from "./Products";
import Cart from "./Cart";

import { Container, useStyles } from "./styles";

function AllProducts() {
  const allProducts = useSelector((state) => state.products).sort(
    (first, last) => first.display_order - last.display_order
  );
  const member = useSelector((state) => state.member);
  const [isClicked, setIsClicked] = useState(false);
  const isClickedRef = useRef(false);
  const [cols, setCols] = useState();
  const [page, setPage] = useState(1);
  const [addEvent, setAddEvent] = useState();
  const [showCart, setShowCart] = useState(false);
  const [disableCart, setDisableCart] = useState(false);
  const [vw, setVw] = useState(window.innerWidth);
  const productsRef = useRef();
  const imageRef = useRef();

  function handleRWD() {
    if (window.innerWidth > 1300) {
      setCols(3);
    } else {
      setCols(2);
    }

    setVw(window.innerWidth);

    if (window.innerWidth <= 620) {
      setDisableCart(true);
    } else {
      setDisableCart(false);
    }
  }

  useEffect(() => {
    window.addEventListener("resize", handleRWD);
    handleRWD();

    return () => {
      window.removeEventListener("resize", handleRWD);
    };
  }, []);

  if (allProducts.length !== 0 && cols) {
    return (
      <Container url={BGImage}>
        <Products
          {...{
            imageRef,
            addEvent,
            setAddEvent,
            productsRef,
            allProducts,
            cols,
            page,
            member,
            setIsClicked,
            isClickedRef,
            showCart,
            setShowCart,
            vw,
          }}
        />

        <Cart
          {...{
            addEvent,
            allProducts,
            member,
            productsRef,
            imageRef,
            showCart,
            setShowCart,
            disableCart,
            isClicked,
            isClickedRef,
            setIsClicked,
            vw,
          }}
        />
        <Pagination
          page={page}
          setPage={setPage}
          array={allProducts}
          itemsPerPage={12}
          useStyles={useStyles}
        />
      </Container>
    );
  } else {
    return <Loading />;
  }
}

export default AllProducts;
