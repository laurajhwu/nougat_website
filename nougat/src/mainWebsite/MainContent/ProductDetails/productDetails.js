import React, { useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import QuantityBtn from "../../../Components/quantityBtn";

const Product = styled.div`
  display: flex;
`;
const Img = styled.img`
  width: 300px;
`;
const Info = styled.div``;
const Name = styled.div``;
const Price = styled.div``;
const Description = styled.p``;

const Label = styled.label`
  font-size: 20px;
  letter-spacing: 4px;
  line-height: 24px;
  width: 93px;
`;

const Quantity = styled.div`
  margin-top: 26px;
  display: flex;
  height: 44px;
  align-items: center;
`;

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function AllProducts() {
  const allProducts = useSelector((state) => state.products);
  const id = useQuery().get("id");
  const product = allProducts.find((product) => product.id === id);
  const [qty, setQty] = useState(1);

  function handleChange(event) {
    setQty(Number(event.target.value));
  }

  if (product) {
    return (
      <Product>
        <Img src={product.image} />
        <Info>
          <Name>{product.name}</Name>
          <Price>{product.price}</Price>
          <Description>{product.description}</Description>
          <Quantity>
            <Label>數量 |</Label>
            <QuantityBtn
              qty={qty}
              handleChange={handleChange}
              stock={product.stock}
              name={product.id}
            />
          </Quantity>
        </Info>
      </Product>
    );
  } else {
    return <Product>Loading...</Product>;
  }
}

export default AllProducts;
