import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import {
  stringDate,
  dbFormatDate,
  stringTime,
} from "../../../../utils/dateTimeFormat";
import getTimeRange from "../../../../utils/getTimeRange";
import "react-datepicker/dist/react-datepicker.css";

function Calendar(props) {
  const { dateSettings, addDays } = props;
  const timeSettings = useSelector((state) => state.dateTime).time;
  const orderTimes = useSelector((state) => state.orders).filter(
    (order) => order.status <= 1
  );

  const timesToExclude = [
    ...orderTimes
      .filter(
        (order) =>
          stringDate(order.order_info.delivery_time.toDate()) ===
          stringDate(props.date)
      )
      .map((order) => order.order_info.delivery_time.toDate()),
    ...(timeSettings.excluded_times[dbFormatDate(props.date)] || []),
  ];

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

  function noAvailableTime(date, timesToExclude) {
    const range = getTimeRange(stringDate(date), timeSettings);

    return range.every((time) =>
      timesToExclude.map((val) => stringTime(val)).includes(stringTime(time))
    );
  }

  function getUnavailableDates() {
    const range = [];
    let count = dateSettings.buffer;
    const endingDate = addDays(dateSettings.buffer + dateSettings.range + 1);

    while (stringDate(addDays(count)) !== stringDate(endingDate)) {
      range.push(addDays(count));
      count += 1;
    }

    return range.filter((day) => {
      const timesToExclude = [
        ...orderTimes
          .filter(
            (order) =>
              stringDate(order.order_info.delivery_time.toDate()) ===
              stringDate(day)
          )
          .map((order) => order.order_info.delivery_time.toDate()),
        ...(timeSettings.excluded_times[dbFormatDate(day)] || []),
      ];
      return noAvailableTime(day, timesToExclude);
    });
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
      excludeDates={getUnavailableDates()}
      timeIntervals={timeSettings.interval}
      minTime={getTimestamp(timeSettings.start_time)}
      maxTime={getTimestamp(timeSettings.end_time)}
      filterTime={filterTimes}
    />
  );
}

export default Calendar;
