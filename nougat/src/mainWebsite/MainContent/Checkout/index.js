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

import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import {
  useStyles,
  Container,
  Products,
  Total,
  Delivery,
  Label,
  Options,
  Option,
  Calendar,
  PersonalInfo,
  Info,
  Input,
  Payment,
  CheckoutBtn,
  Design1,
  Design2,
} from "./styles";

let isClicked = false;
const id = uuid();

gsap.registerPlugin(ScrollTrigger);

function CheckOut() {
  const classes = useStyles();
  const history = useHistory();
  const member = useSelector((state) => state.member);
  const dateSettings = useSelector((state) => state.dateTime).date;
  const timeSettings = useSelector((state) => state.dateTime).time;
  const cartItems = member ? member.cart_items : null;
  const allLocations = useSelector((state) => state.locations).filter(
    (location) => location.active
  );
  const allProducts = useSelector((state) => state.products);
  const [delivery, setDelivery] = useState("face-to-face");
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
  const [vWidth, setVWidth] = useState();
  const [design1Ref, setDesign1Ref] = useState();
  const getDesign1Ref = useCallback(
    (ref) => {
      if (ref) {
        design1Animation(ref);
      }
    },
    [member]
  );

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
    gsap
      .timeline({
        scrollTrigger: {
          trigger: ref,
          start: "top top",
          toggleActions: "restart pause resume pause",
        },
      })
      .from(ref, {
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

  function handleWindowSizeChange() {
    setVWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    handleWindowSizeChange();

    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  // useEffect(() => {
  //   if (design1Ref) {
  //     design1Animation(design1Ref);
  //   }
  // }, [design1Ref]);

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
        <Design1 ref={getDesign1Ref}>
          <div></div>
        </Design1>
        <Products>
          <CartItems member={member} />
          <Total>
            <div>總計：</div>
            <div>$ {getOrderTotal()}</div>
          </Total>
        </Products>
        <Design2 vw={vWidth}>
          <div />
        </Design2>
        <Delivery
          notFilled={
            order.order_info &&
            (order.order_info.delivery === "select" ||
              !order.order_info.delivery_address)
          }
        >
          <div>
            <div>
              <FormControl className={classes.formControl}>
                <Options
                  onChange={deliveryOptionChange}
                  value={delivery}
                  className={classes.select}
                  inputProps={{
                    classes: {
                      icon: classes.icon,
                    },
                  }}
                >
                  <Option value="face-to-face" className={classes.option}>
                    面交
                  </Option>
                </Options>
                <FormHelperText className={classes.label}>
                  取貨方式 *
                </FormHelperText>
              </FormControl>
              <RememberMe
                prop="delivery"
                handleRememberData={() =>
                  handleRememberMe("order_info", {
                    ...remember.order_info,
                    delivery,
                  })
                }
                style={{
                  color: "#584573",
                }}
              />
            </div>
            <Locations
              locations={locations}
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
            />
          </div>
          <div>
            <Map
              locations={locations}
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
            />
          </div>
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
              prop="line-pay"
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
          <FormControl className={classes.formControl}>
            <Options
              onChange={paymentOptionChange}
              value={payment}
              className={classes.select}
              inputProps={{
                classes: {
                  icon: classes.icon,
                },
              }}
            >
              <Option value="cash" className={classes.option}>
                面交現金
              </Option>
              <Option value="line-pay" className={classes.option}>
                Line Pay
              </Option>
            </Options>
            <FormHelperText className={classes.label}>
              付款方式 *
            </FormHelperText>
          </FormControl>
          <RememberMe
            prop="payment"
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
