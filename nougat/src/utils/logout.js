import Api from "./Api";

function logout() {
  Api.signOut()
    .then(() => {
      alert("已登出");
      window.location.replace(`${window.location.origin}/member`);
    })
    .catch((error) => {
      throw error;
    });
}

export default logout;
