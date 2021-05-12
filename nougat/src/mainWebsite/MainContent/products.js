import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

const Products = styled.div``;
const Product = styled.div``;
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
          <Product id={product.id}>
            <Img src={product.image} />
            <Name>{product.name}</Name>
            <Price>{product.price}</Price>
          </Product>
        ))}
      </Products>
    );
  } else {
    return <Products>Loading...</Products>;
  }
}

export default AllProducts;
