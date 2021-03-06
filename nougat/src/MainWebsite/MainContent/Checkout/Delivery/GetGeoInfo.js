import Geocode from "react-geocode";
const API_KEY = "AIzaSyCnYGRBjB_uakn5NsHUEHSyC4W5-PjD6Oo";

async function getGeoInfo(location) {
  Geocode.setLocationType("ROOFTOP");

  const fullAddress = location.city + location.district + location.address;
  const promise = Geocode.fromAddress(fullAddress, API_KEY, "zh-TW", "TW")
    .then((response) => {
      const { lat, lng } = response.results[0].geometry.location;
      // eslint-disable-next-line camelcase
      const { place_id } = response.results[0];
      return {
        ...location,
        lat,
        lng,
        place_id,
      };
    })
    .catch((error) => console.log(error.message));
  return promise;
}
export default getGeoInfo;
