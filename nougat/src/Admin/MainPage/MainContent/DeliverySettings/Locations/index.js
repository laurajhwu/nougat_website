import React from "react";
import SearchLocations from "./SearchLocations";
import { useLoadScript } from "@react-google-maps/api";

import { Container } from "./styles";

export default function Locations() {
  const API_KEY = process.env.REACT_APP_MAPS_API_KEY;
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: API_KEY,
    libraries: ["places"],
    language: "zh-TW",
    region: "TW",
  });

  return <Container>{isLoaded ? <SearchLocations /> : "Loading..."}</Container>;
}
