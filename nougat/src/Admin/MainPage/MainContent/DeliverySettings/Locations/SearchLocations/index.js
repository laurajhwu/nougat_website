import React, { Component, useState } from "react";
import { useSelector } from "react-redux";
import Api from "../../../../../../utils/Api";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import Geocode from "react-geocode";

import { InputAdornment, Zoom, Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import {
  SearchContainer,
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

  async function handleSelect(value) {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    setCoordinates(latLng);
  }

  function AddNewLocation() {
    Geocode.fromLatLng(
      coordinates.lat,
      coordinates.lng,
      API_KEY,
      "zh-TW",
      "TW"
    ).then((response) => {
      let city,
        district,
        address = "";

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
              address = component.long_name + "號";
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
        Api.addLocation({ city, district, address }).then(() => {
          setCoordinates({
            ...{
              lat: null,
              lng: null,
            },
          });
          console.log("end");
        });
      }
    });
  }

  return (
    <SearchContainer>
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
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
                  onChange={() => {
                    console.log("hi", address);
                  }}
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
                    disabled={coordinates.lat && coordinates.lng ? false : true}
                    onClick={AddNewLocation}
                  >
                    <AddIcon />
                  </Fab>
                </Zoom>
              </Search>

              <Suggestions>
                {loading ? <div>loading...</div> : null}
                {suggestions.map((suggestion) => {
                  const style = {
                    backgroundColor: suggestion.active ? "#D7CDCC" : "#fff",
                    color: suggestion.active ? "#474973" : "#000",
                  };

                  return (
                    <Suggestion
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
    </SearchContainer>
  );
}
