import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { differenceInCalendarDays } from "date-fns";

import {
  InputLabel,
  TextField,
  Input,
  InputAdornment,
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
  Button,
} from "@material-ui/core";

import {
  Container,
  DateSection,
  Form,
  Range,
  IncludeLabel,
  AddIcon,
  InputField,
  Exclude,
  DeleteIcon,
  Btn,
} from "./styles";

export default function DateTime() {
  const initDate = (() => {
    const today = new Date();
    today.setDate(today.getDate() + 7);
    return today;
  })();
  const [date, setDate] = useState({
    buffer: 7,
    include: "weekdays",
    exclude: [`${initDate.getFullYear()}/${initDate.getMonth() + 1}/dd`],
    range: 14,
    year: initDate.getFullYear(),
    month: initDate.getMonth() + 1,
  });
  const [invalidDate, setInvalidDate] = useState([]);
  const [selectedDate, setSelectedDate] = useState(initDate);
  const [invalidRange, setInvalidRange] = useState(false);
  const [invalidBuffer, setInvalidBuffer] = useState(false);
  const [disableDates, setDisableDates] = useState();

  function handleDateInclude(event) {
    setDate({ ...date, include: event.target.value.trim() });
  }

  function handleDateExclude(event, index) {
    const exclude = date.exclude;
    exclude[index] = event.target.value.trim();
    validDate(exclude[index], index);
    setDate({ ...date });
  }

  function validDate(date, index) {
    const isValid = date.split("/").every((val, index) => {
      const value = val.trim();
      if (isNaN(value) || date.split("/").length < 3) {
        return false;
      } else if (index === 0) {
        return value >= date.year && value.length === 4;
      } else if (index === 1) {
        return value > 0 && value <= 12 && value.length <= 2;
      } else if (index === 2) {
        return value > 0 && value < 31 && value.length <= 2;
      }
      return false;
    });
    if (isValid) {
      invalidDate[index] = false;
    } else {
      invalidDate[index] = true;
    }
    setInvalidDate([...invalidDate]);
    return isValid;
  }

  function addExclude() {
    const exclude = date.exclude;
    const lastIndex = exclude.length - 1;
    if (validDate(exclude[lastIndex], lastIndex)) {
      exclude.push(`${date.year}/${date.month}/dd`);
      setDate({ ...date });
    }
  }

  function handleDateRange(event) {
    date.range = Number(event.target.value.trim());
    if (isNaN(date.range) || date.range < 0) {
      setInvalidRange(true);
    } else {
      setDate({ ...date });
      setInvalidRange(false);
    }
  }

  function handleBufferTime(event) {
    date.buffer = Number(event.target.value.trim());
    if (isNaN(date.buffer) || date.buffer < 0) {
      setInvalidBuffer(true);
    } else {
      setDate({ ...date });
      setInvalidBuffer(false);
    }
  }

  function removeExclude(index) {
    const exclude = date.exclude;
    exclude.splice(index, 1);
    setDate({ ...date });
  }

  function addDays(days) {
    if (!invalidRange && !invalidBuffer && date.range) {
      const copy = new Date();
      copy.setDate(copy.getDate() + days);
      return copy;
    }
  }

  function disableIncludeOptions(calDate) {
    if (date.include === "weekdays") {
      return calDate.getDay() === 0 || calDate.getDay() === 6;
    } else if (date.include === "weekends") {
      return calDate.getDay() > 0 && calDate.getDay() < 6;
    }
    return false;
  }

  function tileDisabled({ date, view }) {
    if (disableDates && view === "month") {
      return disableDates.some(
        (disabledDate) =>
          (date.getFullYear() === disabledDate.getFullYear() &&
            date.getMonth() === disabledDate.getMonth() &&
            date.getDate() === disabledDate.getDate()) ||
          disableIncludeOptions(date)
      );
    }

    if (view === "month") {
      return disableIncludeOptions(date);
    }
  }

  useEffect(() => {
    if (invalidDate.length !== 0) {
      const indices = [];
      invalidDate.forEach((state, index) => {
        if (!state) {
          indices.push(index);
        }
      });
      if (indices.length !== 0) {
        setDisableDates(indices.map((index) => new Date(date.exclude[index])));
      } else {
        setDisableDates(null);
      }
    }
  }, [invalidDate]);

  return (
    <Container>
      <DateSection>
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          locale={"zh-TW"}
          minDate={addDays(date.buffer)}
          maxDate={addDays(date.range + date.buffer)}
          tileDisabled={tileDisabled}
        />
        <Form>
          <Range>
            <div>
              <TextField
                id="range"
                label="緩衝時間"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">天</InputAdornment>
                  ),
                }}
                defaultValue={date.buffer}
                onChange={handleBufferTime}
                error={invalidBuffer}
              />
            </div>
            <div>
              <TextField
                id="range"
                label="天數涵蓋範圍"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">天</InputAdornment>
                  ),
                }}
                defaultValue={date.range}
                onChange={handleDateRange}
                error={invalidRange}
              />
            </div>
          </Range>
          <FormControl component="fieldset">
            <IncludeLabel component="legend">篩選</IncludeLabel>
            <RadioGroup
              aria-label="include"
              name="include"
              value={date.include}
              onChange={handleDateInclude}
              row
            >
              <FormControlLabel
                value="weekends"
                control={<Radio />}
                label="週末"
              />
              <FormControlLabel
                value="weekdays"
                control={<Radio />}
                label="平日"
              />

              <FormControlLabel value="all" control={<Radio />} label="皆含" />
            </RadioGroup>
          </FormControl>
          <Exclude>
            <AddIcon onClick={addExclude} />
            {date.exclude.map((day, index) => {
              return index === 0 ? (
                <FormControl key={index}>
                  <InputLabel htmlFor="component-simple">排除日期</InputLabel>
                  <InputField
                    id="component-simple"
                    value={day}
                    onChange={(event) => handleDateExclude(event, index)}
                    placeholder="YYYY/MM/DD"
                    error={invalidDate[index]}
                  />
                </FormControl>
              ) : (
                <FormControl key={index}>
                  <InputLabel htmlFor="component-simple">排除日期</InputLabel>
                  <InputField
                    id="component-simple"
                    value={day}
                    onChange={(event) => handleDateExclude(event, index)}
                    placeholder="YYYY/MM/DD"
                    error={invalidDate[index]}
                    endAdornment={
                      <InputAdornment position="end">
                        <DeleteIcon onClick={() => removeExclude(index)} />
                      </InputAdornment>
                    }
                  />
                </FormControl>
              );
            })}
          </Exclude>
          <Btn>
            <Button variant="outlined" color="primary" type="submit">
              確認
            </Button>
          </Btn>
        </Form>
      </DateSection>
    </Container>
  );
}
