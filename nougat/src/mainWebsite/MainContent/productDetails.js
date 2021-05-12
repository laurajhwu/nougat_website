import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

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

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function AllProducts() {
  const allProducts = useSelector((state) => state.products);
  const id = useQuery().get("id");
  const product = allProducts.find((product) => product.id === id);
  const qty = 1;
  if (allProducts.length !== 0) {
    return (
      <Product>
        <Img src={product.image} />
        <Info>
          <Name>{product.name}</Name>
          <Price>{product.price}</Price>
          <Description>{product.description}</Description>
          <Quantity>
            <Label>數量 |</Label>
            <QuantityBar>
              <Button>-</Button>
              <QuantityNum>{qty}</QuantityNum>
              <Button>+</Button>
            </QuantityBar>
          </Quantity>
        </Info>
      </Product>
    );
  } else {
    return <Product>Loading...</Product>;
  }
}

export default AllProducts;
