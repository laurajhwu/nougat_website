export default function pageSplitter(arr, itemsPerPage) {
  if (arr.length === 0 || !arr) {
    return [];
  }
  const copy = [...arr];
  const totalPages = Math.ceil(copy.length / itemsPerPage);
  const splittedOrders = [];
  for (let i = 0; i < totalPages; i++) {
    splittedOrders[i] = copy.splice(0, itemsPerPage);
  }
  return splittedOrders;
}
