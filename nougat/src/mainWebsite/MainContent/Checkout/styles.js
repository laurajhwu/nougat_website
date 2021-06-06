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
    fontSize: "18px",
    paddingTop: "0px",
    color: "#025068",
    "&:before": {
      borderColor: "#584573",
    },
    "&:after": {
      borderColor: "#7e7f9a",
    },
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
  input: {
    "& .MuiInput-underline:after": {
      borderColor: "#025068",
    },
    "& .MuiInput-underline": {
      color: "#025068",
      "font-size": "16px",
    },
    "&:last-child": {
      width: 300,
    },
  },
}));

export const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  max-width: 1016px;
  margin: 0 auto;
  padding: 30px 30px;
  position: relative;
  max-height: 1600px;

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
        margin-bottom: 30px;
      }
    }
  }

  /* @media screen and (max-width: 600px) {
    flex-direction: column;
  } */
`;

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
    }
  }
`;

export const Calendar = styled.div`
  display: flex;
  align-items: center;
`;

export const PersonalInfo = styled.div``;
export const Info = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
`;

export const Input = styled.input`
  border: 1px solid black;
  border-color: ${(props) => (props.notFilled ? "red" : "black")};
`;
export const Label = styled.label`
  font-size: 18px;
  color: #711509;
  width: 120px;
  font-weight: 700;
  letter-spacing: 3px;
  line-height: 20px;
  margin-left: ${(props) => (props.id ? "20px" : 0)};
`;
export const Payment = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

export const CheckoutBtn = styled.div`
  display: flex;
  /* margin: 0 auto; */
  margin-right: 100px;
  margin-bottom: 60px;
  width: 200px;
  /* line-height: 50px; */
  height: 200px;
  border-radius: 50%;
  color: #fff;
  background-color: rgba(238, 174, 202, 0.3);
  justify-content: center;
  align-items: center;
  font-size: 30px;
  letter-spacing: 5px;
  border: 30px solid rgba(148, 187, 233, 0.3);
  &:hover {
    cursor: pointer;
    transform: scale(1.1);
    color: #c78283;
  }

  @media screen and (max-width: 1200px) {
    margin-right: 120px;
    margin-bottom: 50px;
  }
`;

export const Design1 = styled.div`
  height: 700px;
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
  width: 50vw;
  min-width: 550px;
  max-width: 900px;
  position: absolute;
  top: 725px;
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

export const Design3 = styled.div`
  height: 300px;
  width: 60vw;

  min-width: 600px;
  position: absolute;
  right: ${(props) =>
    props.vw > 1016 ? `-${(props.vw - 1016) / 2 + 200}px` : `-200px`};
  transform: rotate(-25deg);
  top: 1080px;
  z-index: -1;
  border-radius: 150px;
  background-color: #f1f9f6;
  background: rgb(238, 174, 202);
  background: linear-gradient(
    0deg,
    rgba(238, 174, 202, 0.4) 0%,
    rgba(148, 187, 233, 0.4) 100%
  );
  @media screen and (max-width: 1200px) {
    top: 1120px;
  }
`;
