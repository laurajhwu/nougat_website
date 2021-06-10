import styled from "styled-components";
import { Modal, Button } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  pagination: {
    display: "flex",
    justifyContent: "center",
    marginBottom: 20,

    "& .MuiPaginationItem-root": {
      fontSize: 20,
      color: "#AC7B7D",
      fontFamily: "chalk",
    },
  },
}));

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  & > *:first-child {
    margin-bottom: 30px;
    background-color: #844545;
    color: #eee9e1;
    letter-spacing: 3px;
    height: 60px;
    border-radius: 0;
  }
`;

export const OrdersWrapper = styled.div`
  min-height: 600px;
`;

export const Order = styled.div`
  display: flex;
  width: 100%;
  max-width: 1024px;
  justify-content: space-between;
  background-color: #ffe1c5;
  height: 100px;
  align-items: center;

  border-radius: 0 0 55% 0;
  position: relative;
  box-shadow: 50% 30% 5px -2px #888;
  margin-bottom: 20px;
`;

export const BendMark = styled.div`
  position: absolute;
  right: 5px;
  bottom: 23px;
  width: 200px;
  height: 56px;
  overflow: hidden;
  transform: rotate(-12deg);
  opacity: 0.9;
  &:before {
    content: "";
    display: block;
    width: 200%;
    height: 200%;
    position: absolute;
    border-radius: 60%;
    bottom: 0;
    right: 0;
    box-shadow: 40px 40px 2px 0 #f2d2ba;
  }
`;

export const Title = styled.div`
  text-align: center;
  width: 25%;
  font-size: 22px;
  font-weight: 700;
  font-family: chalk;
`;

export const OrderInfo = styled.div`
  text-align: center;
  flex-basis: 25%;
  font-family: caramel;
  font-size: 26px;
`;

export const OrderNumLink = styled(Button)`
  text-align: center;
  flex-basis: 25%;
  outline: none;
  border: none;
  font-family: caramel;
  font-size: 24px;
  letter-spacing: 2px;
  color: #b6174b;

  &:focus,
  &:active {
    outline: none !important;
    outline-offset: none !important;
    box-shadow: none;
  }
  &:hover {
    color: #820933;
  }
`;

export const ModalContainer = styled(Modal)`
  & * {
    font-family: "marshmallow";
    background-color: #ffe9d6;
  }
`;

export const DetailTitle = styled(Modal.Title)`
  font-size: 32px;
  color: #844545;
  & span {
    font-size: 30px;
  }
`;

export const ModalBody = styled(Modal.Body)`
  height: auto;
`;

export const GeneralInfo = styled.div`
  font-size: 28px;
  & > * {
    line-height: 45px;
    margin-bottom: 15px;
    padding: 0 10px;
    background-color: #f8e9dd;
    color: #bf827d;
    & > div {
      background-color: #f8e9dd;
      width: 150px;
    }
    & > span {
      display: inline-block;
      background-color: #f8e9dd;
      margin-left: 10px;
      color: #796465;
    }
  }
`;

export const DetailInfo = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
`;

export const Products = styled.div`
  margin-top: 20px;
  &:before {
    content: "購買產品";
    font-size: 28px;
    line-height: 45px;
    padding-left: 10px;
    margin-bottom: 10px;
    color: #bf827d;
    background-color: #f8e9dd;
  }
`;

export const Product = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
`;

export const ProductImage = styled.img`
  width: 120px;
  border-radius: 10px;
`;

export const ProductDetails = styled.div`
  color: #796465;
  & * {
    &:first-child {
      font-size: 26px;
    }
    &:last-child {
      font-size: 24px;
      margin-top: 10px;
      text-align: center;
    }
  }
`;

export const Total = styled.div`
  font-size: 28px;
  text-align: right;
  line-height: 50px;
  letter-spacing: 3px;
  margin-top: 20px;
  border-top: 3px solid #cb8589;
  color: #710627;
`;

export const ConfirmBtn = styled(Button)`
  font-size: 26px;
  line-height: 30px;
  border: none;
  background-color: #d7b29d;
  padding-top: 10px;
  &:hover {
    background-color: #796465;
  }
`;
