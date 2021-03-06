import styled from "styled-components";
import { Jumbotron } from "react-bootstrap";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

export const Container = styled(Jumbotron)`
  margin: 10px 0;
  padding: 5px;
  width: 100%;
  height: auto;
  min-width: 800px;
  display: grid;
  grid-template-columns: repeat(1);
  grid-auto-rows: minmax(120px, 200px);
`;

export const DropArea = styled.section`
  display: grid;
  column-gap: 10px;
  grid-template-columns: repeat(4, 1fr);
  padding: 5px 20px;
  min-width: 800px;
`;

export const Product = styled.div`
  min-height: 200px;
  height: 100%;
  margin: auto 0;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
`;

export const Img = styled.img`
  max-width: 170px;
  width: 90%;
  height: 70%;
  margin: 0 auto;
`;

export const Name = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px 0 auto;
`;

export const Success = styled(Alert)`
  height: 25px;
  display: flex;
  align-items: center;
  position: absolute;
  top: 25px;
  left: 30px;
`;

export const Message = styled(Snackbar)`
  width: 200px;
  opacity: 0.8;
`;
