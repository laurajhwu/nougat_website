import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { addMinutes } from "date-fns";
import Api from "../../../../../../utils/Api";
import {
  stringDate,
  stringTime,
  dbFormatTime,
} from "../../../../../../utils/dateTimeFormat";

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
        return (
          (+time >= 0 || +time <= 23) && (time.length <= 2 || time.length > 0)
        );
      } else if (index === 1) {
        return (+time >= 0 || +time <= 59) && time.length === 2;
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
    if (isNaN(+value) || +value < 0) {
      setIsValid({ ...isValid, interval: false });
    } else {
      setIsValid({ ...isValid, interval: true });
    }
    setInterval(+value);
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

  function getTimeRange() {
    const range = [];
    const endingTime = new Date(`${stringDate(selectedDate)} ${"18:00"}`);
    let time = new Date(`${stringDate(selectedDate)} ${"9:00"}`);

    while (
      time.getHours() + time.getMinutes() <=
      endingTime.getHours() + endingTime.getMinutes()
    ) {
      range.push(time);
      time = addMinutes(time, interval);
    }
    setTimeRange(range);
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
          .reduce((sum, time) => sum + +time, 0);
        const lateVal = Object.values(late)[0]
          .split(":")
          .reduce((sum, time) => sum + +time, 0);
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
      getTimeRange();
    }
  }, [isValid, selectedDate]);

  useEffect(() => {
    if (timeRange && excludedTimes) {
      getSortedTimes();
    }
  }, [timeRange]);

  return (
    <Container>
      <Title>時間預設</Title>
      <BasicSettings>
        <InputArea>
          <FormControl>
            <Input
              value={interval}
              onChange={handleInterval}
              endAdornment={
                <InputAdornment position="end">分鐘</InputAdornment>
              }
              type="number"
              error={!isValid.interval}
            />
            <FormHelperText>時段間隔</FormHelperText>
          </FormControl>
        </InputArea>
        <InputArea>
          <FormControl>
            <Input
              value={startTime}
              onChange={handleStartTime}
              error={!isValid.start}
            />
            <FormHelperText>開始時段 (時:分)</FormHelperText>
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
            <FormHelperText>結束時段 (時:分)</FormHelperText>
          </FormControl>
        </InputArea>
        <Save
          variant="contained"
          onClick={onSave}
          disabled={
            dataChanged() || !Object.values(isValid).every((prop) => prop)
          }
        >
          儲存
        </Save>
      </BasicSettings>
      <SelectedDate>{stringDate(selectedDate)}</SelectedDate>
      <Times>
        {sortedTimes
          ? sortedTimes.map((time, index) => {
              if (time.order) {
                return (
                  <Time>
                    <Chip
                      avatar={<Avatar>訂</Avatar>}
                      label={<TimeLabel>{time.order}</TimeLabel>}
                      disabled
                    />
                  </Time>
                );
              } else if (time.exclude) {
                return (
                  <Time>
                    <Chip
                      avatar={<Avatar>休</Avatar>}
                      label={<TimeLabel>{time.exclude}</TimeLabel>}
                      color="secondary"
                      clickable
                      onClick={() => toggleExclude(time.exclude, index)}
                    />
                  </Time>
                );
              }
              return (
                <Time>
                  <Chip
                    avatar={<Avatar>空</Avatar>}
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
