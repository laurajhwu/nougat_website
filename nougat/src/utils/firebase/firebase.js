import firebase from "./init";

export const db = firebase.firestore();

export const auth = firebase.auth();

export const fb = new firebase.auth.FacebookAuthProvider();
