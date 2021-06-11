import styled from "styled-components";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  margin: 0 auto;
  padding: 40px 100px 100px;
  justify-content: center;
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
`;

export const Products = styled(GridList)`
  flex-basis: 75%;
  /* max-width: 900px; */
  min-width: 250px;
  max-height: 1050px;
  height: 600px !important;
  justify-content: center;
  & * {
    font-family: chalk;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }

  @media only screen and (max-width: 1200px) {
    height: auto !important;
    width: 500px !important;
  }
  @media only screen and (max-width: 900px) {
    flex-basis: unset;
    height: auto !important;
    width: 300px !important;
  }

  @media only screen and (max-width: 780px) {
    flex-basis: unset;
    width: 250px !important;
  }
`;

export const Product = styled(GridListTile)`
  height: 20vw !important;
  width: 20vw !important;

  & > ${".MuiGridListTile-tile"} {
    border-radius: 15px;
    border: 2px solid #bb8a89;
  }
  @media only screen and (max-width: 1500px) {
    height: 270px !important;
    width: 270px !important;
  }

  @media only screen and (max-width: 1000px) {
    height: 250px !important;
    width: 250px !important;
  }

  @media only screen and (max-width: 780px) {
    height: 200px !important;
    width: 200px !important;
    align-self: center;
  }
`;

export const Img = styled.img`
  height: 20vw;
  width: 20vw;
  position: ${(props) => (props.helperImage ? "fixed" : "unset")};
  visibility: ${(props) => (props.helperImage ? "hidden" : "visible")};
  z-index: ${(props) => (props.helperImage ? 2 : 0)};
  opacity: ${(props) => (props.helperImage ? 0 : 1)};

  @media only screen and (max-width: 1500px) {
    width: ${(props) => (props.helperImage ? "270px" : "100%")};
    height: 270px;
  }

  @media only screen and (max-width: 1000px) {
    height: 250px;
    width: 250px;
  }
  @media only screen and (max-width: 780px) {
    height: 200px;
    width: 200px;
  }
  &:hover {
    transform: scale(1.01);
  }
`;

export const ProductInfo = styled(GridListTileBar)`
  padding: 5px 0px 10px;
  &:hover {
    transform: scale(1.01);
  }
`;
export const Name = styled.div`
  font-size: 22px;
`;
export const Price = styled.div`
  margin-top: 5px;
  font-size: 18px;
  line-height: 25px;
`;
export const AddToCartIcon = styled.div`
  color: white;
  font-size: 32px;
  z-index: 3;
`;

export const Cart = styled.div`
  margin-left: 50px;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  max-width: 250px;
  min-height: 500px;
  max-height: 1500px;
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
  top: 210px;
  right: 0;
  background-color: #bd8989;
  width: 15%;
  min-width: 120px;
  max-width: 200px;
  text-align: center;
  border-radius: 8px;
  z-index: 1;
  padding: 10px 0;

  width: 100%;
  font-family: Lotus;
  font-size: 40px;
  font-weight: 700;
  color: #f0e5e5;
  line-height: 32px;
  letter-spacing: 3px;
  right: 0px;
  &:hover {
    cursor: pointer;
    color: #f0e5e5;
  }
`;

export const CartProduct = styled.div`
  border-top: thick double #ac7b7d;
  border-bottom: thick double #ac7b7d;
  border-radius: 0 0 10px 10px;
  border-radius: 10px;
  width: 100%;
  margin-bottom: 20px;
  background-color: rgba(189, 137, 137, 0.05) !important;
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
  color: #a66590;
  font-size: 26px;
  margin-bottom: 10px;
`;
export const CartPrice = styled.div`
  font-size: 18px;
  margin-bottom: 10px;
  border-bottom: 2px solid #805e6e;
  padding-bottom: 10px;
  color: #805e6e;
`;

export const Total = styled.div`
  font-size: 18px;
  font-weight: bold;
  text-align: right;
  color: #805e6e;
`;

export const Quantity = styled.div``;

export const Delete = styled(IconButton)`
  position: absolute;
  top: 0;
`;
