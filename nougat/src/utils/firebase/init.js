import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDfV2Ecr0w9oY4asxKH6vo9DqBybr4rTdM",
  authDomain: "gua-gua-nougat.firebaseapp.com",
  projectId: "gua-gua-nougat",
  storageBucket: "gua-gua-nougat.appspot.com",
  messagingSenderId: "381199201694",
  appId: "1:381199201694:web:e14a42e53dfa924ff5128f",
  measurementId: "G-Q42Z49N3MW",
  databaseURL:
    "https://gua-gua-nougat-default-rtdb.asia-southeast1.firebasedatabase.app",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
