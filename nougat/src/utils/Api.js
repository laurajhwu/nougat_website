import { db, auth, fb, google } from "./firebase/firebase";
import uuid from "react-uuid";
import { encrypt, decrypt } from "./crypt";

class Api {
  constructor() {
    this.products = "product_details";
    this.locations = "locations";
    this.orders = "orders";
    this.member = "members";
    this.admin = "admin";
    this.ingredients = "ingredients";
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

  async updateProduct(id, prop, data) {
    return await db
      .collection(this.products)
      .doc(id)
      .update({
        [prop]: data,
      });
  }

  getIngredients(callbacks, initState) {
    db.collection(this.ingredients).onSnapshot((snapshot) => {
      if (initState) {
        const ingredients = {};
        snapshot.forEach((doc) => {
          Object.assign(ingredients, { [doc.data().id]: doc.data() });
        });
        callbacks.handleInit(ingredients);
      } else {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            callbacks.handleAdd(change.doc.data());
          }
          if (change.type === "modified") {
            callbacks.handleModify(change.doc.data());
          } else if (change.type === "removed") {
            callbacks.handleRemove(change.doc.data());
          }
        });
      }
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

  postCheckoutOrder(order, member, updateStock) {
    db.collection(this.orders)
      .doc(order.id)
      .set(order)
      .then(() => {
        Promise.all(updateStock(order)).then(() => {
          if (order.order_info.payment === "line-pay") {
            window.localStorage.removeItem("order");
          } else {
            alert("已收到您的訂單!");
            window.location.href = "/";
          }
          member.cart_items = [];
          this.updateMember(member.id, "cart_items", member.cart_items);
        });
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

  updateMemberAuthEmail(email, success) {
    auth.currentUser
      .updateEmail(email)
      .then(() => {
        success();
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          alert("該信箱已被註冊過！");
        } else if (error.code === "auth/requires-recent-login") {
          alert("因更改敏感資料，請登出後再重新登入試一次");
        }

        throw error;
      });
  }

  async addNewMember(id, data) {
    return await db.collection(this.member).doc(id).set(data);
  }

  async getMemberOrders(id) {
    return await db
      .collection(this.orders)
      .where("member_id", "==", id)
      .get()
      .then((querySnapshot) => querySnapshot);
  }

  getAllOrders(callbacks, initState) {
    db.collection(this.orders).onSnapshot((snapshot) => {
      if (initState) {
        const orders = [];
        snapshot.forEach((order) => {
          orders.push(order.data());
        });
        callbacks.handleInit(orders);
      } else {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            callbacks.handleAdd(change.doc.data());
          }
          if (change.type === "modified") {
            callbacks.handleModify(change.doc.data());
          }
          if (change.type === "removed") {
            callbacks.handleRemove(change.doc.data());
          }
        });
      }
    });
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

  createAdmin(username, password) {
    //need to check if user name and password already exists (rmb to trim)
    const id = uuid();
    db.collection(this.admin)
      .doc(id)
      .set({
        username,
        password_encrypt: encrypt(password, id),
      });
  }

  async adminLogin(username, password) {
    return await db
      .collection(this.admin)
      .where("username", "==", username)
      .get()
      .then((querySnapshot) => {
        const data = {};
        querySnapshot.forEach((doc) => {
          data.id = doc.id;
          data.cipher = doc.data().password_encrypt;
        });
        if (data.id) {
          return decrypt(data.cipher, data.id) === password;
        } else {
          return "usernameInvalid";
        }
      })
      .catch((error) => {
        throw error;
      });
  }
}

export default new Api();
