import React, { useState } from "react";
import qtyOptions from "../../../utils/qtyOptions";
import AddToCart from "../../../Components/AddToCart";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "../../../Components/LoadingPage";
import BGImage from "../../../images/details-bg2.jpg";
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
  const classes = useStyles();

  function handleChange(event) {
    setQty(+event.target.value);
  }

  function addToCartAnimation() {}

  if (product) {
    return (
      <Product url={BGImage}>
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
