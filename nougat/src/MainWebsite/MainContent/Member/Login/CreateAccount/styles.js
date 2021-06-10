import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  input: {
    "&:before": {
      borderColor: "#99a4ad",
      borderBottom: `2px solid`,
    },
    "&:after": {
      borderColor: "#B2777C",
    },
    width: "220px",
    "padding-right": 25,
    position: "relative",
    marginRight: "5px;",
    fontSize: "20px",
    fontFamily: "chalk",
  },
}));

export const iconTheme = {
  position: "absolute",
  left: "195px",
  width: "25px",
  color: "#B2777C",
};

export const Container = styled.div`
  width: 100%;
`;

export const Form = styled.form`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  height: 300px;
`;

const Parent = styled.div`
  display: flex;
`;
export const Name = styled(Parent)``;
export const Line = styled(Parent)``;
export const Email = styled(Parent)``;
export const Password = styled(Parent)`
  & > * {
    &:last-child {
      flex-grow: 1;
    }
  }
`;

export const Label = styled.label`
  width: 130px;
  color: #c44536;
  font-size: 22px;
  letter-spacing: 3px;
  font-weight: 700;
  line-height: 22px;
  margin-right: 5px;
`;

export const Register = styled.button`
  align-self: center;
  background-color: #99a4ad;
  outline: none;
  border: 3px solid transparent;
  font-size: 22px;
  letter-spacing: 5px;
  padding: 10px 5px 10px 10px;
  color: #f5f5f5;
  transition: all 0.5s;
  margin-top: 10px;
  &:hover {
    background-color: transparent;
    border: 3px solid #99a4ad;
    color: #b2777c;
  }
`;
