import styled from "styled-components";
import Button from "@material-ui/core/Button";

export const Container = styled.form`
  display: flex;
  flex-direction: column;
  /* margin-top: 150px; */
  padding: 0px 200px 0 100px;
  border-right: 1px solid #99a4ad;
`;

export const Title = styled.div`
  font-size: 32px;
  font-weight: bold;
  letter-spacing: 10px;
  line-height: 36px;
  margin-bottom: 40px;
`;

export const Username = styled.input`
  height: 50px;
  padding: 5px 15px;
  font-size: 18px;
  border-radius: 24px;
  outline: none;
  margin-bottom: 20px;
  border: 1px solid black;
  border-color: ${(props) => (props.notValid ? "red" : "black")};
`;

export const Label = styled.label`
  font-size: 22px;
  line-height: 24px;
  letter-spacing: 5px;
  margin-bottom: 5px;
`;

export const Btn = styled(Button)`
  margin-top: 30px !important;
  border-radius: 24px !important;
  & ${".MuiButton-label"} {
    font-size: 18px;
  }
`;
