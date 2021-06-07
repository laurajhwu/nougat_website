import Api from "./Api";

function logout() {
  Api.signOut()
    .then(() => {
      window.location.replace(`${window.location.origin}/member`);
    })
    .catch((error) => {
      throw error;
    });
}

export default logout;
