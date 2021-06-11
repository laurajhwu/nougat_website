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
    width: "250px",
    "padding-right": 25,
    position: "relative",
    marginRight: "5px;",
    fontSize: "22px",
    fontFamily: "chalk",
  },
}));

export const iconTheme = {
  position: "absolute",
  left: "225px",
  width: "25px",
  color: "#B2777C",
  top: "7px",
};

export const Container = styled.div`
  width: 100%;
`;

export const Form = styled.form`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  align-items: center;
  height: 200px;
  & > * {
    align-items: center;
  }
`;

export const Email = styled.div`
  display: flex;
`;
export const Password = styled.div`
  display: flex;
  & > * {
    &:last-child {
      flex-grow: 1;
    }
  }
`;
export const Label = styled.label`
  width: 100px;
  color: #c44536;
  font-size: 22px;
  letter-spacing: 3px;
  font-weight: 700;
  line-height: 22px;
  margin-right: 5px;
  font-family: chalk;
  display: flex;
  align-items: flex-end;
  padding: 6px 0 7px;
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
  &:hover {
    background-color: transparent;
    border: 3px solid #99a4ad;
    color: #b2777c;
  }
`;
