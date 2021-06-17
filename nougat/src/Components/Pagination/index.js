import React from "react";
import Pagination from "@material-ui/lab/Pagination";
import propTypes from "prop-types";

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

Paginator.propTypes = {
  array: propTypes.array,
  useStyles: propTypes.func,
  setPage: propTypes.func,
  page: propTypes.number,
  itemsPerPage: propTypes.number,
};
