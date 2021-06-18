import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  height: 500px;
  overflow: auto;
  padding: 10px 15px;
  width: 60%;
  min-width: 500px;
  background-color: rgba(239, 210, 203, 0.2);
  border-radius: 15px;
  -ms-overflow-style: none;
  scrollbar-width: none;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  @media only screen and (max-width: 570px) {
    min-width: 320px;
  }
`;

export const Products = styled.div`
  padding: 10px 20px;
  display: flex;
  position: relative;
  @media only screen and (max-width: 570px) {
    justify-content: center;
  }
`;

export const Product = styled.div`
  display: flex;
  flex-flow: row nowrap;
  padding: 5px 10px;
  border-bottom: 2px solid #cc7b82;
  justify-content: space-evenly;
`;

export const Img = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 10px;
  @media only screen and (max-width: 1000px) {
    width: 100px;
    height: 100px;
  }
  @media only screen and (max-width: 570px) {
    display: none;
  }
`;

export const Group = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;

  &:nth-child(2) {
    padding: 10px 15px;
    justify-content: space-between;
    font-size: 17px;
    color: #613a3a;
    font-weight: 700;
    margin-right: 10px;
    @media only screen and (max-width: 760px) {
      font-size: 14px;
    }
  }
`;

export const Name = styled.div`
  font-size: 20px;
  @media only screen and (max-width: 1000px) {
    font-size: 18px;
  }
  @media only screen and (max-width: 760px) {
    font-size: 16px;
  }
`;

export const Price = styled.div``;

export const Total = styled.div`
  font-style: italic;
`;

export const Delete = styled.div`
  margin-left: 30px;
  color: #9d858d;
  &:hover {
    color: #613a3a;
    transform: scale(1.2);
  }
`;

export const EmptyCart = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  color: #b6174b;
  padding-bottom: 20px;
  & > * {
    &:first-child {
      width: 100px;
      margin: 10px 0;
    }
  }
`;

export const GrandTotal = styled.div`
  margin: auto auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  font-size: 32px;
  font-weight: 700;
  color: #b6174b;

  & * {
    padding: 5px;
    text-align: center;
    line-height: 30px;
    &:last-child {
      font-size: 32px;
      margin-top: 10px;
      font-style: italic;
      padding-bottom: 10px;
      border-bottom: thick double #b6174b;
      @media only screen and (max-width: 760px) {
        font-size: 26px;
      }
      @media only screen and (max-width: 660px) {
        font-size: 22px;
        border-bottom: none;
      }
      @media only screen and (max-width: 570px) {
        font-size: 20px;
      }
    }
  }

  @media only screen and (max-width: 760px) {
    font-size: 26px;
    font-style: italic;
    position: absolute;
    bottom: 10px;
    left: 480px;
  }

  @media only screen and (max-width: 660px) {
    font-size: 22px;
    font-style: italic;
    position: absolute;
    bottom: -25px;
    left: 320px;
    flex-direction: row;
  }

  @media only screen and (max-width: 570px) {
    bottom: -30px;
    font-size: 20px;
    left: 130px;
  }
`;
