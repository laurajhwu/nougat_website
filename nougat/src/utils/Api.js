import db from "./firebase/firestore";

class Api {
  constructor() {
    this.products = "product_details";
    this.locations = "locations";
    this.orders = "orders";
    this.member = "members";
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

  async getSpecificProduct(id) {
    return await db
      .collection(this.products)
      .doc(id)
      .get()
      .then((product) => {
        return product.data();
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

  postCheckoutOrder(order, member) {
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
        member.cart_items = [];
        this.updateCartItems(member);
      });
  }

  async getMemberInfo(id) {
    return await db
      .collection(this.member)
      .doc(id)
      .get()
      .then((doc) => doc.data());
  }

  updateCartItems(member) {
    db.collection(this.member).doc(member.id).update({
      cart_items: member.cart_items,
    });
  }
}

export default new Api();
