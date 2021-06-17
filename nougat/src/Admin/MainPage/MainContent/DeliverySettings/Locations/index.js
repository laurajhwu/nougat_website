import React, { useState } from "react";
import SearchLocations from "./SearchLocations";
import { useLoadScript } from "@react-google-maps/api";
import Map from "./Map";
import DisplayAllLocations from "./DisplayAll";
import propTypes from "prop-types";

import { Container, SearchContainer, DisplayContainer } from "./styles";

export default function Locations(props) {
  const { transitionDuration, isIn } = props;

  const API_KEY = process.env.REACT_APP_MAPS_API_KEY;
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: API_KEY,
    libraries: ["places"],
    language: "zh-TW",
    region: "TW",
  });
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null,
  });

  return (
    <Container>
      {isLoaded ? (
        <>
          <SearchContainer>
            <SearchLocations
              setCoordinates={setCoordinates}
              coordinates={coordinates}
              add={{ transitionDuration, isIn }}
              API_KEY={API_KEY}
            />
            <Map coordinates={coordinates} />
          </SearchContainer>
          <DisplayContainer>
            <DisplayAllLocations />
          </DisplayContainer>
        </>
      ) : (
        "Loading..."
      )}
    </Container>
  );
}

Locations.propTypes = {
  transitionDuration: propTypes.number,
  isIn: propTypes.bool,
};
