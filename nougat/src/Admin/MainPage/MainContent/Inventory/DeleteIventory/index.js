import React from "react";

import { DisableRemove, EnableRemove } from "./styles";

export default function Delete(props) {
  return (
    <>
      {props.deleteItems.length === 0 ? (
        <DisableRemove />
      ) : (
        <EnableRemove onClick={props.handleDelete} />
      )}
    </>
  );
}
