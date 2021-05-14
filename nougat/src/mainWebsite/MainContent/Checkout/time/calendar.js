import React from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

function Calendar(props) {
  function handleChange(date) {
    props.setDate(date);
  }

  return (
    <DatePicker
      onChange={handleChange}
      selected={props.date}
      locale="zh-TW"
      showTimeSelect
      dateFormat="yyyy/MM/dd, aa hh:mm "
      timeInputLabel="時間:"
    />
  );
}

export default Calendar;
