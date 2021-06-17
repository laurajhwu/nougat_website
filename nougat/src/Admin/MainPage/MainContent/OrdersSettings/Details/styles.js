import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  margin: auto auto;
`;

export const ModalContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: 800px;
  height: 600px;
  margin: 200px auto;
`;

export const Order = styled.div`
  color: white;
  font-size: 24px;
`;

export const Info = styled.div`
  color: white;
  display: flex;
  font-size: 18px;
  margin-top: 20px;
`;

export const Title = styled.div`
  flex-basis: 30%;
`;

export const Content = styled.div`
  flex-basis: 70%;
`;

export const Img = styled.div`
  width: 100px;
  height: 100px;
  background-size: cover;
  border-radius: 50%;
  background-position: center;
  background-image: ${(props) => `url(${props.url})`};
`;

export const Product = styled.div`
  display: flex;
`;

export const ProductTitle = styled.div`
  font-size: 18px;
  align-self: center;
  margin: 0 20px;
`;

export const ProductInfo = styled.div`
  font-size: 16px;
  & *:last-child {
    font-size: 14px;
  }
`;

export const Btn = styled.div`
  display: flex;
  justify-content: flex-end;
`;
