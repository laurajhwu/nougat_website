import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
// <<<<<<< Updated upstream
// import { setMinutes, setHours } from "date-fns";
// <<<<<<< HEAD
// =======
// import { setMinutes, setHours } from "date-fns";
import { gsap } from "gsap";
import uuid from "react-uuid";
import CartItems from "./Purchases";
import Delivery from "./Delivery";
import PickDate from "./Time/Calendar";
import Payment from "./Payment";
import PersonalInfo from "./PersonalInfo";
import BGAnimation from "./BGAnimation";
import CheckoutAlert from "./CheckoutAlert";
// >>>>>>> Stashed changes
// import Api from "../../../utils/Api";
// import CartItems from "./Purchases/CartItems";
// import Map from "./Delivery/Map";
// import Locations from "./Delivery/RenderLocations";
// import getGeoInfo from "./Delivery/GetGeoInfo";
// import PickDate from "./Time/Calendar";
// =======
// import { gsap } from "gsap";
// >>>>>>> 91cba0a (refactor checkout page)
// import uuid from "react-uuid";
// import CartItems from "./Purchases";
// import Delivery from "./Delivery";
// import PickDate from "./Time/Calendar";
// import Payment from "./Payment";
// import PersonalInfo from "./PersonalInfo";
// import BGAnimation from "./BGAnimation";
// import CheckoutAlert from "./CheckoutAlert";
import Api from "../../../utils/Api";
import updateProductStock from "../../../utils/updateProductStock";
// import addDays from "../../../utils/addDays";
import Loading from "../../../Components/LoadingPage";
import { useConfirmCheckout, useError } from "../../../Hooks/useAlert";
import useStyleAnimation from "../../../Hooks/useStyleAnimation";
import BGImage from "../../../images/checkout-bg2.png";

import {
  useStyles,
  Container,
  Label,
  Calendar,
  CheckoutBtn,
  Group,
} from "./styles";

const id = uuid();

function CheckOut() {
  const isClicked = useRef(false);
  const classes = useStyles();
  const history = useHistory();
  const member = useSelector((state) => state.member);
  // <<<<<<< Updated upstream
  //   const dateSettings = useSelector((state) => state.dateTime).date;
  //   const timeSettings = useSelector((state) => state.dateTime).time;
  // <<<<<<< HEAD
  //   const cartItems = member ? member.cart_items : null;
  // =======
  // const dateSettings = useSelector((state) => state.dateTime).date;
  // const timeSettings = useSelector((state) => state.dateTime).time;
  // >>>>>>> Stashed changes
  // =======
  // >>>>>>> 91cba0a (refactor checkout page)
  const allLocations = useSelector((state) => state.locations).filter(
    (location) => location.active
  );
  const allProducts = useSelector((state) => state.products);
  const [cartItems, setCartItems] = useState();
  const [errorMsg, setErrorMsg] = useState();
  const [delivery, setDelivery] = useState();
  const [selectedLocation, setSelectedLocation] = useState();
  const [payment, setPayment] = useState();
  // <<<<<<< HEAD
  // <<<<<<< Updated upstream
  //   const initTime = timeSettings ? timeSettings.start_time.split(":") : null;
  // =======
  //   const initTime = timeSettings?.start_time.split(":");
  // >>>>>>> 91cba0a (refactor checkout page)
  //   const [date, setDate] = useState(
  //     dateSettings
  //       ? setHours(
  //           setMinutes(addDays(dateSettings.buffer), +initTime[1]),
  //           +initTime[0]
  //         )
  //       : null
  //   );
  // =======
  // const initTime = timeSettings?.start_time.split(":");
  const [date, setDate] = useState();
  // dateSettings
  //   ? setHours(
  //       setMinutes(addDays(dateSettings.buffer), +initTime[1]),
  //       +initTime[0]
  //     )
  //   : null
  // >>>>>>> Stashed changes
  const [order, setOrder] = useState({});
  const [personalInfo, setPersonalInfo] = useState({});
  const [remember, setRemember] = useState();
  const errorAlert = useError(errorMsg, () => setErrorMsg(null));
  const btnRef = useStyleAnimation(checkoutBtnAnimation);
  const checkoutAlert = useConfirmCheckout((swal) => (
    <CheckoutAlert swal={swal} />
  ));

  function initState() {
    setCartItems(member.cart_items);
    setDelivery(member.order_info.delivery || "face-to-face");
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
  }

  function getOrderTotal() {
    return cartItems.reduce((total, items) => items.total + total, 0);
  }

  function validateCheckoutInfo() {
    return !(
      !order.order_info.delivery_address ||
      !order.personal_info.name ||
      !order.personal_info.line_id
    );
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
      if (!isClicked.current) {
        setOrder({
          order_info: {
            delivery,
            delivery_address: selectedLocation
              ? selectedLocation.city +
                selectedLocation.district +
                selectedLocation.address
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
        isClicked.current = true;
      }
    } else {
      setErrorMsg("購物車沒有商品唷！");
    }
  }

  function submitCheckoutInfo() {
    if (validateCheckoutInfo()) {
      updateRememberedData();
      if (payment === "line-pay") {
        isClicked.current = false;
        window.localStorage.setItem("order", JSON.stringify(order));
        history.push("/cart/line-pay");
      } else {
        isClicked.current = false;
        Api.postCheckoutOrder(order, member, (order) =>
          updateProductStock(order, allProducts)
        ).then(() => {
          checkoutAlert();
        });
      }
    } else {
      setErrorMsg("必填項目中有誤！");
      isClicked.current = false;
    }
  }

  function checkoutBtnAnimation(ref) {
    const timeline = gsap.timeline({
      repeat: -1,
      yoyo: true,
      defaults: { ease: "power1.inOut" },
    });

    timeline
      .to(ref, { scale: 0.9, opacity: 0.8, duration: 1 })
      .to(ref, { scale: 1, opacity: 1, duration: 1 });
  }

  useEffect(() => {
    if (member) {
      initState();
    } else {
      history.push("/member");
    }
  }, [member]);

  useEffect(() => {
    if (errorMsg) {
      errorAlert();
    }
  }, [errorMsg]);

  useEffect(() => {
    if (Object.keys(order).length !== 0) {
      submitCheckoutInfo();
    }
  }, [order]);

  if (member && allLocations.length !== 0 && cartItems) {
    return (
      <Container url={BGImage}>
        <BGAnimation design="design1" />
        <CartItems
          cartItems={cartItems}
          member={member}
          getOrderTotal={getOrderTotal}
        />
        <BGAnimation design="design2" />
        <Delivery
          {...{
            order,
            setDelivery,
            delivery,
            classes,
            handleRememberMe,
            remember,
            allLocations,
            selectedLocation,
            setSelectedLocation,
          }}
        />
        <Group>
          <div>
            <Calendar>
              <Label>取貨時間* :</Label>
              <PickDate date={date} setDate={setDate} />
            </Calendar>
            <Payment
              {...{
                classes,
                setPayment,
                payment,
                handleRememberMe,
                remember,
              }}
            />
            <PersonalInfo
              {...{
                personalInfo,
                setPersonalInfo,
                order,
                classes,
                handleRememberMe,
              }}
            />
          </div>
          <CheckoutBtn onClick={handleCheckout} ref={btnRef}>
            結帳
          </CheckoutBtn>
          <BGAnimation design="design3" />
        </Group>
      </Container>
    );
  } else {
    return <Loading />;
  }
}
export default CheckOut;
