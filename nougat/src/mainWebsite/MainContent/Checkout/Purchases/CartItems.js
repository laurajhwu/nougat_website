import React from "react";
import { Link } from "react-router-dom";
import QuantityBtn from "../../../../Components/CartItemsQty";
import DeleteIcon from "../../../../Components/RemoveFromCart";
import UnhappySnail from "../../../../images/snail-unhappy.svg";

import {
  Product,
  Img,
  Name,
  Price,
  Total,
  Delete,
  Container,
  Group,
  EmptyCart,
} from "./styles";

function AllProducts(props) {
  const member = props.member;
  const products = member.cart_items;

  const styles = {
    selectStyle: {
      "font-size": "16px",
      color: "#CC7B82",
      width: " 50px",
    },
    containerStyle: {
      "font-size": "16px",
      color: "#CC7B82",
    },
  };

  if (products) {
    return (
      <Container>
        {products.length === 0 ? (
          <Product>
            <EmptyCart>
              <img src={UnhappySnail} alt="unhappy snail" />
              <div> 您的購物車尚無商品</div>
            </EmptyCart>
          </Product>
        ) : (
          products.map((product) => (
            <Product id={product.id}>
              <Link
                to={`/product?id=${product.id}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <Img src={product.image} />
              </Link>
              <Group>
                <Name>{product.name}</Name>
                <Price>
                  ${product.price} /{product.unit}
                </Price>
                <Total>
                  小計：<span>$ {product.total}</span>
                </Total>
              </Group>
              <Group>
                <QuantityBtn
                  qty={product.qty}
                  stock={product.stock}
                  productId={product.id}
                  containerStyle={styles.containerStyle}
                  selectStyle={styles.selectStyle}
                />
              </Group>
              <Group>
                <Delete>
                  <DeleteIcon member={member} productId={product.id} />
                </Delete>
              </Group>
            </Product>
          ))
        )}
      </Container>
    );
  } else {
    return <>Loading...</>;
  }
}

export default AllProducts;
