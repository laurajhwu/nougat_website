import styled from "styled-components";

import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  select: {
    color: "#37323e",
    opacity: 0.8,

    "&:before": {
      borderColor: "#613a3a",
      border: "none",
    },
    "&:after": {
      borderColor: "#BF9BA1",
      border: "none",
    },
    "&:focus": {
      border: "none !important",
    },
    "font-size": "45px",
    width: "120px",
    fontFamily: "lotus",
  },
  icon: { fill: "#613a3a" },
  option: {
    backgroundColor: "#EFD2CB",
    "font-size": "30px",
    color: "#710627",
    fontFamily: "lotus",
    "&:hover": {
      backgroundColor: "#fcefee",
    },
  },
}));

export const Product = styled.div`
  display: flex;
  flex-flow: row nowrap;
  width: 100vw;
  height: 100vh;
  align-items: center;
  top: 0;
  left: 0;
  background-color: rgba(215, 205, 204, 0.5);
  position: absolute;
  /* padding-top: 200px; */
  margin: 0 auto;
  justify-content: center;
  /* padding-bottom: 20px; */
  &::before {
    content: "";
    background-image: url(${(props) => props.url});
    background-position: center;
    background-size: cover;
    width: 100vw;
    height: 100vh;
    bottom: 0;
    left: 0;
    top: 0;
    left: 0;
    position: absolute;
    z-index: -1;
    opacity: 0.4;
  }
`;
export const Img = styled.img`
  margin: 0 20px;
  width: 400px;
  opacity: 0.8;
  border: ${(props) =>
    props.helperImage ? "20px solid transparent" : "20px solid #762e34;"};
  position: ${(props) => (props.helperImage ? "absolute" : "relative")};
  z-index: ${(props) => (props.helperImage ? 2 : 0)};
  border-radius: 10px;
`;
export const Info = styled.div`
  max-width: 550px;
  width: 100%;
  margin: 0 20px;
  background: rgba(207, 180, 184, 0.3);
  border: 3px solid #a06a73;
  border-radius: 10px;
  padding: 10px 20px 20px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  gap: 10px;
  & * {
    font-size: 50px;
    font-family: lotus;
  }
`;
export const Name = styled.div`
  font-family: lotus;
  line-height: 40px;
  font-size: 65px;
  font-weight: bold;
  grid-column: 1 / 5;
  display: auto;
  color: #59363a;
  letter-spacing: 10px;
  text-align: center;
  margin: 10px 0;
`;
export const Price = styled.div`
  grid-column: 1 / 3;
  opacity: 0.8;
  color: #37323e;
  align-self: center;
  justify-self: center;
  text-align: center;
`;
export const Description = styled.p`
  font-family: chalk;
  grid-column: 1 / 5;
  white-space: pre-wrap;
  color: #55574c;
  padding: 10px 0;
  border-top: thick double #a06a73;
  border-bottom: thick double #a06a73;
  text-align: center;
  line-height: 40px;
  font-size: 24px;
  padding: 24px 0;
`;

export const Label = styled.label`
  font-size: 20px;
  letter-spacing: 4px;
  line-height: 24px;
  width: 93px;
`;

export const Quantity = styled.div`
  grid-column: 3 / 5;
  justify-self: center;
  padding: 0 10px;
`;

export const QuantityBar = styled(FormControl)`
  justify-self: center;
  justify-content: center;
  align-items: center;
  height: 100% !important;
  color: #b6174b;
  letter-spacing: 2px;
`;
export const Options = styled(Select)``;
export const Option = styled(MenuItem)``;

export const AddToCartIcon = styled.div`
  vertical-align: center;
  grid-column: 1 / 5;
  width: 90%;
  justify-self: center;
  margin-top: 10px;
`;
