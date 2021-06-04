import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { setMinutes, setHours } from "date-fns";
import Api from "../../../utils/Api";
import CartItems from "./Purchases/CartItems";
import Map from "./Delivery/Map";
import Locations from "./Delivery/RenderLocations";
import getGeoInfo from "./Delivery/GetGeoInfo";
import PickDate from "./Time/Calendar";
import uuid from "react-uuid";
import RememberMe from "../../../Components/RememberMe";
import updateProductStock from "../../../utils/updateProductStock";
import addDays from "../../../utils/addDays";
import Loading from "../../../Components/LoadingPage";
import BGImage from "../../../images/checkout-bg2.png";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  Container,
  Products,
  Total,
  Delivery,
  Label,
  Select,
  Option,
  Calendar,
  PersonalInfo,
  Info,
  Input,
  Payment,
  CheckoutBtn,
  Design1,
} from "./styles";

let isClicked = false;
const id = uuid();

gsap.registerPlugin(ScrollTrigger);

function CheckOut() {
  const history = useHistory();
  const member = useSelector((state) => state.member);
  const dateSettings = useSelector((state) => state.dateTime).date;
  const timeSettings = useSelector((state) => state.dateTime).time;
  const cartItems = member ? member.cart_items : null;
  const allLocations = useSelector((state) => state.locations).filter(
    (location) => location.active
  );
  const allProducts = useSelector((state) => state.products);
  const [delivery, setDelivery] = useState("select");
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState();
  const [payment, setPayment] = useState("cash");
  const initTime = timeSettings ? timeSettings.start_time.split(":") : null;
  const [date, setDate] = useState(
    dateSettings
      ? setHours(
          setMinutes(addDays(dateSettings.buffer), +initTime[1]),
          +initTime[0]
        )
      : null
  );
  const [order, setOrder] = useState({});
  const [personalInfo, setPersonalInfo] = useState({});
  const [remember, setRemember] = useState();

  const design1Ref = useCallback((ref) => {
    if (ref) {
      design1Animation(ref);
    }
  }, []);

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
      });
    }
  }

  function handleCheckout() {
    if (cartItems.length !== 0) {
      const { city, district, address } = selectedLocation;
      if (!isClicked) {
        setOrder({
          order_info: {
            delivery,
            delivery_address: selectedLocation ? city + district + address : "",
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

  function design1Animation(ref) {
    //   {
    //   scrollTrigger: {
    //     trigger: design1Ref.current,
    //     start: "top top",
    //     toggleActions: "restart pause resume pause",
    //   },
    // }
    gsap.timeline().from(ref, {
      y: -600,
      opacity: 0,
      duration: 1.5,
      ease: "power1.in",
    });
    // .to(totalRef.current, {
    //   opacity: 1,
    //   duration: 0.5,
    //   ease: "power1.inOut",
    // });
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
    if (member) {
      setDelivery(member.order_info.delivery || "select");
      setPayment(member.order_info.payment || "cash");
      setRemember({
        order_info: {
          delivery: member.order_info.delivery || "",
          payment: member.order_info.payment || "",
        },
      });
      setPersonalInfo({
        name: member.name || "",
        line_id: member.line_id || "",
      });
    } else {
      history.push("/member");
    }
  }, [member]);

  if (member && locations.length !== 0) {
    return (
      <Container url={BGImage}>
        <Design1 ref={design1Ref}>
          <div></div>
        </Design1>
        <Products>
          <CartItems member={member} />
          <Total>
            <div>總計：</div>
            <div>$ {getOrderTotal()}</div>
          </Total>
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
          <PickDate date={date} setDate={setDate} />
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
      </Container>
    );
  } else {
    return <Loading />;
  }
}
export default CheckOut;
