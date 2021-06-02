import styled from "styled-components";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";

export const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  padding: 200px 100px 100px;
  background-image: url(${(props) => props.url});
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
