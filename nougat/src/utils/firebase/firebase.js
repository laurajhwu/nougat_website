import firebase from "./init";

export const db = firebase.firestore();

export const auth = firebase.auth();

export const storage = firebase.storage();

export const fb = new firebase.auth.FacebookAuthProvider();

export const google = new firebase.auth.GoogleAuthProvider();
