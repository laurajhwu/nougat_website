import React, { forwardRef, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { setMinutes, setHours, addMinutes } from "date-fns";
import DatePicker from "react-datepicker";
import {
  stringDate,
  dbFormatDate,
  stringTime,
} from "../../../../utils/dateTimeFormat";
import getTimeRange from "../../../../utils/getTimeRange";
import addDays from "../../../../utils/addDays";
import "react-datepicker/dist/react-datepicker.css";
import UseAnimations from "react-useanimations";
import calendar from "react-useanimations/lib/calendar";
import propTypes from "prop-types";

import { Container, Value } from "./styles";

function Calendar(props) {
  const { date, setDate } = props;
  const dateRef = useRef(date ? stringDate(date) : "");
  const dateSettings = useSelector((state) => state.dateTime).date;
  const timeSettings = useSelector((state) => state.dateTime).time;
  const orderTimes = useSelector((state) => state.orders).filter(
    (order) => order.status <= 1
  );
  // eslint-disable-next-line react/prop-types
  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <Container>
      <Value>{value}</Value>
      <UseAnimations
        strokeColor="#C78283"
        size={50}
        animation={calendar}
        onClick={onClick}
        ref={ref}
        onMouseOver={(event) => (event.target.style.cursor = "pointer")}
      />
    </Container>
  ));

  CustomInput.displayName = "CustomInput";

  function getTimesToExclude(date) {
    return [
      ...orderTimes
        .filter(
          (order) =>
            stringDate(order.order_info.delivery_time.toDate()) ===
            stringDate(date)
        )
        .map((order) => order.order_info.delivery_time.toDate()),
      ...(timeSettings.excluded_times[dbFormatDate(date)] || []),
    ];
  }

  function getFirstAvailableDate() {
    let numberOfDays = dateSettings.buffer;

    while (
      dateSettings.exclude_dates
        .map((date) => date.toDate())
        .some((date) => stringDate(addDays(numberOfDays)) === stringDate(date))
    ) {
      numberOfDays++;
    }
    return addDays(numberOfDays);
  }

  function getFirstAvailableTime() {
    // eslint-disable-next-line camelcase
    const { start_time } = timeSettings;
    const init = setHours(
      setMinutes(date, +start_time.split(":")[1]),
      +start_time.split(":")[0]
    );
    let minutes = 0;

    while (
      getTimesToExclude(init).some(
        (time) => stringTime(time) === stringTime(addMinutes(init, minutes))
      )
    ) {
      minutes += timeSettings.interval;
    }
    return addMinutes(init, minutes);
  }

  function initDate() {
    // eslint-disable-next-line camelcase
    const { start_time, end_time } = timeSettings;
    const getDateTimeString = (dateTime) =>
      `${stringDate(dateTime)}${stringTime(dateTime)}`;
    const getTimeSum = (time) => time.getHours() + time.getMinutes() / 60;
    const end = setHours(
      setMinutes(getFirstAvailableDate(), +end_time.split(":")[1]),
      +end_time.split(":")[0]
    );
    let init = setHours(
      setMinutes(getFirstAvailableDate(), +start_time.split(":")[1]),
      +start_time.split(":")[0]
    );
    let minutes = 0;

    while (
      getTimesToExclude(init).some(
        (time) =>
          getDateTimeString(time) ===
          getDateTimeString(addMinutes(init, minutes))
      )
    ) {
      minutes += timeSettings.interval;

      if (getTimeSum(addMinutes(init, minutes)) > getTimeSum(end)) {
        init = setHours(
          setMinutes(addDays(1, init), +start_time.split(":")[1]),
          +start_time.split(":")[0]
        );
        minutes = 0;
      }
    }
    return addMinutes(init, minutes);
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

  function filterTimes(time) {
    return !getTimesToExclude(date).some(
      (excludeTime) =>
        `${stringDate(excludeTime)} ${stringTime(excludeTime)}` ===
        `${stringDate(new Date(time))} ${stringTime(new Date(time))}`
    );
  }

  function getTimestamp(time) {
    return new Date(`${stringDate(date)} ${time}`);
  }

  function handleChange(date) {
    setDate(date);
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

  useEffect(() => {
    if (dateSettings && timeSettings) {
      setDate(initDate());
      dateRef.current = stringDate(initDate());
    }
  }, [dateSettings, timeSettings]);

  useEffect(() => {
    if (stringDate(date) !== dateRef.current) {
      setDate(getFirstAvailableTime());
      dateRef.current = stringDate(date);
    }
  }, [date]);

  if (date) {
    return (
      <DatePicker
        onChange={handleChange}
        selected={date}
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
        customInput={
          window.location.pathname === "/cart" ? <CustomInput /> : null
        }
      />
    );
  } else {
    return "";
  }
}

Calendar.propTypes = {
  date: propTypes.instanceOf(Date),
  setDate: propTypes.func,
  onClick: propTypes.func,
  value: propTypes.string,
};

export default Calendar;
