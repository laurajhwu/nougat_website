import styled from "styled-components";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Api from "../../../utils/Api";
import CartItems from "./Purchases/CartItems";
import Map from "./Delivery/Map";
import Locations from "./Delivery/RenderLocations";
import getGeoInfo from "./Delivery/GetGeoInfo";
import PickDate from "./Time/Calendar";
import uuid from "react-uuid";
import RememberMe from "../../../Components/RememberMe";
import updateProductStock from "../../../utils/updateProductStock";
import { updateMember } from "../../../redux/actions/member";

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
const id = uuid();

function CheckOut() {
  const history = useHistory();
  const member = useSelector((state) => state.member);
  const dateSettings = useSelector((state) => state.dateTime).date;
  const dispatch = useDispatch();
  const cartItems = member.cart_items;
  const allLocations = useSelector((state) => state.locations).filter(
    (location) => location.active
  );
  const allProducts = useSelector((state) => state.products);
  const [delivery, setDelivery] = useState("select");
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState();
  const [payment, setPayment] = useState("cash");
  const [date, setDate] = useState(addDays(dateSettings.buffer));
  const [order, setOrder] = useState({});
  const [personalInfo, setPersonalInfo] = useState({});
  const [remember, setRemember] = useState();

  function addDays(days) {
    const initDate = new Date();
    initDate.setDate(initDate.getDate() + days);
    return initDate;
  }

  function deliveryOptionChange(event) {
    setDelivery(event.target.value);
  }

  function paymentOptionChange(event) {
    setPayment(event.target.value);
  }

  function personalInfoOnChange(event) {
    const target = event.target;
    const prop = target.getAttribute("name");
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

  function handleRememberMe(prop, data) {
    setRemember({ ...remember, [prop]: data });
  }

  function updateRememberedData() {
    if (Object.keys(remember.order_info).length !== 0 || remember.line_id) {
      Object.entries(remember).forEach(([key, value]) => {
        Api.updateMember(member.id, key, value);
        dispatch(updateMember(key, value));
      });
    }
  }

  function handleCheckout() {
    if (cartItems.length !== 0) {
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
            line_id: personalInfo.line_id,
            name: personalInfo.name,
          },
          products: cartItems,
          status: 0,
          timestamp: new Date(),
          total: getOrderTotal(),
          id,
          member_id: member.id,
        });
        isClicked = true;
      }
    } else {
      alert("請選取欲購賣商品！");
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
        updateRememberedData();
        if (payment === "line-pay") {
          window.localStorage.setItem("order", JSON.stringify(order));
          history.push("/cart/line-pay");
        } else {
          Api.postCheckoutOrder(order, member, (order) =>
            updateProductStock(order, allProducts)
          );
        }
      } else {
        alert("請填入紅框資料！");
        isClicked = false;
      }
    }
  }, [order]);

  useEffect(() => {
    if (member.order_info) {
      setDelivery(member.order_info.delivery || "select");
      setPayment(member.order_info.payment || "cash");
      setRemember({
        order_info: {
          delivery: member.order_info.delivery || "",
          payment: member.order_info.payment || "",
        },
      });
    }

    setPersonalInfo({
      name: member.name || "",
      line_id: member.line_id || "",
    });
  }, [member]);

  if (Object.keys(member).length !== 0 && locations.length !== 0) {
    return (
      <div>
        <Products>
          <CartItems member={member} />
        </Products>
        <Delivery
          notFilled={
            order.order_info &&
            (order.order_info.delivery === "select" ||
              !order.order_info.delivery_address)
          }
        >
          <Label>取貨方式*</Label>
          <Select onChange={deliveryOptionChange}>
            <Option
              value="select"
              selected={delivery === "select" ? "selected" : ""}
            >
              請選擇取貨方式
            </Option>
            <Option
              value="face-to-face"
              selected={delivery === "face-to-face" ? "selected" : ""}
            >
              北投區面交
            </Option>
          </Select>
          <RememberMe
            prop={"delivery"}
            handleRememberData={() =>
              handleRememberMe("order_info", {
                ...remember.order_info,
                delivery,
              })
            }
          />
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
          <PickDate
            date={date}
            setDate={setDate}
            dateSettings={dateSettings}
            addDays={addDays}
          />
        </Calendar>
        <PersonalInfo>
          <Info>
            <Label>姓名*</Label>
            <Input
              name="name"
              type="text"
              defaultValue={personalInfo.name}
              onChange={personalInfoOnChange}
              notFilled={order.personal_info && !order.personal_info.name}
            />
          </Info>
          <Info>
            <Label>Line ID*</Label>
            <Input
              name="line_id"
              defaultValue={personalInfo.line_id}
              type="text"
              onChange={personalInfoOnChange}
              notFilled={order.personal_info && !order.personal_info.line_id}
            />
            <RememberMe
              prop={"line-pay"}
              handleRememberData={() =>
                handleRememberMe("line_id", personalInfo.line_id)
              }
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
            <Option
              value="cash"
              selected={payment === "cash" ? "selected" : ""}
            >
              面交現金
            </Option>
            <Option
              value="line-pay"
              selected={payment === "line-pay" ? "selected" : ""}
            >
              Line Pay
            </Option>
          </Select>
          <RememberMe
            prop={"payment"}
            handleRememberData={() =>
              handleRememberMe("order_info", {
                ...remember.order_info,
                payment,
              })
            }
          />
        </Payment>
        <CheckoutBtn onClick={handleCheckout}>結帳</CheckoutBtn>
      </div>
    );
  } else {
    return <>Loading...</>;
  }
}
export default CheckOut;
