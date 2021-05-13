import styled from "styled-components";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import CartItems from "./cartItems";
import Map from "./map";

const Products = styled.div``;
const Delivery = styled.div``;
const Select = styled.select``;
const Option = styled.option``;

function CheckOut() {
  const allProducts = useSelector((state) => state.products);

  const [delivery, setDelivery] = useState("store");

  function deliveryOptionChange(event) {
    setDelivery(event.target.value);
  }

  return (
    <div>
      <Products>
        <CartItems />
      </Products>
      <Delivery>
        <Select onChange={deliveryOptionChange}>
          <Option value="store">超商取貨</Option>
          <Option value="face-to-face">北投區面交</Option>
        </Select>
        {delivery === "store" ? "" : <Map />}
      </Delivery>
    </div>
  );
}

export default CheckOut;
