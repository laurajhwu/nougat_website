import { addMinutes } from "date-fns";
import { stringTime } from "./dateTimeFormat";

function getTimeSum(time) {
  const splitTime = stringTime(time).split(":");
  return +splitTime[0] + +splitTime[1] / 60;
}

export default function getRange(stringDate, timeSettings) {
  const range = [];
  const endingTime = new Date(`${stringDate} ${timeSettings.end_time}`);
  let time = new Date(`${stringDate} ${timeSettings.start_time}`);

  while (getTimeSum(time) <= getTimeSum(endingTime)) {
    range.push(time);
    time = addMinutes(time, timeSettings.interval);
  }

  return range;
}
