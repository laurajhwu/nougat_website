import React, { useState, useEffect } from "react";
import ErrorComponent from "../../../../Components/Error";
import RememberMe from "../../../../Components/RememberMe";
import Locations from "./RenderLocations";
import getGeoInfo from "./GetGeoInfo";
import Map from "./Map";
import propTypes from "prop-types";

import FormControl from "@material-ui/core/FormControl";
import { Label, Options, Option } from "../styles";
import { Container } from "./styles";

export default function Delivery(props) {
  const {
    order,
    setDelivery,
    delivery,
    classes,
    handleRememberMe,
    remember,
    allLocations,
    selectedLocation,
    setSelectedLocation,
  } = props;

  const [locations, setLocations] = useState([]);

  function deliveryOptionChange(event) {
    setDelivery(event.target.value);
  }

  useEffect(() => {
    const promises = allLocations.map((location) => getGeoInfo(location));
    Promise.all(promises).then((values) => {
      setLocations(values);
    });
  }, [allLocations]);

  return (
    <Container
      notFilled={
        order.order_info &&
        (order.order_info.delivery === "select" ||
          !order.order_info.delivery_address)
      }
    >
      <div>
        <div>
          <ErrorComponent
            isError={order.order_info && !order.order_info.delivery_address}
          />
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
    </Container>
  );
}

Delivery.propTypes = {
  order: propTypes.object,
  setDelivery: propTypes.func,
  delivery: propTypes.string,
  classes: propTypes.object,
  handleRememberMe: propTypes.func,
  remember: propTypes.object,
  allLocations: propTypes.array,
  selectedLocation: propTypes.object,
  setSelectedLocation: propTypes.func,
};
