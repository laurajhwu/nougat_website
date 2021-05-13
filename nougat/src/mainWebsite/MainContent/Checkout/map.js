import React from "react";
import styled from "styled-components";
import { GoogleMap, withScriptjs, withGoogleMap } from "react-google-maps";

const Container = styled.div`
  height: 30vh;
  width: 40vw;
`;
const API_KEY = "AIzaSyCnYGRBjB_uakn5NsHUEHSyC4W5-PjD6Oo";
const WrappedMap = withScriptjs(withGoogleMap(Map));

function Map() {
  return (
    <GoogleMap
      defaultZoom={15}
      defaultCenter={{ lat: 25.132410388599844, lng: 121.4987463275781 }}
    />
  );
}

function MainMap() {
  return (
    <Container>
      <WrappedMap
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${API_KEY}`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </Container>
  );
}

export default MainMap;
