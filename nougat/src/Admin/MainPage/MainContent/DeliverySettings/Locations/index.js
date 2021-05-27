import React, { useState } from "react";
import SearchLocations from "./SearchLocations";
import { useLoadScript } from "@react-google-maps/api";
import Map from "./Map";

import { Container } from "./styles";

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
          <SearchLocations
            setCoordinates={setCoordinates}
            coordinates={coordinates}
            add={{ transitionDuration, isIn }}
            API_KEY={API_KEY}
          />
          <Map coordinates={coordinates} />
        </>
      ) : (
        "Loading..."
      )}
    </Container>
  );
}
