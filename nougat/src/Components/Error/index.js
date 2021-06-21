import React from "react";
import UseAnimations from "react-useanimations";
import alertCircle from "react-useanimations/lib/alertCircle";
import propTypes from "prop-types";

export default function ErrorComponent(props) {
  const { isError, size } = props;
  return (
    <>
      {isError ? (
        <UseAnimations
          animation={alertCircle}
          strokeColor="#b6174b"
          size={size || 30}
        />
      ) : (
        ""
      )}
    </>
  );
}

ErrorComponent.propTypes = {
  isError: propTypes.bool,
  size: propTypes.number,
};
