import React from "react";
import styled from "styled-components";

import { useSelector } from "react-redux";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

function Calendar(props) {
  const dateSettings = useSelector((state) => state.dateTime).date;

  function addDays(days) {
    const initDate = new Date();
    initDate.setDate(initDate.getDate() + days);
    return initDate;
  }

  function filterDates(date) {
    const { include } = dateSettings;
    const includeDate = !dateSettings.exclude_dates.some(
      (disabledDate) =>
        date.getFullYear() === disabledDate.toDate().getFullYear() &&
        date.getMonth() === disabledDate.toDate().getMonth() &&
        date.getDate() === disabledDate.toDate().getDate()
    );
    if (include === "weekdays") {
      return date.getDay() !== 0 && date.getDay() !== 6 && includeDate;
    } else if (include === "weekends") {
      return date.getDay() === 0 || (date.getDay() === 6 && includeDate);
    }
    return includeDate;
  }

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
      minDate={addDays(dateSettings.buffer)}
      maxDate={addDays(dateSettings.buffer + dateSettings.range)}
      filterDate={filterDates}
    />
  );
}

export default Calendar;
