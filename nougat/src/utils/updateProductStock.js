import Api from "./Api";
import convertToObj from "./arrayToObjectConverter";

export default function updateProductStock(order, allProducts) {
  const promises = [];
  order.products.forEach((product) => {
    const productsObj = convertToObj(allProducts, "id");
    const stock = Number(productsObj[product.id].stock - product.qty);
    promises.push(Api.updateProduct(product.id, { stock: stock }));
  });
  return promises;
}
