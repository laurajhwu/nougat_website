export function stringDate(date) {
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
}

export function stringTime(time) {
  return `${time.getHours()}:${
    time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes()
  }`;
}

export function dbFormatDate(date) {
  return `${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}`;
}

export function dbFormatTime(time) {
  return time.split(":").reduce((combine, num) => combine + num, "");
}
