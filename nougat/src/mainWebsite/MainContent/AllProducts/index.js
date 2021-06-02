import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import AddToCart from "../../../Components/AddToCart";
import QuantityBtn from "../../../Components/CartItemsQty";
import DeleteIcon from "../../../Components/RemoveFromCart";
import Loading from "../../../Components/LoadingPage";
import BGImage from "../../../images/products-bg.png";

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
} from "./styles";

const Cart = styled.div``;
const Title = styled.div``;

const CartProduct = styled.div`
  display: flex;
  flex-flow: column nowrap;
`;
const CartImg = styled.img`
  width: 100px;
`;
const CartName = styled.div``;
const CartPrice = styled.div``;
const Quantity = styled.div``;
const Delete = styled.div``;
const Total = styled.div``;

function AllProducts() {
  const allProducts = useSelector((state) => state.products).sort(
    (first, last) => first.display_order - last.display_order
  );
  const member = useSelector((state) => state.member);
  const cartItems = member.cart_items;
  const qty = 1;
  const [cols, setCols] = useState();

  function handleColsRWD() {
    if (window.innerWidth > 1200) {
      setCols(3);
    } else if (window.innerWidth > 600) {
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

  if (allProducts.length !== 0 && cols) {
    return (
      <Container url={BGImage}>
        <Products cellHeight={"auto"} cols={cols}>
          {allProducts.map((product) => (
            <Product id={product.id} key={product.id}>
              <Link
                to={`/product?id=${product.id}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <Img src={product.image} />
              </Link>
              <ProductInfo
                title={<Name>{product.name}</Name>}
                subtitle={<Price>{`$${product.price}`}</Price>}
                actionIcon={
                  <IconButton>
                    <AddToCartIcon>
                      <AddToCart
                        productId={product.id}
                        qty={qty}
                        member={member}
                        soldOut={product.stock === 0}
                      />
                    </AddToCartIcon>
                  </IconButton>
                }
              />
            </Product>
          ))}
        </Products>
        <Cart>
          {cartItems ? (
            <>
              <Title>購物車({cartItems.length})</Title>
              {cartItems.map((product) => (
                <CartProduct>
                  <Delete>
                    <DeleteIcon member={member} productId={product.id} />
                  </Delete>
                  <CartImg src={product.image} />
                  <CartName>{product.name}</CartName>
                  <CartPrice>{product.price}</CartPrice>
                  <Total>
                    小計：<span>{product.total}</span>
                  </Total>
                  <Quantity>
                    <QuantityBtn
                      qty={product.qty}
                      stock={product.stock}
                      productId={product.id}
                    />
                  </Quantity>
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
