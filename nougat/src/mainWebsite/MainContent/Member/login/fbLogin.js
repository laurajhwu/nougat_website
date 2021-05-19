import styled from "styled-components";
import { Facebook } from "@styled-icons/bootstrap";
import Api from "../../../../utils/Api";

const FbIcon = styled(Facebook)`
  width: 40px;
  &:hover {
    cursor: pointer;
  }
`;

function FBLogin(props) {
  function login() {
    props.setIsLoading(true);
    Api.facebookLogin()
      .then((result) => {
        const user = result.user;
        Api.isMember().then((isMember) => {
          if (isMember) {
            props.initMemberState(user.uid);
          } else {
            Api.addNewMember(user.uid, {
              id: user.uid,
              name: user.displayName,
              email: user.email,
              image: user.photoURL,
              line_id: "",
              cart_items: [],
              order_info: {},
            }).then(() => props.initMemberState(user.uid));
          }
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = error.credential;
        if (email) {
          alert("該信箱已被使用過！");
        }
        console.log(errorCode, errorMessage, email, credential);
        props.setIsLoading(false);
      });
  }

  return <FbIcon onClick={login} />;
}

export default FBLogin;
