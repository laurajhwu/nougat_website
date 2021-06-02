import React, { useState } from "react";
import styled from "styled-components";
import qtyOptions from "../../../utils/qtyOptions";
import AddToCart from "../../../Components/AddToCart";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "../../../Components/LoadingPage";

const Product = styled.div`
  display: flex;
`;
const Img = styled.img`
  width: 300px;
`;
const Info = styled.div``;
const Name = styled.div``;
const Price = styled.div``;
const Description = styled.p`
  white-space: pre-wrap;
`;

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

const QuantityBar = styled.div``;
const Select = styled.select``;
const Option = styled.option``;

const AddToCartIcon = styled.div``;

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function AllProducts() {
  const allProducts = useSelector((state) => state.products);
  const member = useSelector((state) => state.member);
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
            {product.stock === 0 ? (
              <QuantityBar>售完</QuantityBar>
            ) : (
              <QuantityBar>
                <Select onChange={handleChange}>
                  {qtyOptions(product.stock).map((option) =>
                    option === qty.toFixed(1) ? (
                      <Option value={option} selected>
                        {option}
                      </Option>
                    ) : (
                      <Option value={option}>{option}</Option>
                    )
                  )}
                </Select>
                {product.unit}
              </QuantityBar>
            )}
          </Quantity>
          <AddToCartIcon>
            <AddToCart
              productId={product.id}
              qty={qty}
              member={member}
              soldOut={product.stock === 0}
            />
          </AddToCartIcon>
        </Info>
      </Product>
    );
  } else {
    return <Loading />;
  }
}

export default AllProducts;
