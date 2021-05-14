import styled from "styled-components";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import CartItems from "./purchases/cartItems";
import Map from "./delivery/map";
import Locations from "./delivery/renderLocations";
import getGeoInfo from "./delivery/getGeoInfo";
import PickDate from "./time/calendar";
import Api from "../../../utils/Api";

const Products = styled.div``;
const Delivery = styled.div``;
const Select = styled.select``;
const Option = styled.option``;
const Calendar = styled.div``;

function CheckOut() {
  const [delivery, setDelivery] = useState("select");
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState();
  const [date, setDate] = useState(new Date());

  function deliveryOptionChange(event) {
    setDelivery(event.target.value);
  }

  useEffect(() => {
    Api.getLocations().then((allLocations) => {
      const promises = allLocations.map((location) => getGeoInfo(location));
      Promise.all(promises).then((values) => {
        setLocations(values);
      });
    });
  }, []);

  return (
    <div>
      <Products>
        <CartItems />
      </Products>
      <Delivery>
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
        <PickDate date={date} setDate={setDate} />
      </Calendar>
    </div>
  );
}

export default CheckOut;
