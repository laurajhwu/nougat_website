import { db, auth, fb, google } from "./firebase/firebase";

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
        this.updateMember(member.id, "cart_items", member.cart_items);
      });
  }

  async getMemberInfo(id) {
    return await db
      .collection(this.member)
      .doc(id)
      .get()
      .then((doc) => doc.data());
  }

  async isMember(id) {
    return await db
      .collection(this.member)
      .doc(id)
      .get()
      .then((doc) => doc.exists);
  }

  async updateMember(id, prop, value) {
    return await db
      .collection(this.member)
      .doc(id)
      .update({
        [prop]: value,
      });
  }

  async addNewMember(id, data) {
    return await db.collection(this.member).doc(id).set(data);
  }

  async createAccount(email, password) {
    return await auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        return userCredential.user;
      });
  }

  async sendVerificationEmail(email, actionCodeSettings) {
    return await auth.sendSignInLinkToEmail(email, actionCodeSettings);
  }

  async verifyEmail() {
    if (auth.isSignInWithEmailLink(window.location.href)) {
      let email = window.localStorage.getItem("emailForSignIn");
      if (!email) {
        email = window.prompt("請輸入您的信箱進行驗證");
      }
      return await auth.signInWithEmailLink(email, window.location.href);
    }
    return new Promise((resolve) => resolve(false));
  }

  async signIn(email, password) {
    return await auth.signInWithEmailAndPassword(email, password);
  }

  async facebookLogin() {
    fb.addScope("email");
    auth.languageCode = "zh-TW";
    return await auth.signInWithPopup(fb);
  }

  async googleLogin() {
    google.addScope("https://www.googleapis.com/auth/contacts.readonly");
    auth.languageCode = "zh-TW";
    return await auth.signInWithPopup(google);
  }

  async signOut() {
    return await auth.signOut();
  }
}

export default new Api();
