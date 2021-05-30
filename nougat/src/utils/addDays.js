export default function addDays(days) {
  const initDate = new Date();
  initDate.setDate(initDate.getDate() + days);
  return initDate;
}
