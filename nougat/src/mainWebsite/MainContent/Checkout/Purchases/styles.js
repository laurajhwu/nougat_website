import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  height: 500px;
  overflow: auto;
  padding: 10px 15px;
  width: 60%;
  background-color: rgba(239, 210, 203, 0.2);
  border-radius: 15px;
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
  }
`;
export const Name = styled.div`
  font-size: 20px;
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
