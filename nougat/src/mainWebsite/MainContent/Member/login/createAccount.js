import styled from "styled-components";
import { useState } from "react";
import PasswordInput from "../../../../Components/password";
import Api from "../../../../utils/Api";

const Form = styled.form``;
const Title = styled.div``;
const Name = styled(Title)``;
const Line = styled.div``;
const Email = styled.div``;
const Password = styled.div``;
const Label = styled.label``;
const Input = styled.input`
  border: 1px solid black;
  border-color: ${(props) => (props.notValid ? "red" : "black")};
`;
const Register = styled.button``;

function CreateAccount() {
  const [name, setName] = useState();
  const [line_id, setLine] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPW, setConfirmPW] = useState();
  const [register, setRegister] = useState(false);
  const [checkInput, setCheckInput] = useState(false);

  function handleChange(event, setFunc) {
    setFunc(event.target.value.trim());
  }

  function handleSubmit(event) {
    event.preventDefault();
    setRegister(true);
    setCheckInput(true);
    if (validateInfo()) {
      Api.createAccount(email, password)
        .then((user) => {
          const actionCodeSettings = {
            url: `${window.location.origin}/member/login/verify`,
            handleCodeInApp: true,
          };
          Api.addNewMember(user.uid, {
            name,
            line_id,
            email,
            cart_items: [],
            order_info: {},
          });

          Api.sendVerificationEmail(email, actionCodeSettings)
            .then(() => {
              window.localStorage.setItem("emailForSignIn", email);
              alert("已寄出驗證信囉，請查看信箱進行驗證～");
              event.target.reset();
              setRegister(false);
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              alert("寄件失敗");
              console.log(errorCode, errorMessage);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode === "auth/email-already-in-use") {
            alert("該信箱已有註冊帳號！");
          } else {
            alert(`註冊失敗，請在試一次！${errorMessage}(${errorCode})`);
          }
        });
    } else {
      setRegister(false);
    }
  }

  function validEmail() {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      email
    );
  }

  function validPassword() {
    return password && password.length >= 6;
  }

  function validConfirmPW() {
    return confirmPW && password === confirmPW;
  }

  function validateInfo() {
    if (!validEmail()) {
      alert("信箱格式有誤！");
    } else if (!(name && line_id)) {
      alert("所有空格皆為必填");
    } else if (!validPassword()) {
      alert("密碼需至少有6字！");
    } else if (!validConfirmPW()) {
      alert("密碼與確認密碼不同！");
    } else {
      return true;
    }
    return false;
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Name>
        <Label>姓名</Label>
        <Input
          type="text"
          onChange={(event) => handleChange(event, setName)}
          notValid={checkInput && !name}
        />
      </Name>
      <Line>
        <Label>Line ID</Label>
        <Input
          type="text"
          onChange={(event) => handleChange(event, setLine)}
          notValid={checkInput && !line_id}
        />
      </Line>
      <Email>
        <Label>信箱</Label>
        <Input
          type="text"
          onChange={(event) => handleChange(event, setEmail)}
          notValid={checkInput && !validEmail()}
        />
      </Email>
      <Password>
        <Label>密碼</Label>
        <PasswordInput
          handleChange={(event) => handleChange(event, setPassword)}
          placeholder="至少6個字"
          notValid={checkInput && !validPassword()}
        />
      </Password>
      <Password>
        <Label>確認密碼</Label>
        <PasswordInput
          handleChange={(event) => handleChange(event, setConfirmPW)}
          notValid={checkInput && !validConfirmPW()}
        />
      </Password>
      <Register type="submit" disabled={register}>
        註冊
      </Register>
    </Form>
  );
}

export default CreateAccount;
