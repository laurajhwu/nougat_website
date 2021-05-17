import db from "./firebase/firestore";

class Api {
  constructor() {
    this.products = "product_details";
    this.locations = "locations";
    this.orders = "orders";
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
    if (order) {
      if (order.id) {
        db.collection(this.orders)
          .doc(order.id)
          .set(order)
          .then(() => window.localStorage.removeItem("order"));
      } else {
        db.collection(this.orders)
          .add(order)
          .then((docRef) => {
            db.collection(this.orders)
              .doc(docRef.id)
              .update({ id: docRef.id })
              .then(() => {
                alert("已收到您的訂單!");
                window.location.href = "/";
              });
          });
      }
    }
  }
}

export default new Api();
