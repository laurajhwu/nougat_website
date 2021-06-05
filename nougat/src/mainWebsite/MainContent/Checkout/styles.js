import styled from "styled-components";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  select: {
    marginTop: theme.spacing(2),
    fontSize: "18px",
    color: "#584573",
    "&:before": {
      borderColor: "#584573",
    },
    "&:after": {
      borderColor: "#7e7f9a",
    },
    // "&:focus": { backgroundColor: "#8cabbe" },
  },
  option: {
    backgroundColor: "#dbe6e6",
    "&:hover": { backgroundColor: "#8cabbe" },
    "&$selected": {
      backgroundColor: "#8cabbe",
    },
    fontSize: "16px",
  },
  icon: { fill: "#584573" },
  label: { fontSize: "16px" },
}));

export const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  max-width: 1016px;
  margin: 0 auto;
  padding: 30px 30px;
  position: relative;
  /* background-color: rgba(213, 242, 207, 0.4);
  border-radius: 20px;
  &::before {
    content: "";
    background-image: url(${(props) => props.url});
    background-position: center;
    background-size: cover;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100vw;
    height: 100vh;
    z-index: -1;
    opacity: 0.6;
  } */
`;
export const Products = styled.div`
  padding: 10px 20px;
  display: flex;
`;

export const Total = styled.div`
  margin: auto auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  font-size: 28px;
  font-weight: 700;
  color: #b6174b;

  & * {
    padding: 5px;
    text-align: center;
    line-height: 30px;
    &:last-child {
      font-size: 30px;
      margin-top: 10px;
      font-style: italic;
      padding-bottom: 10px;
      border-bottom: thick double #b6174b;
    }
  }
`;
export const Options = styled(Select)``;
export const Option = styled(MenuItem)``;

export const Delivery = styled.div`
  /* border: 1px solid black; */
  border-color: ${(props) => (props.notFilled ? "red" : "black")};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  margin-top: 50px;
  & > * {
    &:first-child {
      & > div {
        display: flex;
        align-items: center;
      }
    }
  }
`;

export const Calendar = styled.div``;

export const PersonalInfo = styled.div``;
export const Info = styled.div``;
export const Input = styled.input`
  border: 1px solid black;
  border-color: ${(props) => (props.notFilled ? "red" : "black")};
`;
export const Label = styled.label``;
export const Payment = styled.div``;
export const CheckoutBtn = styled.button``;

export const Design1 = styled.div`
  height: 600px;
  width: 300px;
  position: absolute;
  top: -400px;
  right: 80px;
  z-index: -1;

  background: rgb(194, 61, 102);
  background: linear-gradient(
    180deg,
    rgba(194, 61, 102, 0.7) 0%,
    rgba(218, 130, 158, 0.7) 16%,
    rgba(227, 145, 149, 0.7) 47%,
    rgba(247, 191, 229, 0.7) 76%,
    rgba(241, 232, 238, 0) 100%
  );
  & * {
    width: 100%;
    height: 50%;
    position: absolute;
    bottom: calc(-50% / 2);
    border-radius: 50%;
    background-color: #f1f9f6;
    background: rgb(247, 191, 229);
    background: linear-gradient(
      180deg,
      rgba(247, 191, 229, 0.1) 0%,
      rgba(241, 232, 238, 0.2) 40%,
      rgba(241, 232, 238, 0.5) 50%,
      rgba(241, 232, 238, 0.7) 100%
    );
  }
`;

export const Design2 = styled.div`
  height: 300px;
  width: 52vw;
  min-width: 650px;
  position: absolute;
  top: 550px;
  left: ${(props) =>
    props.vw > 1016 ? `-${(props.vw - 1016) / 2 + 150}px` : `-150px`};
  z-index: -1;
  border-radius: 150px;
  background-color: #f1f9f6;
  background: rgb(0, 173, 185);
  background: linear-gradient(
    156deg,
    rgba(0, 173, 185, 0.4) 0%,
    rgba(255, 250, 227, 0.5) 100%
  );
`;
