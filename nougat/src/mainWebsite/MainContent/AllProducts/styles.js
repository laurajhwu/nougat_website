import styled from "styled-components";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";

export const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  padding: 200px 100px 100px;
  background-image: url(${(props) => props.url});
  background-position: center;
  background-size: cover;
`;

export const Products = styled(GridList)`
  flex-basis: 70%;
  max-width: 900px;
  max-height: 1050px;
  min-width: 200px;
`;
export const Product = styled(GridListTile)`
  height: 300px;
  width: 300px;
  &:hover {
    transform: scale(1.01);
  }

  @media only screen and (max-width: 1000px) {
    height: 250px;
    width: 250px;
  }

  @media only screen and (max-width: 850px) {
    height: 200px;
    width: 200px;
  }
`;
export const Img = styled.img`
  width: 100%;
  height: 300px;
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
  overflow: auto;
  position: relative;
`;

export const Title = styled.div`
  font-size: 24px;
  color: #7e4e53;
  position: fixed;
  top: 210px;
  background: rgb(185, 54, 0);
  background: linear-gradient(
    156deg,
    rgba(185, 54, 0, 0.7777485994397759) 0%,
    rgba(255, 252, 227, 0.8869922969187675) 100%
  );
  line-height: 32px;
  letter-spacing: 3px;
  width: 15%;
  min-width: 120px;
  max-width: 270px;
  text-align: center;
  border-radius: 8px;
  z-index: 1;
`;

export const CartProduct = styled.div`
  width: 100%;
  margin-bottom: 20px;
  background-color: rgba(241, 249, 246, 0.7) !important;
  height: 400px;
  position: relative;
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
