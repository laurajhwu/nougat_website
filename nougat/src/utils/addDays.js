export default function addDays(days, date = undefined) {
  const initDate = date || new Date();
  initDate.setDate(initDate.getDate() + days);
  return initDate;
}
