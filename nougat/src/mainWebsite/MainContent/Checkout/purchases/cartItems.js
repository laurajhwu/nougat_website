import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import QuantityBtn from "../../../../Components/cartItemsQty";

const Product = styled.div`
  display: flex;
  flex-flow: row nowrap;
`;
const Img = styled.img`
  width: 150px;
`;
const Name = styled.div``;
const Price = styled.div``;

function AllProducts() {
  const member = useSelector((state) => state.member);
  const products = member.cart_items;
  return (
    <>
      {products.map((product) => (
        <Product id={product.id}>
          <Link
            to={`/product?id=${product.id}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <Img src={product.image} />
          </Link>
          <Name>{product.name}</Name>
          <Price>{product.price}</Price>
          <QuantityBtn
            qty={product.qty}
            stock={product.stock}
            name={product.id}
          />
        </Product>
      ))}
    </>
  );
}

export default AllProducts;
