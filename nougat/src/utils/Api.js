import db from "./firebase/firestore";

class Api {
  constructor() {
    this.products = "product_details";
    this.locations = "locations";
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
}

export default new Api();
