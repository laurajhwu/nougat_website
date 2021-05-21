import { auth } from "./firebase/firebase";

function getLoginStatus(callback) {
  auth.onAuthStateChanged(callback);
}

export default getLoginStatus;
