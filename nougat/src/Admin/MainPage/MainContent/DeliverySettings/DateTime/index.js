import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import DateSettings from "./DateSettings";
import TimeSettings from "./TimeSettings";
import { dbFormatDate } from "../../../../../utils/dateTimeFormat";

import { Container, DateSection, TimeSection } from "./styles";

export default function DateTime() {
  const dateData = useSelector((state) => state.dateTime).date;
  const timeData = useSelector((state) => state.dateTime).time;
  const initDate = (() => {
    const copy = new Date();
    copy.setDate(copy.getDate() + dateData.buffer);
    return copy;
  })();
  const [selectedDate, setSelectedDate] = useState(initDate);
  const [excludedTimes, setExcludedTimes] = useState();

  useEffect(() => {
    const times = timeData.excluded_times[dbFormatDate(selectedDate)];
    if (times) {
      setExcludedTimes(times);
    } else {
      setExcludedTimes([]);
    }
  }, [selectedDate]);

  return (
    <Container>
      <DateSection>
        <DateSettings
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          dateData={dateData}
          initDate={initDate}
        />
      </DateSection>
      <TimeSection>
        <TimeSettings
          selectedDate={selectedDate}
          timeData={timeData}
          dbFormatDate={dbFormatDate}
          excludedTimes={excludedTimes}
        />
      </TimeSection>
    </Container>
  );
}
