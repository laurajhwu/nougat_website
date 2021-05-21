import { auth } from "./firebase/firebase";

function getLoginStatus(callback) {
  auth.onAuthStateChanged(callback);
}

function checkCurrentLoginStatus() {
  const user = auth.currentUser;
  if (!user) {
    alert("請先登入！");
    window.location.pathname = "/";
  }
}

export { getLoginStatus as default, checkCurrentLoginStatus };
