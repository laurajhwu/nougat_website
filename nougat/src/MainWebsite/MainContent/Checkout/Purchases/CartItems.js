import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import convertToObj from "../../../../utils/arrayToObjectConverter";
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
  const cartItems = member.cart_items;
  const products = useSelector((state) => state.products);

  const styles = {
    selectStyle: {
      "font-size": "17px",
      color: "#CC7B82",
      width: "65px",
      fontFamily: "chalk",
    },
    containerStyle: {
      "font-size": "17px",
      color: "#CC7B82",
      fontFamily: "chalk",
    },
    menuStyle: {
      fontFamily: "chalk",
    },
  };

  if (products.length !== 0) {
    const productsObj = convertToObj(products, "id");
    return (
      <Container>
        {cartItems.length === 0 ? (
          <Product>
            <EmptyCart>
              <img src={UnhappySnail} alt="unhappy snail" />
              <div> 您的購物車尚無商品</div>
            </EmptyCart>
          </Product>
        ) : (
          cartItems.map((product) => (
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
                  stock={productsObj[product.id].stock}
                  productId={product.id}
                  containerStyle={styles.containerStyle}
                  selectStyle={styles.selectStyle}
                  menuStyle={styles.menuStyle}
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
