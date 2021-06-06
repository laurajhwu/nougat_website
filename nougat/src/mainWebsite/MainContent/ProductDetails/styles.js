import styled from "styled-components";

import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  select: {
    color: "#37323e",
    "&:before": {
      borderColor: "#613a3a",
    },
    "&:after": {
      borderColor: "#BF9BA1",
    },
    "font-size": "20px",
  },
  icon: { fill: "#613a3a" },
  option: {
    backgroundColor: "#EFD2CB",
    color: "#710627",
    "&:hover": {
      backgroundColor: "#fcefee",
    },
  },
}));

export const Product = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: 100vw;
  height: 100vh;
  align-items: center;
  top: 0;
  left: 0;
  justify-content: flex-start;
  background-color: rgba(215, 205, 204, 0.5);
  position: absolute;
  padding-top: 160px;
  padding-bottom: 20px;
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
  width: 400px;
  opacity: 0.9;
  border: ${(props) =>
    props.helperImage ? "20px solid transparent" : "20px solid #762e34;"};
  /* margin-top: 20px; */
  position: ${(props) => (props.helperImage ? "absolute" : "relative")};
  z-index: ${(props) => (props.helperImage ? 2 : 0)};
`;
export const Info = styled.div`
  max-width: 550px;
  width: 100%;
  margin: 30px 0;
  background: rgba(207, 180, 184, 0.3);
  border: 3px solid #a06a73;
  border-radius: 10px;
  padding: 10px 20px 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  gap: 10px;
  & * {
    font-size: 24px;
  }
`;
export const Name = styled.div`
  line-height: 40px;
  font-size: 32px;
  font-weight: bold;
  grid-column: 1 / 4;
  display: auto;
  color: #59363a;
  letter-spacing: 10px;
  text-align: center;
`;
export const Price = styled.div`
  font-size: 26px;
  font-style: italic;
  opacity: 0.8;
  color: #37323e;
  align-self: center;
  text-align: center;
`;
export const Description = styled.p`
  grid-column: 1 / 4;
  white-space: pre-wrap;
  color: #55574c;
  padding: 10px 0;
  border-top: thick double #a06a73;
  border-bottom: thick double #a06a73;
  text-align: center;
`;

export const Label = styled.label`
  font-size: 20px;
  letter-spacing: 4px;
  line-height: 24px;
  width: 93px;
`;

export const Quantity = styled.div`
  justify-self: stretch;
  padding: 0 10px;
`;

export const QuantityBar = styled(FormControl)`
  width: 100%;
`;
export const Options = styled(Select)``;
export const Option = styled(MenuItem)``;

export const AddToCartIcon = styled.div`
  vertical-align: center;
`;
