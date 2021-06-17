import React from "react";
import propTypes from "prop-types";

import { DisableRemove, EnableRemove } from "./styles";

export default function Delete(props) {
  const { handleDelete, deleteItems } = props;
  return (
    <>
      {deleteItems.length === 0 ? (
        <DisableRemove />
      ) : (
        <EnableRemove onClick={handleDelete} />
      )}
    </>
  );
}

Delete.propTypes = {
  deleteItems: propTypes.array,
  handleDelete: propTypes.func,
};
