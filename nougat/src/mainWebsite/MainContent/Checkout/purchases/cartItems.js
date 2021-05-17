import styled from "styled-components";
import { Link } from "react-router-dom";
import handleQuantityChange from "../../../../utils/purchaseQty";
import QuantityBtn from "../../../../Components/quantityBtn";

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
  const products = [
    {
      image:
        "https://files.meilleurduchef.com/mdc/photo/recipe/nougat/nougat-1200.jpg",
      name: "綜合堅果",
      qty: 2,
      price: 300,
      id: "SWMaWhi55Pho0Vdcm5El",
      stock: 10,
    },
    {
      image:
        "https://files.meilleurduchef.com/mdc/photo/recipe/nougat/nougat-1200.jpg",
      name: "綜合堅果",
      qty: 2,
      price: 300,
      id: "SWMaWhi55Pho0Vdcm5El",
      stock: 10,
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
          <QuantityBtn
            qty={product.qty}
            handleChange={handleQuantityChange}
            stock={product.stock}
            name={product.id}
          />
        </Product>
      ))}
    </>
  );
}

export default AllProducts;
