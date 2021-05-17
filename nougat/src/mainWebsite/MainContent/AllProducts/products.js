import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import handleQuantityChange from "../../../utils/purchaseQty";
import QuantityBtn from "../../../Components/quantityBtn";

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

function AllProducts() {
  const allProducts = useSelector((state) => state.products);
  const cartItems = [
    {
      image:
        "https://files.meilleurduchef.com/mdc/photo/recipe/nougat/nougat-1200.jpg",
      name: "綜合堅果",
      qty: 2,
      price: 300,
      id: "SWMaWhi55Pho0Vdcm5El",
      total: 600,
      stock: 10,
    },
    {
      image:
        "https://files.meilleurduchef.com/mdc/photo/recipe/nougat/nougat-1200.jpg",
      name: "綜合堅果",
      qty: 2,
      price: 300,
      id: "SWMaWhi55Pho0Vdcm5El",
      total: 600,
      stock: 10,
    },
  ];

  if (allProducts.length !== 0) {
    return (
      <>
        <Products>
          {allProducts.map((product) => (
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
          ))}
        </Products>
        <Cart>
          <Title>購物車({cartItems.length})</Title>
          {cartItems.map((product) => (
            <CartProduct>
              <CartImg src={product.image} />
              <CartName>{product.name}</CartName>
              <CartPrice>{product.price}</CartPrice>
              <Quantity>
                <QuantityBtn
                  qty={product.qty}
                  handleChange={handleQuantityChange}
                  stock={product.stock}
                  name={product.id}
                />
              </Quantity>
            </CartProduct>
          ))}
        </Cart>
      </>
    );
  } else {
    return <Products>Loading...</Products>;
  }
}

export default AllProducts;
