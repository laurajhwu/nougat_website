export default function convertTimestamp(timestamp) {
  const time = new Date(timestamp);
  const getDataNum = (num) => (num < 10 ? `0${num}` : `${num}`);
  return `${time.getFullYear()} / ${getDataNum(
    time.getMonth() + 1
  )} / ${getDataNum(time.getDate())}`;
}
