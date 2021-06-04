import styled from "styled-components";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  gridList: {
    // width: 500,
    height: "auto",
    overflowY: "auto",
  },
}));

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  margin: 0 auto;
  padding: 40px 100px 100px;

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
    opacity: 0.6;
  }
`;

export const Products = styled(GridList)`
  flex-basis: 75%;
  max-width: 900px;
  max-height: 1050px;
  min-width: 200px;
  height: auto !important;
`;
export const Product = styled(GridListTile)`
  height: 270px !important;
  width: 270px;

  @media only screen and (max-width: 1000px) {
    height: 250px !important;
    width: 250px;
  }

  @media only screen and (max-width: 850px) {
    height: 200px !important;
    width: 200px;
  }
`;
export const Img = styled.img`
  width: ${(props) => (props.helperImage ? "270px" : "100%")};
  height: 270px;
  position: ${(props) => (props.helperImage ? "fixed" : "unset")};
  z-index: ${(props) => (props.helperImage ? 2 : 0)};
  opacity: ${(props) => (props.helperImage ? 0 : 1)};
  @media only screen and (max-width: 1000px) {
    height: 250px;
  }
  @media only screen and (max-width: 850px) {
    height: 200px;
  }
`;

export const ProductInfo = styled(GridListTileBar)``;
export const Name = styled.div`
  font-size: 20px;
`;
export const Price = styled.div`
  margin-top: 10px;
  font-size: 16px;
`;
export const AddToCartIcon = styled.div`
  color: white;
  font-size: 32px;
  z-index: 3;
`;

export const Cart = styled.div`
  flex-basis: 25%;
  margin-left: 50px;
  padding: 60px 15px;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  max-width: 300px;
  min-width: 160px;
  min-height: 500px;
  max-height: 1500px;
  z-index: 2;
  overflow-y: scroll;
  position: relative;
`;

export const Title = styled.div`
  font-size: 24px;
  color: #7e4e53;
  position: fixed;
  top: 210px;
  background: rgb(255, 252, 227);
  background: radial-gradient(
    circle,
    rgba(255, 252, 227, 0.89) 0%,
    rgba(226, 189, 138, 0.7637429971988796) 65%,
    rgba(185, 54, 0, 0.77) 100%
  );
  line-height: 32px;
  letter-spacing: 3px;
  width: 15%;
  min-width: 120px;
  max-width: 200px;
  text-align: center;
  border-radius: 8px;
  z-index: 1;
`;

export const CartProduct = styled.div`
  width: 100%;
  margin-bottom: 20px;
  background-color: rgba(241, 249, 246, 0.7) !important;
  height: 200px;
  position: relative;
  &:last-child {
    opacity: ${(props) => props.opacity};
  }
`;
export const CartImg = styled.img`
  width: 25%;
  border-radius: 50%;
  position: absolute;
  right: 10px;
  top: 10px;
`;
export const CartName = styled.div`
  color: #584573;
  font-size: 24px;
  margin-bottom: 10px;
`;
export const CartPrice = styled.div`
  font-size: 16px;
  margin-bottom: 10px;
  border-bottom: 2px solid #025068;
  padding-bottom: 10px;
`;

export const Total = styled.div`
  font-size: 18px;
  font-weight: bold;
  text-align: right;
`;

export const Quantity = styled.div``;
export const Delete = styled(IconButton)`
  position: absolute;
  top: 0;
`;
