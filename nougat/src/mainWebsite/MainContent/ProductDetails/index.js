import React, { useState, useRef, useEffect } from "react";
import qtyOptions from "../../../utils/qtyOptions";
import AddToCart from "../../../Components/AddToCart";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "../../../Components/LoadingPage";
import BGImage from "../../../images/details-bg2.jpg";
import shakeAnimation from "../../../utils/shakeAnimation";
import { gsap } from "gsap";

import {
  Container,
  Product,
  Img,
  Info,
  Name,
  Price,
  Description,
  Quantity,
  Label,
  QuantityBar,
  Options,
  Option,
  AddToCartIcon,
  useStyles,
} from "./styles";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function AllProducts() {
  const allProducts = useSelector((state) => state.products);
  const member = useSelector((state) => state.member);
  const id = useQuery().get("id");
  const product = allProducts.find((product) => product.id === id);
  const [qty, setQty] = useState(1);
  // const [isAdded, setIsAdded] = useState(false);
  const classes = useStyles();
  const imageRef = useRef();
  const tl = gsap.timeline();

  function handleChange(event) {
    setQty(+event.target.value);
  }

  function shakeIcon() {}

  function addToCartAnimation() {
    const imageRect = imageRef.current.getBoundingClientRect();
    const iconRect = document
      .querySelector("#cart-icon")
      .getBoundingClientRect();

    gsap
      .timeline()
      .to(imageRef.current, { duration: 0.5, scale: 0.5, opacity: 0.5 })
      .to(imageRef.current, {
        x: imageRect.right - iconRect.left - iconRect.width / 2,
        y: iconRect.top - imageRect.top - imageRect.height / 2,
        duration: 0.5,
        scale: 0,
        opacity: 0,
      })
      .to("#cart-icon", { scale: 1.3, duration: 0.2 }, "-=0.1")
      .add(shakeAnimation("#cart-icon"))
      .to("#cart-icon", { scale: 1, duration: 0.1 });
  }

  // useEffect(() => {
  //   if (isAdded) tl.add(addToCartAnimation());
  // }, [isAdded]);

  if (product) {
    return (
      <Product url={BGImage}>
        <Img src={product.image} ref={imageRef} helperImage={true} />
        <Img src={product.image} />
        <Info>
          <Name>{product.name}</Name>
          <Description>{product.description}</Description>
          <Price>$ {`${product.price} / ${product.unit}`}</Price>
          <Quantity>
            {product.stock === 0 ? (
              <QuantityBar>售完</QuantityBar>
            ) : (
              <QuantityBar>
                <Options
                  onChange={handleChange}
                  value={qty}
                  autoWidth
                  className={classes.select}
                  inputProps={{
                    classes: {
                      icon: classes.icon,
                    },
                  }}
                >
                  {qtyOptions(product.stock).map((option) => {
                    return (
                      <Option value={+option} className={classes.option}>
                        {option}
                        {product.unit}
                      </Option>
                    );
                  })}
                </Options>
              </QuantityBar>
            )}
          </Quantity>
          <AddToCartIcon>
            <AddToCart
              productId={product.id}
              qty={qty}
              member={member}
              soldOut={product.stock === 0}
              addToCartAnimation={addToCartAnimation}
            />
          </AddToCartIcon>
        </Info>
      </Product>
    );
  } else {
    return <Loading />;
  }
}

export default AllProducts;
