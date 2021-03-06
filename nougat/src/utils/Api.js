import { db, firestore, auth, storage, fb, google } from "./firebase/firebase";
import uuid from "react-uuid";
import { encrypt, decrypt } from "./crypt";
import convertToObj from "./arrayToObjectConverter";

class Api {
  constructor() {
    this.products = "product_details";
    this.locations = "locations";
    this.orders = "orders";
    this.member = "members";
    this.admin = "admin";
    this.ingredients = "ingredients";
    this.dateTime = "date_time";
    this.excludedTimes = "excluded_times";
  }

  getProducts(callback) {
    const unsubscribe = db.collection(this.products).onSnapshot(callback);
    return unsubscribe;
  }

  getSpecificProduct(id) {
    return db
      .collection(this.products)
      .doc(id)
      .get()
      .then((product) => {
        return product.data();
      });
  }

  checkSameProduct(name) {
    return db
      .collection(this.products)
      .where("name", "==", name)
      .get()
      .then((snapshot) => {
        let isValid = true;
        snapshot.forEach((doc) => {
          isValid = false;
        });
        return isValid;
      });
  }

  addProduct(data) {
    return db
      .collection(this.products)
      .add(data)
      .then((product) => {
        return db
          .collection(this.products)
          .doc(product.id)
          .update({ id: product.id });
      });
  }

  updateProduct(id, data, obj = null) {
    if (!obj) {
      return db.collection(this.products).doc(id).update(data);
    } else {
      const batch = db.batch();

      Object.entries(obj).forEach(([id, value]) => {
        const ref = db.collection(this.products).doc(id);
        batch.update(ref, value);
      });

      return batch.commit();
    }
  }

  removeMultipleProducts(idArray) {
    const batch = db.batch();
    idArray.forEach((id) => {
      const ref = db.collection(this.products).doc(id);
      batch.delete(ref);
    });
    return batch.commit();
  }

  updateProductOrder(products) {
    const batch = db.batch();
    products.forEach((product) => {
      const ref = db.collection(this.products).doc(product.id);
      batch.update(ref, { display_order: product.display_order });
    });
    return batch.commit();
  }

  getIngredients(callback) {
    const unsubscribe = db.collection(this.ingredients).onSnapshot(callback);
    return unsubscribe;
  }

  updateIngredients(id, data, obj = null) {
    if (!obj) {
      return db.collection(this.ingredients).doc(id).update(data);
    } else {
      const batch = db.batch();

      Object.entries(obj).forEach(([id, value]) => {
        const ref = db.collection(this.ingredients).doc(id);
        batch.update(ref, value);
      });

      return batch.commit();
    }
  }

  checkSameIngredient(name) {
    return db
      .collection(this.ingredients)
      .where("name", "==", name)
      .get()
      .then((snapshot) => {
        let isValid = true;
        snapshot.forEach((doc) => {
          isValid = false;
        });
        return isValid;
      });
  }

  addIngredient(data) {
    return db
      .collection(this.ingredients)
      .add(data)
      .then((ingredient) => {
        return db
          .collection(this.ingredients)
          .doc(ingredient.id)
          .update({ id: ingredient.id });
      });
  }

  removeMultipleIngredients(idArray, products) {
    const productsIngredientsObj = products.reduce(
      (obj, product) => ({
        ...obj,
        [product.id]: convertToObj(product.ingredients, "id"),
      }),
      {}
    );
    const updatedProducts = {};

    const batch = db.batch();

    idArray.forEach((ingredientId) => {
      const ingredientRef = db.collection(this.ingredients).doc(ingredientId);

      Object.keys(productsIngredientsObj).forEach((productId) => {
        const product = productsIngredientsObj[productId];
        if (product[ingredientId]) {
          delete product[ingredientId];
          Object.assign(updatedProducts, { [productId]: product });
        }
      });

      batch.delete(ingredientRef);
    });

    Object.entries(updatedProducts).forEach(([productId, ingredients]) => {
      const productRef = db.collection(this.products).doc(productId);
      batch.update(productRef, {
        ingredients: Object.values(ingredients),
      });
    });

    return batch.commit();
  }

  getLocations(callback) {
    const unsubscribe = db.collection(this.locations).onSnapshot(callback);
    return unsubscribe;
  }

  addLocation(data) {
    return db
      .collection(this.locations)
      .add(data)
      .then((location) => {
        return db
          .collection(this.locations)
          .doc(location.id)
          .update({ id: location.id });
      });
  }

  updateLocation(id, data) {
    return db.collection(this.locations).doc(id).update(data);
  }

  removeLocation(id) {
    return db.collection(this.locations).doc(id).delete();
  }

  getDate(callback) {
    const unsubscribe = db
      .collection(this.dateTime)
      .doc("date")
      .onSnapshot((doc) => {
        callback(doc.data());
      });

    return unsubscribe;
  }

  updateDate(data) {
    return db.collection(this.dateTime).doc("date").update(data);
  }

  getTime(callback) {
    const unsubscribe = db
      .collection(this.dateTime)
      .doc("time")
      .onSnapshot((doc) => {
        callback(doc.data());
      });

    return unsubscribe;
  }

  updateTime(data) {
    return db.collection(this.dateTime).doc("time").update(data);
  }

  getExcludedTimes(callback) {
    const unsubscribe = db.collection(this.excludedTimes).onSnapshot(callback);

    return unsubscribe;
  }

  addExcludedTimes(dateTime, data) {
    const ref = db.collection(this.excludedTimes).doc(dateTime);
    return ref.get().then((doc) => {
      if (doc.exists) {
        return ref.update(data);
      } else {
        return ref.set(data);
      }
    });
  }

  removeExcludedTimes(dateTime, time) {
    return db
      .collection(this.excludedTimes)
      .doc(dateTime)
      .update({
        [time]: firestore.FieldValue.delete(),
      });
  }

  postCheckoutOrder(order, member, updateStock) {
    return db
      .collection(this.orders)
      .doc(order.id)
      .set(order)
      .then(() => {
        Promise.all(updateStock(order)).then(() => {
          if (order.order_info.payment === "line-pay") {
            window.localStorage.removeItem("order");
          }
          member.cart_items = [];
          this.updateMember(member.id, "cart_items", member.cart_items);
        });
      });
  }

  getMemberInfo(id, callback) {
    const unsubscribe = db.collection(this.member).doc(id).onSnapshot(callback);
    return unsubscribe;
  }

  isMember(id) {
    return db
      .collection(this.member)
      .doc(id)
      .get()
      .then((doc) => doc.exists);
  }

  updateMember(id, prop, value) {
    return db
      .collection(this.member)
      .doc(id)
      .update({
        [prop]: value,
      });
  }

  updateMemberAuthEmail(email, success) {
    return auth.currentUser.updateEmail(email).then(() => {
      success();
    });
  }

  addNewMember(id, data) {
    return db.collection(this.member).doc(id).set(data);
  }

  getMemberOrders(id) {
    return db
      .collection(this.orders)
      .where("member_id", "==", id)
      .get()
      .then((querySnapshot) => querySnapshot);
  }

  getAllOrders(callback) {
    const unsubscribe = db.collection(this.orders).onSnapshot(callback);
    return unsubscribe;
  }

  updateOrder(id, data) {
    return db.collection(this.orders).doc(id).update(data);
  }

  createAccount(email, password) {
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        return userCredential.user;
      });
  }

  sendVerificationEmail(email, actionCodeSettings) {
    return auth.sendSignInLinkToEmail(email, actionCodeSettings);
  }

  verifyEmail() {
    if (auth.isSignInWithEmailLink(window.location.href)) {
      let email = window.localStorage.getItem("emailForSignIn");
      if (!email) {
        email = window.prompt("?????????????????????????????????");
      }
      return auth.signInWithEmailLink(email, window.location.href);
    }
    return new Promise((resolve) => resolve(false));
  }

  signIn(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  facebookLogin() {
    fb.addScope("email");
    auth.languageCode = "zh-TW";
    return auth.signInWithPopup(fb);
  }

  googleLogin() {
    google.addScope("https://www.googleapis.com/auth/contacts.readonly");
    auth.languageCode = "zh-TW";
    return auth.signInWithPopup(google);
  }

  getLoginStatus(callback) {
    const unsubscribe = auth.onAuthStateChanged(callback);
    return unsubscribe;
  }

  signOut() {
    return auth.signOut();
  }

  checkSameAdminUsername(username) {
    return db
      .collection(this.admin)
      .where("username", "==", username)
      .get()
      .then((snapshot) => {
        let isNotValid = false;
        snapshot.forEach((doc) => {
          isNotValid = true;
        });
        return isNotValid;
      });
  }

  checkSameAdminPassword(password) {
    return db
      .collection(this.admin)
      .get()
      .then((snapshot) => {
        let isNotValid = false;
        snapshot.forEach((doc) => {
          if (decrypt(doc.data().password_encrypt, doc.id) === password) {
            isNotValid = true;
          }
        });
        return isNotValid;
      });
  }

  createAdmin(username, password) {
    const id = uuid();
    return db
      .collection(this.admin)
      .doc(id)
      .set({
        username,
        password_encrypt: encrypt(password, id),
      });
  }

  adminLogin(username, password) {
    return db
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

  getImageUrl(path, file) {
    const imgRef = storage.ref().child(`${path}/${file.name}`);

    return imgRef.put(file).then(() => {
      return imgRef.getDownloadURL().then((url) => url);
    });
  }
}

export default new Api();
