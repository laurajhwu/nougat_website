import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import useAddToCartAnimation from "../../../Hooks/useAddToCartAnimation";
import AddToCart from "../../../Components/AddToCart";
import QuantityBtn from "../../../Components/CartItemsQty";
import DeleteIcon from "../../../Components/RemoveFromCart";
import Loading from "../../../Components/LoadingPage";
import BGImage from "../../../images/products-bg3.png";

import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import {
  Container,
  Products,
  Product,
  Img,
  Name,
  Price,
  ProductInfo,
  AddToCartIcon,
  Cart,
  Title,
  CartProduct,
  CartName,
  CartPrice,
  Total,
  Delete,
  Quantity,
} from "./styles";

function AllProducts() {
  const allProducts = useSelector((state) => state.products).sort(
    (first, last) => first.display_order - last.display_order
  );
  const member = useSelector((state) => state.member);
  const qty = 1;
  const cartItems = member ? member.cart_items : null;
  const [cartLength, setCartLength] = useState();
  const [isClicked, setIsClicked] = useState(false);
  const isClickedRef = useRef(false);
  const [cols, setCols] = useState();
  const [addEvent, setAddEvent] = useState();
  const cartRef = useRef();
  const imageRef = useRef();
  const productImageRef = useCallback(
    (node) => {
      if (node) {
        imageRef.current = node;
        setAddEvent(false);
      }
    },
    [addEvent]
  );
  const cartItemRef = useAddToCartAnimation(addEvent, {
    cartRef: cartRef.current,
    imageRef: imageRef,
  });

  function handleColsRWD() {
    if (window.innerWidth > 1200) {
      setCols(3);
    } else if (window.innerWidth > 780) {
      setCols(2);
    } else {
      setCols(1);
    }
  }

  useEffect(() => {
    window.addEventListener("resize", handleColsRWD);
    handleColsRWD();

    return () => {
      window.removeEventListener("resize", handleColsRWD);
    };
  }, []);

  useEffect(() => {
    if (cartItems) {
      if (cartItems.length > cartLength) {
        window.setTimeout(function () {
          setCartLength(cartItems.length);
        }, 2000);
      } else {
        setCartLength(cartItems.length);
      }
    }
  }, [cartItems]);

  if (allProducts.length !== 0 && cols) {
    return (
      <Container url={BGImage}>
        <Products cellHeight={"auto"} cols={cols} spacing={20}>
          {allProducts.map((product) => (
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
                subtitle={
                  <Price>{`$${product.price} / ${product.unit}`}</Price>
                }
                actionIcon={
                  <IconButton>
                    <AddToCartIcon>
                      <AddToCart
                        productId={product.id}
                        qty={qty}
                        member={member}
                        soldOut={product.stock === 0}
                        setAddEvent={setAddEvent}
                        setIsClicked={setIsClicked}
                        isClickedRef={isClickedRef}
                      />
                    </AddToCartIcon>
                  </IconButton>
                }
              />
            </Product>
          ))}
        </Products>
        <Cart ref={cartRef}>
          {cartItems ? (
            <>
              <Title>
                購物車(
                {cartLength || cartLength === 0 ? cartLength : cartItems.length}
                )
              </Title>
              {cartItems.map((product, index) => (
                <CartProduct
                  ref={index === cartItems.length - 1 ? cartItemRef : undefined}
                  opacity={isClicked || isClickedRef.current ? 0 : 1}
                >
                  <CardActionArea>
                    {/* <CartImg src={product.image} /> */}
                    <CardContent>
                      <CartName>{product.name}</CartName>
                      <CartPrice>單價：${product.price}</CartPrice>
                      <Total>
                        小計：$<span>{product.total}</span>
                      </Total>
                    </CardContent>
                  </CardActionArea>
                  <CardActions
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <Delete>
                      <DeleteIcon
                        member={member}
                        productId={product.id}
                        setIsClicked={setIsClicked}
                        styles={{
                          color: "#7e7f9a",
                          "&:hover": { color: "#820933" },
                          width: "28px",
                        }}
                        isClickedRef={isClickedRef}
                      />
                    </Delete>
                    <Quantity>
                      <QuantityBtn
                        qty={product.qty}
                        stock={product.stock}
                        productId={product.id}
                        selectStyle={{
                          "font-size": "18px",
                          color: "#474973",
                          "font-weight": "bold",
                        }}
                        menuStyle={{
                          "font-size": "16px",
                          color: "#37323e",
                          "max-height": "300px",
                        }}
                        containerStyle={{
                          "font-size": "18px",
                          color: "#474973",
                        }}
                      />
                    </Quantity>
                  </CardActions>
                </CartProduct>
              ))}
            </>
          ) : (
            <Title>購物車({0})</Title>
          )}
        </Cart>
      </Container>
    );
  } else {
    return <Loading />;
  }
}

export default AllProducts;
