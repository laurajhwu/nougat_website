import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import useAddToCartAnimation from "../../../Hooks/useAddToCartAnimation";
import AddToCart from "../../../Components/AddToCart";
import QuantityBtn from "../../../Components/CartItemsQty";
import DeleteIcon from "../../../Components/RemoveFromCart";
import Loading from "../../../Components/LoadingPage";
import BGImage from "../../../images/products-bg3.png";
import convertToObj from "../../../utils/arrayToObjectConverter";

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
import gsap from "gsap";

function AllProducts() {
  const allProducts = useSelector((state) => state.products).sort(
    (first, last) => first.display_order - last.display_order
  );
  const productsObj = allProducts ? convertToObj(allProducts, "id") : null;
  const member = useSelector((state) => state.member);
  const qty = 1;
  const cartItems = member ? member.cart_items : null;
  const [cartLength, setCartLength] = useState();
  const [isClicked, setIsClicked] = useState(false);
  const isClickedRef = useRef(false);
  const [cols, setCols] = useState();
  const [addEvent, setAddEvent] = useState();
  const [showCart, setShowCart] = useState(false);
  const cartRef = useRef();
  const productsRef = useRef();
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
    productsRef: productsRef.current,
    imageRef: imageRef,
  });

  function handleColsRWD() {
    if (window.innerWidth > 1300) {
      setCols(3);
    } else if (window.innerWidth > 780) {
      setCols(2);
    } else {
      setCols(1);
    }
  }

  function handleShowCart() {
    if (showCart === null) {
      setShowCart(true);
    } else {
      setShowCart(!showCart);
    }
  }

  function showCartAnimation() {
    const timeline = gsap
      .timeline()
      .set(cartRef.current.children[0], { position: "fixed" })
      .addLabel("start");
    if (showCart) {
      timeline
        .to(cartRef.current, { display: "block", duration: 0.5 })
        .from(cartRef.current, { x: 300, duration: 0.5 }, "start")
        .to(".helper", { display: "none", duration: 0.1 }, "start");
    } else {
      timeline
        .to(cartRef.current, { display: "none", x: 300, duration: 0.5 })
        .to(cartRef.current, { x: 0, duration: 0.1 })
        .to(".helper", { display: "block", duration: 0.1 }, "start");
    }
  }

  useEffect(() => {
    if (cartRef.current && showCart !== null) {
      showCartAnimation();
    }
  }, [showCart]);

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
        }, 2100);
      } else {
        setCartLength(cartItems.length);
      }
    }
  }, [cartItems]);

  if (allProducts.length !== 0 && cols && cartItems) {
    return (
      <Container url={BGImage}>
        <Products
          cellHeight={"auto"}
          cols={cols}
          spacing={20}
          ref={productsRef}
        >
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
        <Title className="helper" showCart={showCart} onClick={handleShowCart}>
          購物車(
          {cartLength || cartLength === 0 ? cartLength : cartItems.length})
        </Title>
        <Cart ref={cartRef} showCart={showCart}>
          <Title onClick={handleShowCart}>
            購物車(
            {cartLength || cartLength === 0 ? cartLength : cartItems.length})
          </Title>
          {cartItems ? (
            <>
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
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Delete>
                      <DeleteIcon
                        member={member}
                        productId={product.id}
                        setIsClicked={setIsClicked}
                        styles={{
                          color: "#805e6e",
                          "&:hover": { color: "#820933" },
                          width: "28px",
                        }}
                        isClickedRef={isClickedRef}
                      />
                    </Delete>
                    <Quantity>
                      <QuantityBtn
                        qty={product.qty}
                        stock={productsObj[product.id].stock}
                        productId={product.id}
                        selectStyle={{
                          "font-size": "18px",
                          color: "#805e6e",
                          "font-weight": "bold",
                          width: "65px",
                          fontFamily: "chalk",
                        }}
                        menuStyle={{
                          "font-size": "16px",
                          color: "#37323e",
                          "max-height": "300px",
                        }}
                        containerStyle={{
                          "font-size": "18px",
                          color: "#805e6e",
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
