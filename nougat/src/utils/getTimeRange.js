import { addMinutes } from "date-fns";

export default function getRange(stringDate, timeSettings) {
  const range = [];
  const endingTime = new Date(`${stringDate} ${timeSettings.end_time}`);
  let time = new Date(`${stringDate} ${timeSettings.start_time}`);

  while (
    time.getHours() + time.getMinutes() <=
    endingTime.getHours() + endingTime.getMinutes()
  ) {
    range.push(time);
    time = addMinutes(time, timeSettings.interval);
  }

  return range;
}
