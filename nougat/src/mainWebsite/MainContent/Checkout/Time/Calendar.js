import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import {
  stringDate,
  dbFormatDate,
  dbFormatTime,
  stringTime,
} from "../../../../utils/dateTimeFormat";

import "react-datepicker/dist/react-datepicker.css";
import setDate from "date-fns/esm/fp/setDate/index.js";

function Calendar(props) {
  const { dateSettings, addDays } = props;
  const timeSettings = useSelector((state) => state.dateTime).time;
  const orderTimes = useSelector((state) => state.orders)
    .filter((order) => order.status <= 1)
    .filter(
      (order) =>
        stringDate(order.order_info.delivery_time.toDate()) ===
        stringDate(props.date)
    )
    .map((order) => order.order_info.delivery_time.toDate());

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

  function filterTimes(time) {
    const timesToExclude = [
      ...orderTimes,
      ...(timeSettings.excluded_times[dbFormatDate(props.date)] || []),
    ];

    return !timesToExclude.some(
      (excludeTime) =>
        `${stringDate(excludeTime)} ${stringTime(excludeTime)}` ===
        `${stringDate(new Date(time))} ${stringTime(new Date(time))}`
    );
  }

  function getTimestamp(time) {
    return new Date(`${stringDate(props.date)} ${time}`);
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
      dateFormat="yyyy/MM/dd, HH:mm"
      timeFormat="HH:mm"
      timeInputLabel="時間:"
      minDate={addDays(dateSettings.buffer)}
      maxDate={addDays(dateSettings.buffer + dateSettings.range)}
      filterDate={filterDates}
      interval={timeSettings.interval}
      minTime={getTimestamp(timeSettings.start_time)}
      maxTime={getTimestamp(timeSettings.end_time)}
      filterTime={filterTimes}
    />
  );
}

export default Calendar;
