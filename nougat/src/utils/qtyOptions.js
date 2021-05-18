function options(stock) {
  let options = [];
  for (let i = 0.5; i <= stock; i += 0.5) {
    options = [...options, i.toFixed(1)];
  }
  return options;
}

export default options;
