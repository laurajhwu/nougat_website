import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import useAddToCartAnimation from "../../../Hooks/useAddToCartAnimation";
import AddToCart from "../../../Components/AddToCart";
import QuantityBtn from "../../../Components/CartItemsQty";
import DeleteIcon from "../../../Components/RemoveFromCart";
import Loading from "../../../Components/LoadingPage";
import Pagination from "../../../Components/Pagination";
import BGImage from "../../../images/products-bg3.png";
import convertToObj from "../../../utils/arrayToObjectConverter";
import pageSplitter from "../../../utils/pageSplitter";
import gsap from "gsap";

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
  useStyles,
} from "./styles";

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
  const [page, setPage] = useState(1);
  const [addEvent, setAddEvent] = useState();
  const [showCart, setShowCart] = useState(false);
  const [disableCart, setDisableCart] = useState(false);
  const [vw, setVw] = useState(window.innerWidth);
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
  const cartItemRef = useAddToCartAnimation(
    addEvent,
    {
      cartRef: cartRef.current,
      productsRef: productsRef.current,
      imageRef: imageRef,
    },
    () => (showCart ? "" : setShowCart(true))
  );

  function handleColsRWD() {
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

  function handleShowCart() {
    if (!disableCart) {
      if (cartItems && cartItems.length !== 0) {
        setShowCart(!showCart);
      }
    }
  }

  function showCartAnimation() {
    const titleRef = cartRef.current.children[0];
    const timeline = gsap
      .timeline({
        defaults: { duration: 0.5, ease: "power1.inOut" },
      })
      .set(titleRef, { position: "fixed" })
      .addLabel("start");
    if (showCart && !disableCart) {
      timeline
        .to(cartRef.current, {
          "flex-basis": "25%",
          "min-width": "160px",
          padding: "60px 0px 0 0px",
          height: "500px",
        })
        .to(".cart-items", { x: 0 }, "start")
        .to(titleRef, { right: "auto" }, "start");
    } else {
      timeline
        .to(cartRef.current, {
          "flex-basis": "0%",
          padding: "0px",
          "min-width": " 0px",
          height: "0px",
        })
        .to(".cart-items", { x: 300 }, "start")
        .to(titleRef, { right: disableCart ? "5px" : "0px" }, "start");
    }
  }

  useEffect(() => {
    if (cartRef.current) {
      showCartAnimation();
    }
  }, [showCart, disableCart]);

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
        // eslint-disable-next-line space-before-function-paren
        window.setTimeout(function () {
          setCartLength(cartItems.length);
        }, 2100);
      } else {
        setCartLength(cartItems.length);
      }

      if (cartItems.length === 0 && showCart) {
        setShowCart(false);
      }
    }
  }, [cartItems]);

  if (allProducts.length !== 0 && cols) {
    return (
      <Container url={BGImage}>
        <Products
          cellHeight={"auto"}
          cols={cols}
          spacing={20}
          ref={productsRef}
        >
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
                subtitle={
                  <Price>{`$${product.price} / ${product.unit}`}</Price>
                }
                actionIcon={
                  <IconButton
                    style={{
                      padding: vw <= 740 ? "7px" : "10px",
                      ...(vw <= 740
                        ? {
                            position: "absolute",
                            right: "10px",
                            bottom: "5px",
                          }
                        : {
                            position: "absolute",
                            right: "5px",
                            bottom: "5px",
                          }),
                    }}
                    disabled={product.stock === 0}
                  >
                    <AddToCartIcon>
                      <AddToCart
                        productId={product.id}
                        qty={qty}
                        member={member}
                        soldOut={product.stock === 0}
                        setAddEvent={setAddEvent}
                        setIsClicked={setIsClicked}
                        isClickedRef={isClickedRef}
                        showCart={showCart}
                        setShowCart={setShowCart}
                      />
                    </AddToCartIcon>
                  </IconButton>
                }
              />
            </Product>
          ))}
        </Products>
        <Cart ref={cartRef} showCart={showCart}>
          <Title onClick={handleShowCart}>
            購物車(
            {cartItems
              ? cartLength || cartLength === 0
                ? cartLength
                : cartItems.length
              : 0}
            )
          </Title>
          {cartItems ? (
            <>
              {cartItems.map((product, index) => (
                <CartProduct
                  ref={index === cartItems.length - 1 ? cartItemRef : undefined}
                  opacity={isClicked || isClickedRef.current ? 0 : 1}
                  className="cart-items"
                  key={index}
                >
                  <CardActionArea>
                    <CardContent style={{ paddingBottom: "10px" }}>
                      <CartName>{product.name}</CartName>
                      <CartPrice>單價：${product.price}</CartPrice>
                      <Total>
                        小計：$<span>{product.total}</span>
                      </Total>
                    </CardContent>
                  </CardActionArea>
                  <CardActions
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Delete>
                      <DeleteIcon
                        member={member}
                        productId={product.id}
                        setIsClicked={setIsClicked}
                        styles={{
                          color: "#805e6e",
                          "&:hover": { color: "#820933" },
                          width: vw < 740 ? "24px" : "28px",
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
                          "font-size": vw < 740 ? "16px" : "18px",
                          color: "#805e6e",
                          "font-weight": "bold",
                          width: vw < 740 ? "60px" : "65px",

                          fontFamily: "chalk",
                        }}
                        menuStyle={{
                          "font-size": "16px",
                          color: "#37323e",
                          "max-height": "300px",
                        }}
                        containerStyle={{
                          "font-size": vw < 740 ? "16px" : "18px",
                          color: "#805e6e",
                        }}
                      />
                    </Quantity>
                  </CardActions>
                </CartProduct>
              ))}
            </>
          ) : (
            ""
          )}
        </Cart>
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
