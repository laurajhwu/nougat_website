import React, { useState } from "react";
import { useSelector } from "react-redux";
import DateSettings from "./DateSettings";

import { Container, DateSection } from "./styles";

export default function DateTime() {
  const dateData = useSelector((state) => state.dateTime).date;
  const initDate = (() => {
    const copy = new Date();
    copy.setDate(copy.getDate() + dateData.buffer);
    return copy;
  })();
  const [selectedDate, setSelectedDate] = useState(initDate);

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
    </Container>
  );
}
