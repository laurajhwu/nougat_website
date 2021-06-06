import React from "react";
import UseAnimations from "react-useanimations";
import alertCircle from "react-useanimations/lib/alertCircle";

import { Container } from "./styles";

export default function ErrorComponent(isError, size = 30) {
  return (
    <>
      {isError ? (
        <UseAnimations
          animation={alertCircle}
          strokeColor="#b6174b"
          size={size}
        />
      ) : (
        <></>
      )}
    </>
  );
}
