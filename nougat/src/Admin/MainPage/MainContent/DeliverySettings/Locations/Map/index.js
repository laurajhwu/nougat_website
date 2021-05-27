import React, { useState } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

import { Container } from "./styles";

export default function Map(props) {
  const [zoom, setZoom] = useState(12);
  const { lat, lng } = props.coordinates;

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
    setZoom(16);
  }, []);

  return (
    <GoogleMap
      mapContainerStyle={{
        width: "50%",
        height: "40vh",
        "margin-top": "40px",
        "max-height": "500px",
      }}
      zoom={zoom}
      center={{ lat: lat || 25.033, lng: lng || 121.5654 }}
    >
      {lat && lng ? (
        <Marker
          position={{ lat: lat, lng: lng }}
          onLoad={onMapLoad}
          onPositionChanged={() => setZoom(16)}
        />
      ) : (
        ""
      )}
    </GoogleMap>
  );
}
