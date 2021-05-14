import styled from "styled-components";
import { Link } from "react-router-dom";

const Product = styled.div`
  display: flex;
  flex-flow: row nowrap;
`;
const Img = styled.img`
  width: 150px;
`;
const Name = styled.div``;
const Price = styled.div``;

const QuantityBar = styled.div`
  margin: 0;
  padding: 0 10px;
  width: auto;
  flex-grow: 1;

  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 44px;
  border: 1px solid #979797;
  font-size: 20px;
`;

const Button = styled.button`
  border: none;
  background-color: transparent;
  font-size: 20px;
  font-weight: 700;
  padding: 1px 6px;
  outline: none;
  &:hover {
    cursor: pointer;
  }
`;

const QuantityNum = styled.span`
  color: #8b572a;
`;

function AllProducts() {
  const products = [
    {
      image:
        "https://files.meilleurduchef.com/mdc/photo/recipe/nougat/nougat-1200.jpg",
      name: "綜合堅果",
      qty: 2,
      price: 300,
      id: "sdfefwefwefweg",
    },
    {
      image:
        "https://files.meilleurduchef.com/mdc/photo/recipe/nougat/nougat-1200.jpg",
      name: "綜合堅果",
      qty: 2,
      price: 300,
      id: "sdfefwefwefweg",
    },
  ];
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
          <QuantityBar>
            <Button>-</Button>
            <QuantityNum>{product.qty}</QuantityNum>
            <Button>+</Button>
          </QuantityBar>
        </Product>
      ))}
    </>
  );
}

export default AllProducts;
