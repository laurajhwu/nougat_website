import { addMinutes } from "date-fns";
import { stringTime } from "./dateTimeFormat";

export default function getRange(stringDate, timeSettings) {
  const range = [];
  const endingTime = addMinutes(
    new Date(`${stringDate} ${timeSettings.end_time}`),
    timeSettings.interval
  );
  let time = new Date(`${stringDate} ${timeSettings.start_time}`);

  while (stringTime(time) !== stringTime(endingTime)) {
    range.push(time);
    time = addMinutes(time, timeSettings.interval);
  }

  return range;
}
