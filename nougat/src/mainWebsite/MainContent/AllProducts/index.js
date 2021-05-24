import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import AddToCart from "../../../Components/AddToCart";
import QuantityBtn from "../../../Components/CartItemsQty";
import DeleteIcon from "../../../Components/RemoveFromCart";

const Products = styled.div``;
const Product = styled.div`
  display: flex;
  flex-flow: column nowrap;
`;
const Img = styled.img`
  width: 300px;
`;
const Name = styled.div``;
const Price = styled.div``;
const Cart = styled.div``;
const Title = styled.div``;
const AddToCartIcon = styled.div``;

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

  if (allProducts.length !== 0) {
    return (
      <>
        <Products>
          {allProducts.map((product) => (
            <>
              <AddToCartIcon>
                <AddToCart
                  productId={product.id}
                  qty={qty}
                  member={member}
                  soldOut={product.stock === 0}
                />
              </AddToCartIcon>
              <Link
                to={`/product?id=${product.id}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <Product id={product.id}>
                  <Img src={product.image} />
                  <Name>{product.name}</Name>

                  <Price>{product.price}</Price>
                </Product>
              </Link>
            </>
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
      </>
    );
  } else {
    return <Products>Loading...</Products>;
  }
}

export default AllProducts;
