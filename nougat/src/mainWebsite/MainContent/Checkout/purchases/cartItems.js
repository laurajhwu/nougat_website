import styled from "styled-components";
import { Link } from "react-router-dom";
import QuantityBtn from "../../../../Components/CartItemsQty";
import DeleteIcon from "../../../../Components/RemoveFromCart";

const Product = styled.div`
  display: flex;
  flex-flow: row nowrap;
`;
const Img = styled.img`
  width: 150px;
`;
const Name = styled.div``;
const Price = styled.div``;
const Delete = styled.div``;
const Total = styled.div``;

function AllProducts(props) {
  const member = props.member;
  const products = member.cart_items;

  if (products) {
    return (
      <>
        {products.length === 0 ? (
          <Product>您的購物車尚無商品</Product>
        ) : (
          products.map((product) => (
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
                productId={product.id}
              />
              <Total>
                小計：<span>{product.total}</span>
              </Total>
              <Delete>
                <DeleteIcon member={member} productId={product.id} />
              </Delete>
            </Product>
          ))
        )}
      </>
    );
  } else {
    return <>Loading...</>;
  }
}

export default AllProducts;
