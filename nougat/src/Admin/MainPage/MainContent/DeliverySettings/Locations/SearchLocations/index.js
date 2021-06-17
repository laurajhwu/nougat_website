import React, { useState } from "react";
import { useSelector } from "react-redux";
import Api from "../../../../../../utils/Api";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import Geocode from "react-geocode";
import propTypes from "prop-types";

import { InputAdornment, Zoom, Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import {
  SearchIcon,
  Search,
  SearchInput,
  SearchLabel,
  Suggestions,
  Suggestion,
} from "./styles";

export default function SearchLocations(props) {
  const locations = useSelector((state) => state.locations).map(
    (location) => location.city + location.district + location.address
  );
  const { transitionDuration, isIn } = props.add;
  const { coordinates, setCoordinates, API_KEY } = props;
  const [address, setAddress] = useState("");
  const [mainText, setMainText] = useState("");

  async function handleSelect(address, placeId, suggestion) {
    if (placeId) {
      const results = await geocodeByAddress(address);
      const latLng = await getLatLng(results[0]);
      setAddress(address);
      setCoordinates(latLng);
      setMainText(suggestion.formattedSuggestion.mainText);
    } else {
      setCoordinates({
        lat: null,
        lng: null,
      });
    }
  }

  function handleError(status, clearSuggestions) {
    setCoordinates({
      lat: null,
      lng: null,
    });
    clearSuggestions();
    throw status;
  }

  function AddNewLocation() {
    Geocode.fromLatLng(
      coordinates.lat,
      coordinates.lng,
      API_KEY,
      "zh-TW",
      "TW"
    ).then((response) => {
      let city;
      let district;
      let address = "";
      const description = mainText;

      response.results[0].address_components.forEach((component) => {
        component.types.forEach((type) => {
          switch (type) {
            case "administrative_area_level_1":
              city = component.long_name;
              break;
            case "administrative_area_level_3":
              district = component.long_name;
              break;
            case "street_number":
              address = component.long_name.includes("號")
                ? component.long_name
                : `${component.long_name}號`;
              break;
            case "route":
              address = component.long_name + address;
              break;
            case "administrative_area_level_4":
              address = component.long_name + address;
              break;
            default:
              break;
          }
        });
      });

      if (
        locations.some((location) => location === city + district + address)
      ) {
        alert(`'${city + district + address}' 已存在！`);
      } else {
        Api.addLocation({
          city,
          district,
          address,
          description,
          active: true,
        }).then(() => {
          setCoordinates({
            lat: null,
            lng: null,
          });
        });
      }
    });
  }

  return (
    <>
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
        onError={handleError}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
          return (
            <>
              <Search>
                <SearchInput
                  id="outlined-uncontrolled"
                  label={<SearchLabel>搜尋地址</SearchLabel>}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                  placeholder="請輸入地址"
                  {...getInputProps()}
                />
                <Zoom
                  in={isIn}
                  timeout={transitionDuration}
                  style={{
                    transitionDelay: `${isIn ? transitionDuration.exit : 0}ms`,
                  }}
                  unmountOnExit
                >
                  <Fab
                    size="small"
                    color="secondary"
                    aria-label="add"
                    disabled={!(coordinates.lat && coordinates.lng && mainText)}
                    onClick={AddNewLocation}
                  >
                    <AddIcon />
                  </Fab>
                </Zoom>
              </Search>

              <Suggestions>
                {loading ? <div>loading...</div> : null}
                {suggestions.map((suggestion, index) => {
                  const style = {
                    backgroundColor: suggestion.active ? "#D7CDCC" : "#fff",
                    color: suggestion.active ? "#474973" : "#000",
                  };

                  return (
                    <Suggestion
                      key={index}
                      {...getSuggestionItemProps(suggestion, { style })}
                    >
                      {suggestion.description}
                    </Suggestion>
                  );
                })}
              </Suggestions>
            </>
          );
        }}
      </PlacesAutocomplete>
    </>
  );
}

SearchLocations.propTypes = {
  add: propTypes.object,
  coordinates: propTypes.object,
  setCoordinates: propTypes.func,
  API_KEY: propTypes.string,
};
