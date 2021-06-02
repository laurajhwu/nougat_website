import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import AddToCart from "../../../Components/AddToCart";
import QuantityBtn from "../../../Components/CartItemsQty";
import DeleteIcon from "../../../Components/RemoveFromCart";
import Loading from "../../../Components/LoadingPage";
// import BGImage from "../../../images/products-bg.png";
import BGImage from "../../../images/products-bg2.png";

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
  CartImg,
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
                style={{ textDecoration: "none" }}
              >
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
                        styles={{
                          color: "#7e7f9a",
                          "&:hover": { color: "#820933" },
                          width: "28px",
                        }}
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
