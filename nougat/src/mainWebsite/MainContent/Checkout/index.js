import styled from "styled-components";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Api from "../../../utils/Api";
import CartItems from "./purchases/cartItems";
import Map from "./delivery/map";
import Locations from "./delivery/renderLocations";
import getGeoInfo from "./delivery/getGeoInfo";
import PickDate from "./time/calendar";

const Products = styled.div``;
const Delivery = styled.div`
  border: 1px solid black;
  border-color: ${(props) => (props.notFilled ? "red" : "black")};
`;
const Select = styled.select``;
const Option = styled.option``;
const Calendar = styled.div``;
const PersonalInfo = styled.div``;
const Info = styled.div``;
const Input = styled.input`
  border: 1px solid black;
  border-color: ${(props) => (props.notFilled ? "red" : "black")};
`;
const Label = styled.label``;
const Payment = styled.div``;
const CheckoutBtn = styled.button``;

let isClicked = false;

function CheckOut() {
  const history = useHistory();
  const allLocations = useSelector((state) => state.locations);
  const [delivery, setDelivery] = useState("select");
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState();
  const [payment, setPayment] = useState("cash");
  const [date, setDate] = useState(new Date());
  const [order, setOrder] = useState({});
  const [personalInfo, setPersonalInfo] = useState({});

  // fake data
  const member_id = "CQuJUQzLvvbrlPiDYC9SaWkrcg23";
  const cartItems = [
    {
      image:
        "https://files.meilleurduchef.com/mdc/photo/recipe/nougat/nougat-1200.jpg",
      name: "綜合堅果",
      qty: 2,
      price: 300,
      id: "SWMaWhi55Pho0Vdcm5El",
      total: 600,
    },
    {
      image:
        "https://files.meilleurduchef.com/mdc/photo/recipe/nougat/nougat-1200.jpg",
      name: "綜合堅果",
      qty: 2,
      price: 300,
      id: "SWMaWhi55Pho0Vdcm5El",
      total: 600,
    },
  ];

  function deliveryOptionChange(event) {
    setDelivery(event.target.value);
  }

  function paymentOptionChange(event) {
    setPayment(event.target.value);
  }

  function personalInfoOnChange(event) {
    const target = event.target;
    const prop = target.getAttribute("name");
    console.log(prop);
    setPersonalInfo({
      ...personalInfo,
      [prop]: target.value.trim(),
    });
  }

  function getOrderTotal() {
    return cartItems.reduce((total, items) => items.total + total, 0);
  }

  function validateCheckoutInfo() {
    return order.order_info.delivery === "select" ||
      !order.order_info.delivery_address ||
      !order.personal_info.name ||
      !order.personal_info.line_id
      ? false
      : true;
  }

  function handleCheckout() {
    if (!isClicked) {
      setOrder({
        order_info: {
          delivery,
          delivery_address: selectedLocation
            ? selectedLocation.formatted_address
            : "",
          delivery_time: date,
          notes: personalInfo.notes ? personalInfo.notes : "N/A",
          payment: payment,
        },
        personal_info: {
          member_id,
          line_id: personalInfo.line_id,
          name: personalInfo.name,
        },
        products: cartItems,
        status: 0,
        timestamp: new Date(),
        total: getOrderTotal(),
      });
      isClicked = true;
    }
  }

  useEffect(() => {
    const promises = allLocations.map((location) => getGeoInfo(location));
    Promise.all(promises).then((values) => {
      setLocations(values);
    });
  }, []);

  useEffect(() => {
    if (Object.keys(order).length !== 0) {
      if (validateCheckoutInfo()) {
        if (payment === "line-pay") {
          window.localStorage.setItem("order", JSON.stringify(order));
          history.push("/cart/line-pay");
        } else {
          Api.postCheckoutOrder(order);
        }
      } else {
        alert("請填入紅框資料！");
        isClicked = false;
      }
    }
  }, [order]);

  return (
    <div>
      <Products>
        <CartItems />
      </Products>
      <Delivery
        notFilled={
          order.order_info &&
          order.order_info.delivery === "select" &&
          !order.order_info.delivery_address
        }
      >
        <Label>取貨方式*</Label>
        <Select onChange={deliveryOptionChange}>
          <Option value="select">請選擇取貨方式</Option>
          <Option value="face-to-face">北投區面交</Option>
        </Select>
        {delivery === "select" ? (
          ""
        ) : (
          <>
            <Map
              locations={locations}
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
            />

            <Locations
              locations={locations}
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
            />
          </>
        )}
      </Delivery>
      <Calendar>
        <Label>取貨時間*</Label>
        <PickDate date={date} setDate={setDate} />
      </Calendar>
      <PersonalInfo>
        <Info>
          <Label>姓名*</Label>
          <Input
            name="name"
            type="text"
            onChange={personalInfoOnChange}
            notFilled={order.personal_info && !order.personal_info.name}
          />
        </Info>
        <Info>
          <Label>Line ID*</Label>
          <Input
            name="line_id"
            type="text"
            onChange={personalInfoOnChange}
            notFilled={order.personal_info && !order.personal_info.line_id}
          />
        </Info>
        <Info>
          <Label>備註</Label>
          <Input name="notes" type="text" onChange={personalInfoOnChange} />
        </Info>
      </PersonalInfo>
      <Payment>
        <Label>付款方式*</Label>
        <Select onChange={paymentOptionChange}>
          <Option value="cash">面交現金</Option>
          <Option value="line-pay">Line Pay</Option>
        </Select>
      </Payment>
      <CheckoutBtn onClick={handleCheckout}>結帳</CheckoutBtn>
    </div>
  );
}

export default CheckOut;
