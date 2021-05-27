export const getLocations = (locations) => ({
  type: "GET_LOCATIONS",
  payload: locations,
});

export const modifyLocation = (location) => ({
  type: "MODIFY_LOCATION",
  payload: location,
});

export const addLocation = (location) => ({
  type: "ADD_LOCATION",
  payload: location,
});

export const removeLocation = (location) => ({
  type: "REMOVE_LOCATION",
  payload: location,
});
