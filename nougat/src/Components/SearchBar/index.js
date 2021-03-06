import React from "react";
import propTypes from "prop-types";

import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import { Clear } from "@styled-icons/material";

export default function SearchBar(props) {
  const { searchValue, setSearchValue } = props;

  function handleSearchInput(event) {
    setSearchValue(event.target.value.trim());
  }

  function handleClearValue() {
    setSearchValue("");
  }

  return (
    <TextField
      id="standard-search"
      label="搜尋"
      type="search"
      value={searchValue}
      onChange={handleSearchInput}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleClearValue}>
              <Clear style={{ width: "15px" }} />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}

SearchBar.propTypes = {
  searchValue: propTypes.string,
  setSearchValue: propTypes.func,
};
