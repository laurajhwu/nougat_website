import React, { useCallback } from "react";
import pageSplitter from "../../../utils/pageSplitter";
import AddToCart from "../../../Components/AddToCart";
import { Link } from "react-router-dom";
import propTypes from "prop-types";

import IconButton from "@material-ui/core/IconButton";
import {
  Products,
  Product,
  Img,
  Name,
  Price,
  ProductInfo,
  AddToCartIcon,
  iconBtnStyle,
} from "./styles";

export default function DisplayProducts(props) {
  const {
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
  } = props;
  const qty = 1;
  const productImageRef = useCallback(
    (node) => {
      if (node) {
        imageRef.current = node;
        setAddEvent(false);
      }
    },
    [addEvent]
  );
  const addToCartProps = {
    qty,
    member,
    setIsClicked,
    isClickedRef,
    showCart,
    setShowCart,
    setAddEvent,
  };

  return (
    <Products cellHeight={"auto"} cols={cols} spacing={20} ref={productsRef}>
      {pageSplitter(allProducts, 12)[page - 1].map((product) => (
        <Product id={product.id} key={product.id}>
          <Link
            to={`/product?id=${product.id}`}
            style={{ textDecoration: "none" }}
          >
            <Img
              src={product.image}
              ref={
                addEvent && addEvent === product.id
                  ? productImageRef
                  : undefined
              }
              helperImage={true}
            />
            <Img src={product.image} />
          </Link>
          <ProductInfo
            title={
              <Link
                to={`/product?id=${product.id}`}
                style={{ textDecoration: "none", color: "#fff" }}
              >
                <Name>{product.name}</Name>
              </Link>
            }
            subtitle={<Price>{`$${product.price} / ${product.unit}`}</Price>}
            actionIcon={
              <IconButton
                style={iconBtnStyle(vw)}
                disabled={product.stock === 0}
              >
                <AddToCartIcon>
                  <AddToCart
                    {...addToCartProps}
                    productId={product.id}
                    // qty={qty}
                    // member={member}
                    soldOut={product.stock === 0}
                    // setAddEvent={setAddEvent}
                    // setIsClicked={setIsClicked}
                    // isClickedRef={isClickedRef}
                    // showCart={showCart}
                    // setShowCart={setShowCart}
                  />
                </AddToCartIcon>
              </IconButton>
            }
          />
        </Product>
      ))}
    </Products>
  );
}

DisplayProducts.propTypes = {
  imageRef: propTypes.oneOfType([
    propTypes.func,
    propTypes.shape({ current: propTypes.node }),
  ]),
  addEvent: propTypes.bool,
  setAddEvent: propTypes.func,
  productsRef: propTypes.oneOfType([
    propTypes.func,
    propTypes.shape({ current: propTypes.node }),
  ]),
  allProducts: propTypes.array,
  cols: propTypes.number,
  page: propTypes.number,
  member: propTypes.object,
  setIsClicked: propTypes.func,
  isClickedRef: propTypes.oneOfType([
    propTypes.func,
    propTypes.shape({ current: propTypes.bool }),
  ]),
  showCart: propTypes.bool,
  setShowCart: propTypes.func,
  vw: propTypes.number,
};
