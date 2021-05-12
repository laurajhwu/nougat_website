import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

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

function AllProducts() {
  const allProducts = useSelector((state) => state.products);

  if (allProducts.length !== 0) {
    return (
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
    );
  } else {
    return <Products>Loading...</Products>;
  }
}

export default AllProducts;
