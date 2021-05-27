import React, { useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

import { TextField, InputAdornment } from "@material-ui/core";
import {
  Container,
  SearchIcon,
  SearchInput,
  SearchLabel,
  Suggestions,
  Suggestion,
} from "./styles";

export default function Locations() {
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null,
  });

  function handleClickSuggestion(suggestion) {}

  async function handleSelect(value) {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    setCoordinates(latLng);
    console.log(
      "🚀 ~ file: SearchLocations.js ~ line 21 ~ handleSelect ~ results",
      value
    );
  }

  return (
    <Container>
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
          return (
            <>
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
    </Container>
  );
}
