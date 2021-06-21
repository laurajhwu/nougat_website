import propTypes from "prop-types";

export default function setPropTypes(props) {
  return Object.entries(props).reduce(
    (obj, [key, type]) => ({ ...obj, [key]: propTypes[type] }),
    {}
  );
}

// func.propTypes =
