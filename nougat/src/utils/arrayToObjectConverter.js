function convertArrayToObject(arr, prop) {
  const obj = {};
  arr.forEach((item) => {
    Object.assign(obj, { [item[prop]]: item });
  });
  return obj;
}

export default convertArrayToObject;
