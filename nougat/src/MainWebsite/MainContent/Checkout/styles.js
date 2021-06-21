import styled from "styled-components";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    flexGrow: 1,
  },
  select: {
    fontSize: "20px",
    paddingTop: "0px",
    fontFamily: "chalk",
    color: "#025068",
    "&:before": {
      borderColor: "#584573",
    },
    "&:after": {
      borderColor: "#7e7f9a",
    },
    width: "100%",
  },
  option: {
    backgroundColor: "#dbe6e6",
    fontFamily: "chalk",
    fontSize: "20px",
    "&:hover": { backgroundColor: "#8cabbe" },
    "&$selected": {
      backgroundColor: "#8cabbe",
    },
  },
  icon: { fill: "#584573" },
  label: { fontSize: "20px" },
  input: {
    "& .MuiInput-underline:after": {
      borderColor: "#025068",
    },
    "& .MuiInputBase-input": {
      color: "#025068",
      "font-size": "20px",
      fontFamily: "chalk",
    },
    minWidth: 0,
    flexGrow: 1,
  },
}));

export const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  max-width: 1016px;
  margin: 0 auto;
  padding: 30px 30px;
  position: relative;
  min-height: 100vh;
  & * {
    font-family: chalk;
  }

  &::before {
    content: "";
    background-image: url(${(props) => props.url});
    background-position: center;
    background-size: cover;
    position: absolute;
    top: -160px;
    bottom: 0;
    left: -400px;
    right: px;
    width: calc(100vw + 500px);
    height: calc(100% + 200px);
    z-index: -1;
    opacity: 0.5;
    background-color: #f6f4f4;
  }
`;

export const Options = styled(Select)``;

export const Option = styled(MenuItem)``;

export const Group = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 150px 0 100px;

  & > * {
    &:first-child {
      padding: 10px 20px 20px;
      background-color: rgba(255, 250, 227, 0.5);
      border-radius: 20px;
      @media screen and (max-width: 960px) {
        width: 450px;
      }
    }
  }

  @media screen and (max-width: 760px) {
    margin: 50px auto 180px;
    justify-content: center;
  }
`;

export const Calendar = styled.div`
  display: flex;
  align-items: center;

  @media screen and (max-width: 960px) {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    & > label {
      width: 90%;
      align-self: flex-start;
    }
  }
`;

export const Label = styled.label`
  font-size: 22px;
  color: #711509;
  width: 150px;
  font-weight: 700;
  letter-spacing: 3px;
  line-height: 20px;
  margin-left: ${(props) => (props.id ? "20px" : 0)};
`;

export const CheckoutBtn = styled.div`
  display: flex;
  margin-right: 100px;
  margin-bottom: 60px;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  color: #fff;
  background-color: rgba(238, 174, 202, 0.3);
  justify-content: center;
  align-items: center;
  font-size: 34px;
  letter-spacing: 5px;
  border: 30px solid rgba(148, 187, 233, 0.3);
  &:hover {
    cursor: pointer;
    transform: scale(1.1);
    color: #c78283;
  }

  @media screen and (max-width: 1300px) {
    margin-right: 150px;
    margin-bottom: 50px;
  }

  @media screen and (max-width: 1200px) {
    margin-right: 120px;
    margin-bottom: 50px;
  }

  @media screen and (max-width: 875px) {
    margin-bottom: 0px;
    margin-top: 5vw;
    margin-right: auto;
    margin-left: 20px;
  }

  @media screen and (max-width: 760px) {
    position: absolute;
    bottom: 0;
  }
`;
