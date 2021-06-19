import styled from "styled-components";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  pagination: {
    display: "flex",
    justifyContent: "center",
    margin: 20,
    padding: 10,
    width: "100%",
    "& .MuiPaginationItem-root": {
      fontSize: 20,
      color: "#820933",
      fontFamily: "chalk",
    },
  },
}));

export const iconBtnStyle = (vw) => ({
  padding: vw <= 740 ? "7px" : "10px",
  ...(vw <= 740
    ? {
        position: "absolute",
        right: "10px",
        bottom: "5px",
      }
    : {
        position: "absolute",
        right: "5px",
        bottom: "5px",
      }),
});

export const deleteStyle = (vw) => ({
  color: "#805e6e",
  "&:hover": { color: "#820933" },
  width: vw < 740 ? "24px" : "28px",
});

export const quantityBtnStyle = (vw) => ({
  select: {
    "font-size": vw < 740 ? "16px" : "18px",
    color: "#805e6e",
    "font-weight": "bold",
    width: vw < 740 ? "60px" : "65px",

    fontFamily: "chalk",
  },
  menu: {
    "font-size": "16px",
    color: "#37323e",
    "max-height": "300px",
  },
  container: {
    "font-size": vw < 740 ? "16px" : "18px",
    color: "#805e6e",
  },
});

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  margin: 0 auto;
  padding: 20px 50px 100px;
  justify-content: center;
  flex-flow: row wrap;
  &::before {
    content: "";
    position: absolute;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url(${(props) => props.url});
    background-position: center;
    background-size: cover;
    z-index: -1;
    opacity: 0.8;
  }

  @media only screen and (max-width: 910px) {
    padding: 20px 30px 100px;
  }

  @media only screen and (max-width: 444px) {
    padding: 0px 30px 10px;
    height: 500px;
    align-items: flex-start;
  }
`;

export const Products = styled(GridList)`
  flex-basis: 70%;
  flex-grow: 1;
  min-width: 250px;
  height: 500px !important;
  max-width: 1200px;
  margin-left: 10px;
  & * {
    font-family: chalk;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  @media only screen and (max-width: 444px) {
    justify-content: center;
    height: 450px !important;
  }
`;

export const Product = styled(GridListTile)`
  height: 270px !important;
  width: 270px !important;

  & > ${".MuiGridListTile-tile"} {
    border-radius: 15px;
    border: 2px solid #bb8a89;
  }

  @media only screen and (max-width: 870px) {
    height: 250px !important;
    width: 250px !important;
  }

  @media only screen and (max-width: 740px) {
    height: 200px !important;
    width: 200px !important;
  }
`;

export const Img = styled.img`
  width: ${(props) => (props.helperImage ? "270px" : "100%")};
  height: 270px;

  position: ${(props) => (props.helperImage ? "fixed" : "unset")};
  visibility: ${(props) => (props.helperImage ? "hidden" : "visible")};
  z-index: ${(props) => (props.helperImage ? 2 : 0)};
  opacity: ${(props) => (props.helperImage ? 0 : 1)};

  @media only screen and (max-width: 870px) {
    height: 250px;
    width: 250px;
  }

  @media only screen and (max-width: 740px) {
    height: 200px;
    width: 200px;
  }

  &:hover {
    transform: scale(1.01);
  }
`;

export const ProductInfo = styled(GridListTileBar)`
  padding: 15px 0px;

  &.MuiGridListTileBar-rootSubtitle {
    height: 80px;
  }

  @media only screen and (max-width: 740px) {
    padding: 10px 0px;
  }

  &:hover {
    transform: scale(1.01);
  }
`;
export const Name = styled.div`
  font-size: 22px;

  @media only screen and (max-width: 740px) {
    line-height: 25px;
    font-size: 18px;
  }
`;
export const Price = styled.div`
  margin-top: 12px;
  font-size: 18px;
  line-height: 25px;
  @media only screen and (max-width: 740px) {
    line-height: 16px;
    font-size: 16px;
    margin-top: 15px;
  }
`;
export const AddToCartIcon = styled.div`
  color: white;
  font-size: 32px;
  z-index: 3;
  @media only screen and (max-width: 740px) {
    font-size: 25px;
  }
`;

export const Cart = styled.div`
  margin-left: 1%;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  max-width: 250px;
  height: 0px;
  z-index: 2;
  overflow-y: scroll;
  position: relative;
  flex-basis: 0;
  padding: 0;
  min-width: 0px;
  & * {
    font-family: chalk;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Title = styled.div`
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
  position: fixed !important;
  top: 150px;
  right: 0px;
  background-color: #bd8989;
  max-width: 200px;
  text-align: center;
  border-radius: 8px;
  z-index: 1;
  padding: 10px 0;
  opacity: 0.9;
  width: 100%;
  font-family: Lotus;
  font-size: 40px;
  font-weight: 700;
  color: #f0e5e5;
  line-height: 32px;
  letter-spacing: 3px;
  &:hover {
    cursor: pointer;
    color: #f0e5e5;
  }

  @media screen and (max-width: 900px) {
    width: 180px;
    font-size: 36px;
  }

  @media only screen and (max-width: 610px) {
    width: 50px;
    padding: 10px 10px;

    &:hover {
      cursor: not-allowed;
    }
  }
`;

export const CartProduct = styled.div`
  border-top: thick double #ac7b7d;
  border-bottom: thick double #ac7b7d;
  border-radius: 10px;
  width: 100%;
  margin-bottom: 20px;
  background-color: rgba(189, 137, 137, 0.05) !important;
  height: auto;
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  &:last-child {
    opacity: ${(props) => props.opacity};
  }
`;

export const CartName = styled.div`
  color: #a66590;
  font-size: 26px;
  margin-bottom: 10px;

  @media screen and (max-width: 900px) {
    font-size: 24px;
  }

  @media only screen and (max-width: 740px) {
    font-size: 22px;
  }
`;

export const CartPrice = styled.div`
  font-size: 18px;
  margin-bottom: 10px;
  border-bottom: 2px solid #805e6e;
  padding-bottom: 10px;
  color: #805e6e;
  @media only screen and (max-width: 740px) {
    font-size: 16px;
    border-bottom: 2px solid #805e6e;
  }
`;

export const Total = styled.div`
  font-size: 18px;
  font-weight: bold;
  text-align: right;
  color: #805e6e;
  @media only screen and (max-width: 740px) {
    font-size: 16px;
  }
`;

export const Quantity = styled.div``;

export const Delete = styled(IconButton)`
  position: absolute;
  top: 0;
`;
