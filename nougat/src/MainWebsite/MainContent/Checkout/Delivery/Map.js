import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

function MainMap(props) {
  const [select, setSelect] = useState();
  const [mapSize, setMapSize] = useState();
  const API_KEY = process.env.REACT_APP_MAPS_API_KEY;
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: API_KEY,
  });
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  function handleWindowSizeChange() {
    if (window.innerWidth > 1280) {
      setMapSize({ width: "500px", height: "400px" });
    } else if (window.innerWidth > 960) {
      setMapSize({ width: "450px", height: "400px" });
    } else if (window.innerWidth > 600) {
      setMapSize({ width: "350px", height: "350px" });
    }
  }

  useEffect(() => {
    setSelect(props.selectedLocation);
  }, [props.selectedLocation]);

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    handleWindowSizeChange();

    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  if (loadError) return "Error Loading Maps";
  if (!isLoaded) return "Loading Maps...";

  return (
    <GoogleMap
      mapContainerStyle={mapSize}
      zoom={12}
      center={{ lat: 25.132410388599844, lng: 121.4987463275781 }}
    >
      {props.locations.map((location) => (
        <Marker
          key={location.place_id}
          position={{ lat: location.lat, lng: location.lng }}
          onClick={() => {
            props.setSelectedLocation(location);
          }}
          onLoad={onMapLoad}
        />
      ))}
      {select ? (
        <InfoWindow
          options={{
            pixelOffset: new window.google.maps.Size(0, -30),
          }}
          position={{
            lat: props.selectedLocation.lat,
            lng: props.selectedLocation.lng,
          }}
          onCloseClick={() => {
            setSelect(null);
          }}
        >
          <div>{props.selectedLocation.description}</div>
        </InfoWindow>
      ) : null}
    </GoogleMap>
  );
}

export default MainMap;
