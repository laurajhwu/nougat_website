import React, { useState, useRef, useEffect } from "react";
import propTypes from "prop-types";
import gsap from "gsap";
import convertToObj from "../../../utils/arrayToObjectConverter";
import useAddToCartAnimation from "../../../Hooks/useAddToCartAnimation";
import QuantityBtn from "../../../Components/CartItemsQty";
import DeleteIcon from "../../../Components/RemoveFromCart";

import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import {
  Cart,
  Title,
  CartProduct,
  CartName,
  CartPrice,
  Total,
  Delete,
  Quantity,
  deleteStyle,
  quantityBtnStyle,
} from "./styles";

export default function DisplayCart(props) {
  const {
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
  } = props;
  const productsObj = allProducts ? convertToObj(allProducts, "id") : null;
  const [cartLength, setCartLength] = useState();
  const cartRef = useRef();
  const cartItemRef = useAddToCartAnimation(
    addEvent,
    {
      cartRef: cartRef.current,
      productsRef: productsRef.current,
      imageRef: imageRef,
    },
    () => (showCart ? "" : setShowCart(true))
  );
  const cartItems = member ? member.cart_items : null;
  const deleteIconProps = { member, setIsClicked, isClickedRef };

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

  useEffect(() => {
    if (cartRef.current) {
      showCartAnimation();
    }
  }, [showCart, disableCart]);

  return (
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
                    {...deleteIconProps}
                    productId={product.id}
                    styles={deleteStyle(vw)}
                  />
                </Delete>
                <Quantity>
                  <QuantityBtn
                    qty={product.qty}
                    stock={productsObj[product.id].stock}
                    productId={product.id}
                    selectStyle={quantityBtnStyle(vw).select}
                    menuStyle={quantityBtnStyle(vw).menu}
                    containerStyle={quantityBtnStyle(vw).container}
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
  );
}

DisplayCart.propTypes = {
  imageRef: propTypes.oneOfType([
    propTypes.func,
    propTypes.shape({ current: propTypes.node }),
  ]),
  addEvent: propTypes.bool,
  allProducts: propTypes.array,
  member: propTypes.object,
  productsRef: propTypes.oneOfType([
    propTypes.func,
    propTypes.shape({ current: propTypes.node }),
  ]),
  showCart: propTypes.bool,
  setShowCart: propTypes.func,
  isClicked: propTypes.bool,
  setIsClicked: propTypes.func,
  isClickedRef: propTypes.oneOfType([
    propTypes.func,
    propTypes.shape({ current: propTypes.bool }),
  ]),
  vw: propTypes.number,
  disableCart: propTypes.bool,
};
