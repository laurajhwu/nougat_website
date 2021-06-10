import React, { useState, useRef, useEffect } from "react";
import qtyOptions from "../../../utils/qtyOptions";
import AddToCart from "../../../Components/AddToCart";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../../../Components/LoadingPage";
import BGImage from "../../../images/details-bg2.jpg";
import shakeAnimation from "../../../utils/shakeAnimation";
import { gsap } from "gsap";

import {
  Product,
  Img,
  Info,
  Name,
  Price,
  Description,
  Quantity,
  QuantityBar,
  Options,
  Option,
  AddToCartIcon,
  useStyles,
} from "./styles";
import { setQtyDiff } from "../../../redux/actions/qtyChange";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function ProductDetails() {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.products);
  const member = useSelector((state) => state.member);
  const qtyDiff = useSelector((state) => state.qtyDiff);
  const id = useQuery().get("id");
  const product = allProducts.find((product) => product.id === id);
  const [qty, setQty] = useState(1);

  const classes = useStyles();
  const imageRef = useRef();

  function handleChange(event) {
    setQty(+event.target.value);
  }

  function addToCartAnimation() {
    const imageRect = imageRef.current.getBoundingClientRect();
    const iconRect = document
      .querySelector("#cart-icon")
      .getBoundingClientRect();

    gsap
      .timeline()
      .to(imageRef.current, { duration: 0.5, scale: 0.5, opacity: 0.5 })
      .to(imageRef.current, {
        x: iconRect.left - imageRect.right + imageRect.width / 2,
        y: iconRect.top - imageRect.top - imageRect.height / 2,
        duration: 0.5,
        scale: 0,
        opacity: 0,
      })
      .to("#cart-icon", { scale: 1.3, duration: 0.2 }, "-=0.1")
      .add(shakeAnimation("#cart-icon"))
      .to("#cart-icon", { scale: 1, duration: 0.1 })
      .to(imageRef.current, { display: "none", duration: 0.1 });
  }

  function qtyChangeAnimation() {
    gsap
      .timeline({
        onComplete: () => {
          dispatch(setQtyDiff(false));
        },
      })
      .to("#qty-diff", { duration: 0.1, display: "unset" })
      .to("#qty-diff", { scale: 1.5, duration: 0.5 })
      .to("#qty-diff", {
        y: -30,
        duration: 1,
        opacity: 1,
        scale: 1,
        ease: "power1.out",
      })
      .to("#qty-diff", {
        y: 0,
        duration: 0.1,
        display: "none",
      });
  }

  useEffect(() => {
    if (qtyDiff || qtyDiff === 0) {
      qtyChangeAnimation();
    }
  }, [qtyDiff]);

  if (product) {
    return (
      <Product url={BGImage}>
        <div>
          <Img src={product.image} ref={imageRef} helperImage={true} />
          <Img src={product.image} />
        </div>
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
                  disableUnderline
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

export default ProductDetails;
