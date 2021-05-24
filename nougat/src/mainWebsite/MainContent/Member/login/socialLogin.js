import styled from "styled-components";
import { Facebook, Google } from "@styled-icons/bootstrap";
import Api from "../../../../utils/Api";

const FbIcon = styled(Facebook)`
  width: 40px;
  &:hover {
    cursor: pointer;
  }
`;

const GoogleIcon = styled(Google)`
  width: 40px;
  &:hover {
    cursor: pointer;
  }
`;

function SocialLogin(props) {
  function login(api) {
    props.setIsLoading(true);
    api()
      .then((result) => {
        const user = result.user;
        Api.isMember(user.uid).then((isMember) => {
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
        if (email) {
          alert("該信箱已被使用過！");
        }
        console.log(errorCode, errorMessage);
        props.setIsLoading(false);
      });
  }

  return (
    <>
      <FbIcon onClick={() => login(Api.facebookLogin)} />
      <GoogleIcon onClick={() => login(Api.googleLogin)} />
    </>
  );
}

export default SocialLogin;
