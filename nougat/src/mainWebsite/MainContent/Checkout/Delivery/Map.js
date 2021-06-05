import React from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

function MainMap(props) {
  const API_KEY = process.env.REACT_APP_MAPS_API_KEY;
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: API_KEY,
  });
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  if (loadError) return "Error Loading Maps";
  if (!isLoaded) return "Loading Maps...";

  return (
    <GoogleMap
      mapContainerStyle={{ width: "500px", height: "400px" }}
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
      {props.selectedLocation ? (
        <InfoWindow
          position={{
            lat: props.selectedLocation.lat,
            lng: props.selectedLocation.lng,
          }}
          onCloseClick={() => {
            props.setSelectedLocation(null);
          }}
        >
          <div>{props.selectedLocation.formatted_address}</div>
        </InfoWindow>
      ) : null}
    </GoogleMap>
  );
}

export default MainMap;
