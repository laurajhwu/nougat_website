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
import { useConfirmCheckout } from "../../../Hooks/useAlert";
import ErrorComponent from "../../../Components/Error";
import BGImage from "../../../images/checkout-bg2.png";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useError } from "../../../Hooks/useAlert";

import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";

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
  Payment,
  CheckoutBtn,
  Group,
  Design1,
  Design2,
  Design3,
} from "./styles";

let isClicked = false;
const id = uuid();

gsap.registerPlugin(ScrollTrigger);

function CheckOut() {
  const classes = useStyles();
  const history = useHistory();
  const checkoutAlert = useConfirmCheckout("會員頁面可瀏覽您的訂單");
  const member = useSelector((state) => state.member);
  const dateSettings = useSelector((state) => state.dateTime).date;
  const timeSettings = useSelector((state) => state.dateTime).time;
  const cartItems = member ? member.cart_items : null;
  const allLocations = useSelector((state) => state.locations).filter(
    (location) => location.active
  );
  const allProducts = useSelector((state) => state.products);
  const [errorMsg, setErrorMsg] = useState();
  const [delivery, setDelivery] = useState();
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState();
  const [payment, setPayment] = useState();
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
  const errorAlert = useError(errorMsg, () => setErrorMsg(null));
  const timeline = gsap.timeline({
    repeat: -1,
    yoyo: true,
    defaults: { ease: "power1.inOut" },
  });

  const btnRef = useCallback(
    (ref) => {
      if (ref) {
        timeline
          .to(ref, { scale: 0.9, opacity: 0.8, duration: 1 })
          .to(ref, { scale: 1, opacity: 1, duration: 1 });
      }
    },
    [member]
  );

  const design1Ref = useCallback(
    (ref) => {
      if (ref) {
        design1Animation(ref);
      }
    },
    [member]
  );

  const design2Ref = useCallback(
    (ref) => {
      if (ref) {
        design2Animation(ref);
      }
    },
    [member]
  );

  const design3Ref = useCallback(
    (ref) => {
      if (ref) {
        design3Animation(ref);
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
    return !order.order_info.delivery_address ||
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
      if (!isClicked) {
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
        isClicked = true;
      }
    } else {
      setErrorMsg("購物車沒有商品唷！");
    }
  }

  function design1Animation(ref) {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: ref,
          start: "top top",
          toggleActions: "restart reset resume restart",
        },
      })
      .from(ref, {
        opacity: 0,
        duration: 1,
        ease: "power1.in",
      });
  }

  function design2Animation(ref) {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: ref,
          start: "top 80%",
          end: "+=200",
          scrub: 0.5,
        },
      })
      .from(ref, { x: -500, opacity: 0, duration: 1.5, ease: "power1.in" });
  }

  function design3Animation(ref) {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: ref,
          start: "bottom 80%",
          end: "+=300",
          scrub: 0.5,
        },
      })
      .from(ref, {
        y: -500,
        x: 700,
        opacity: 0,
        duration: 2,
        ease: "power1.in",
      });
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

  useEffect(() => {
    if (errorMsg) {
      errorAlert(errorMsg);
    }
  }, [errorMsg]);

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
          ).then(() => {
            checkoutAlert();
          });
        }
      } else {
        setErrorMsg("必填項目中有誤！");
        isClicked = false;
      }
    }
  }, [order]);

  useEffect(() => {
    if (member) {
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
        <Label id="cart-label"> 購物車 ({cartItems.length})</Label>
        <Products>
          <CartItems member={member} />
          <Total>
            <div>總計：</div>
            <div>$ {getOrderTotal()}</div>
          </Total>
        </Products>
        <Design2 vw={vWidth} ref={design2Ref}>
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
              {ErrorComponent(
                order.order_info && !order.order_info.delivery_address
              )}
              <Label>取貨方式* :</Label>
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
        <Group>
          <div>
            <Calendar>
              <Label>取貨時間* :</Label>
              <PickDate date={date} setDate={setDate} />
            </Calendar>
            <Payment>
              <Label> 付款方式* :</Label>
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
                <FormHelperText className={classes.label}></FormHelperText>
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
            <PersonalInfo>
              <Info>
                {ErrorComponent(
                  order.personal_info && !order.personal_info.name
                )}
                <Label>姓名* :</Label>
                <TextField
                  name="name"
                  type="text"
                  defaultValue={personalInfo.name}
                  onChange={personalInfoOnChange}
                  className={classes.input}
                />
                <div></div>
              </Info>
              <Info>
                {ErrorComponent(
                  order.personal_info && !order.personal_info.line_id
                )}
                <Label>Line ID* :</Label>
                <TextField
                  name="line_id"
                  defaultValue={personalInfo.line_id}
                  type="text"
                  onChange={personalInfoOnChange}
                  className={classes.input}
                />
                <RememberMe
                  prop="line-pay"
                  handleRememberData={() =>
                    handleRememberMe("line_id", personalInfo.line_id)
                  }
                />
              </Info>
              <Info>
                <Label>備註 :</Label>
                <TextField
                  name="notes"
                  type="text"
                  onChange={personalInfoOnChange}
                  className={classes.input}
                />
              </Info>
            </PersonalInfo>
          </div>
          <CheckoutBtn
            onClick={handleCheckout}
            ref={btnRef}
            onMouseEnter={() => {
              timeline.paused(true);
            }}
            onMouseLeave={() => {
              timeline.paused(false);
            }}
          >
            結帳
          </CheckoutBtn>
          <Design3 vw={vWidth} ref={design3Ref} />
        </Group>
      </Container>
    );
  } else {
    return <Loading />;
  }
}
export default CheckOut;
