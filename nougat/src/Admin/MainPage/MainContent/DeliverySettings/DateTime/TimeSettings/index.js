import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Api from "../../../../../../utils/Api";
import {
  stringDate,
  stringTime,
  dbFormatTime,
} from "../../../../../../utils/dateTimeFormat";
import getTimeRange from "../../../../../../utils/getTimeRange";
import propTypes from "prop-types";

import {
  Input,
  InputAdornment,
  FormControl,
  FormHelperText,
  Chip,
  Avatar,
} from "@material-ui/core";

import {
  Container,
  Times,
  Title,
  BasicSettings,
  InputArea,
  Line,
  SelectedDate,
  Time,
  TimeLabel,
  Save,
} from "./styles";

export default function TimeSettings(props) {
  const { selectedDate, timeData, dbFormatDate, excludedTimes } = props;
  const orders = useSelector((state) => state.orders)
    .filter((order) => order.status <= 1)
    .filter(
      (order) =>
        stringDate(order.order_info.delivery_time.toDate()) ===
        stringDate(selectedDate)
    );

  const [interval, setInterval] = useState(timeData.interval);
  const [startTime, setStartTime] = useState(timeData.start_time);
  const [endTime, setEndTime] = useState(timeData.end_time);
  const [isValid, setIsValid] = useState({
    start: true,
    end: true,
    interval: true,
  });
  const [timeRange, setTimeRange] = useState();
  const [sortedTimes, setSortedTimes] = useState();

  function validateTime(value, prop) {
    const valid = value.split(":").every((time, index) => {
      if (isNaN(+time) || value.split(":").length !== 2) {
        return false;
      } else if (index === 0) {
        return +time > 0 && +time <= 24 && time.length <= 2 && time.length > 0;
      } else if (index === 1) {
        return +time >= 0 && +time <= 59 && time.length === 2;
      }
      return false;
    });
    if (valid) {
      setIsValid({ ...isValid, [prop]: true });
    } else {
      setIsValid({ ...isValid, [prop]: false });
    }
  }

  function handleInterval(event) {
    const value = event.target.value.trim();
    if (isNaN(+value) || +value < 15) {
      setIsValid({ ...isValid, interval: false });
    } else {
      setIsValid({ ...isValid, interval: true });
    }
    setInterval(isNaN(+value) ? 0 : +value);
  }

  function handleStartTime(event) {
    const value = event.target.value.trim();
    validateTime(value, "start");
    setStartTime(value);
  }

  function handleEndTime(event) {
    const value = event.target.value.trim();
    validateTime(value, "end");
    setEndTime(value);
  }

  function getSortedTimes() {
    const availableTimes = timeRange.reduce(
      (obj, time) => ({ ...obj, [stringTime(time)]: "available" }),
      {}
    );
    const deliveryTimes = orders.reduce(
      (obj, order) => ({
        ...obj,
        [stringTime(order.order_info.delivery_time.toDate())]: "order",
      }),
      {}
    );
    const unavailableTimes = excludedTimes.reduce(
      (obj, time) => ({
        ...obj,
        [stringTime(time)]: "exclude",
      }),
      {}
    );
    const mergeTimes = Object.entries({
      ...availableTimes,
      ...unavailableTimes,
      ...deliveryTimes,
    })
      .map(([time, type]) => ({ [type]: time }))
      .sort((early, late) => {
        const earlyVal = Object.values(early)[0]
          .split(":")
          .reduce(
            (sum, time, index) => sum + (index === 1 ? +time / 60 : +time),
            0
          );
        const lateVal = Object.values(late)[0]
          .split(":")
          .reduce(
            (sum, time, index) => sum + (index === 1 ? +time / 60 : +time),
            0
          );
        return earlyVal - lateVal;
      });

    setSortedTimes(mergeTimes);
  }

  function dataChanged() {
    return (
      interval === timeData.interval &&
      startTime === timeData.start_time &&
      endTime === timeData.end_time
    );
  }

  function onSave() {
    Api.updateTime({ interval, start_time: startTime, end_time: endTime });
  }

  function toggleAvailable(time, index) {
    const dbDate = dbFormatDate(selectedDate);
    const dbTime = dbFormatTime(time);
    Api.addExcludedTimes(dbDate, {
      [dbTime]: new Date(`${stringDate(selectedDate)} ${time}`),
    }).then(() => {
      sortedTimes[index] = { exclude: time };
      setSortedTimes([...sortedTimes]);
    });
  }

  function toggleExclude(time, index) {
    const dbDate = dbFormatDate(selectedDate);
    const dbTime = dbFormatTime(time);
    Api.removeExcludedTimes(dbDate, dbTime).then(() => {
      sortedTimes[index] = { available: time };
      setSortedTimes([...sortedTimes]);
    });
  }

  useEffect(() => {
    if (Object.values(isValid).every((value) => value)) {
      setTimeRange(
        getTimeRange(stringDate(selectedDate), {
          end_time: endTime,
          start_time: startTime,
          interval,
        })
      );
    }
  }, [isValid, selectedDate]);

  useEffect(() => {
    if (timeRange && excludedTimes) {
      getSortedTimes();
    }
  }, [timeRange]);

  return (
    <Container>
      <Title>????????????</Title>
      <BasicSettings>
        <InputArea>
          <FormControl>
            <Input
              value={interval}
              onChange={handleInterval}
              endAdornment={
                <InputAdornment position="end">??????</InputAdornment>
              }
              error={!isValid.interval}
            />
            <FormHelperText>????????????</FormHelperText>
          </FormControl>
        </InputArea>
        <InputArea>
          <FormControl>
            <Input
              value={startTime}
              onChange={handleStartTime}
              error={!isValid.start}
            />
            <FormHelperText>???????????? (???:???)</FormHelperText>
          </FormControl>
        </InputArea>
        <Line>-</Line>
        <InputArea>
          <FormControl>
            <Input
              value={endTime}
              onChange={handleEndTime}
              error={!isValid.end}
            />
            <FormHelperText>???????????? (???:???)</FormHelperText>
          </FormControl>
        </InputArea>
        <Save
          variant="contained"
          onClick={onSave}
          disabled={
            dataChanged() || !Object.values(isValid).every((prop) => prop)
          }
        >
          ??????
        </Save>
      </BasicSettings>
      <SelectedDate>{stringDate(selectedDate)}</SelectedDate>
      <Times>
        {sortedTimes
          ? sortedTimes.map((time, index) => {
              if (time.order) {
                return (
                  <Time key={index}>
                    <Chip
                      avatar={<Avatar>???</Avatar>}
                      label={<TimeLabel>{time.order}</TimeLabel>}
                      disabled
                    />
                  </Time>
                );
              } else if (time.exclude) {
                return (
                  <Time key={index}>
                    <Chip
                      avatar={<Avatar>???</Avatar>}
                      label={<TimeLabel>{time.exclude}</TimeLabel>}
                      color="secondary"
                      clickable
                      onClick={() => toggleExclude(time.exclude, index)}
                    />
                  </Time>
                );
              }
              return (
                <Time key={index}>
                  <Chip
                    avatar={<Avatar>???</Avatar>}
                    label={<TimeLabel>{time.available}</TimeLabel>}
                    color="primary"
                    clickable
                    onClick={() => toggleAvailable(time.available, index)}
                  />
                </Time>
              );
            })
          : ""}
      </Times>
    </Container>
  );
}

TimeSettings.propTypes = {
  dbFormatDate: propTypes.func,
  selectedDate: propTypes.instanceOf(Date),
  timeData: propTypes.object,
  excludedTimes: propTypes.array,
};
