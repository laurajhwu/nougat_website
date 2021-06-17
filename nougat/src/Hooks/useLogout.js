import Api from "../utils/Api";
import { useHistory } from "react-router-dom";

function useLogout() {
  const history = useHistory();
  return () => {
    Api.signOut()
      .then(() => {
        history.push(`/member`);
      })
      .catch((error) => {
        throw error;
      });
  };
}

export default useLogout;
