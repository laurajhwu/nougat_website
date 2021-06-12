import React, { useState } from "react";
import Pagination from "@material-ui/lab/Pagination";
import { Container } from "./styles";

export default function Paginator(props) {
  const { array, useStyles, page, setPage, itemsPerPage } = props;
  const classes = useStyles();

  function changePage(event, value) {
    setPage(value);
  }

  return (
    <Pagination
      count={Math.ceil(array.length / itemsPerPage)}
      className={classes.pagination}
      size="large"
      page={page}
      onChange={changePage}
    />
  );
}
