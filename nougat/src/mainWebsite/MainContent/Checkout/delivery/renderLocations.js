import React from "react";
import styled from "styled-components";

const Locations = styled.ul``;
const Location = styled.li`
  color: ${(props) => (props.selected ? "red" : "black")};
`;

function RenderLocations(props) {
  return (
    <Locations>
      {props.locations.map((location) => {
        return (
          <Location
            onClick={() => {
              props.setSelectedLocation(location);
            }}
            selected={
              props.selectedLocation &&
              location.place_id === props.selectedLocation.place_id
            }
          >
            {location.formatted_address}
          </Location>
        );
      })}
    </Locations>
  );
}

export default RenderLocations;
