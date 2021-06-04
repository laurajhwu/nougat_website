import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  max-width: 1016px;
  margin: 0 auto;
  padding: 30px 30px;
  position: relative;
  /* background-color: rgba(213, 242, 207, 0.4);
  border-radius: 20px;
  &::before {
    content: "";
    background-image: url(${(props) => props.url});
    background-position: center;
    background-size: cover;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100vw;
    height: 100vh;
    z-index: -1;
    opacity: 0.6;
  } */
`;
export const Products = styled.div`
  /* outline: 1px solid black; */
  padding: 10px 20px;
  display: flex;

  /* justify-content: space-evenly; */
  /* position: relative; */
`;

export const Total = styled.div`
  /* outline: 1px solid black; */
  /* align-self: flex-start; */
  margin: auto auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  font-size: 28px;
  font-weight: 700;
  color: #b6174b;

  & * {
    padding: 5px;
    text-align: center;
    line-height: 30px;
    &:last-child {
      font-size: 30px;
      margin-top: 10px;
      font-style: italic;
      padding-bottom: 10px;
      border-bottom: thick double #b6174b;
    }
  }
  /* position: absolute;
  top: 0;
  right: 19%; */
`;

export const Delivery = styled.div`
  border: 1px solid black;
  border-color: ${(props) => (props.notFilled ? "red" : "black")};
`;
export const Select = styled.select``;
export const Option = styled.option``;
export const Calendar = styled.div``;
export const PersonalInfo = styled.div``;
export const Info = styled.div``;
export const Input = styled.input`
  border: 1px solid black;
  border-color: ${(props) => (props.notFilled ? "red" : "black")};
`;
export const Label = styled.label``;
export const Payment = styled.div``;
export const CheckoutBtn = styled.button``;

export const Design1 = styled.div`
  /* border: 1px solid black; */
  height: 600px;
  width: 300px;
  position: absolute;
  top: -80%;
  right: 80px;
  z-index: -1;
  /* background-color: #f1f9f6; */
  background: rgb(194, 61, 102);
  background: linear-gradient(
    180deg,
    rgba(194, 61, 102, 0.7) 0%,
    rgba(218, 130, 158, 0.7) 16%,
    rgba(227, 145, 149, 0.7) 47%,
    rgba(247, 191, 229, 0.7) 76%,
    rgba(241, 232, 238, 0) 100%
  );
  & * {
    /* border: 1px solid black; */
    width: 100%;
    height: 50%;
    position: absolute;
    bottom: calc(-50% / 2);
    border-radius: 50%;
    background-color: #f1f9f6;
    background: rgb(247, 191, 229);
    background: linear-gradient(
      180deg,
      rgba(247, 191, 229, 0.1) 0%,
      rgba(241, 232, 238, 0.2) 40%,
      rgba(241, 232, 238, 0.5) 50%,
      rgba(241, 232, 238, 0.7) 100%
    );
  }
`;
