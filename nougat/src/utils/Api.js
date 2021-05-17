import db from "./firebase/firestore";

class Api {
  constructor() {
    this.products = "product_details";
    this.locations = "locations";
    this.orders = "orders";
  }

  async getProducts() {
    return await db
      .collection(this.products)
      .get()
      .then((querySnapshot) => {
        let products = [];
        querySnapshot.forEach((product) => {
          products = [...products, product.data()];
        });
        return products;
      });
  }

  async getLocations() {
    return await db
      .collection(this.locations)
      .get()
      .then((querySnapshot) => {
        let locations = [];
        querySnapshot.forEach((location) => {
          locations.push(location.data());
        });

        return locations;
      });
  }

  postCheckoutOrder(order) {
    db.collection(this.orders)
      .doc(order.id)
      .set(order)
      .then(() => {
        if (order.order_info.payment === "line-pay") {
          window.localStorage.removeItem("order");
        } else {
          alert("已收到您的訂單!");
          window.location.href = "/";
        }
      });
  }
}

export default new Api();
