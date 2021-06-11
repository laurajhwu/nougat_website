import styled from "styled-components";

export const doneIconStyle = {
  width: "18px",
  margin: "0 0 0 10px",
  color: "#bba0b2",
  "&:hover": {
    cursor: "pointer",
    color: "#70a37f",
  },
};

export const Container = styled.div`
  margin-top: 50px;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
`;

export const ProfilePage = styled.div`
  margin-top: 30px;
  min-width: 450px;
  width: auto;
  background-color: rgba(255, 255, 255, 0.2);
  padding: 20px;
  border-radius: 20px;
`;

export const Picture = styled.img`
  width: 200px;
`;

export const Info = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 5px;
  font-size: 24px;
  line-height: 45px;
  & > * {
    &:first-child {
      display: inline-block;
      width: 190px;
      letter-spacing: 5px;
      font-weight: 700;
      color: #9d858d;
      font-family: chalk;
      vertical-align: middle;
    }
    &:last-child {
      color: #37323e;
      font-family: chalk;
      flex-grow: 1;
    }
  }
`;

export const Logout = styled.div`
  align-self: center;
  background-color: #99a4ad;
  outline: none;
  border: 3px solid transparent;
  padding-left: 20px;
  font-size: 50px;
  letter-spacing: 20px;
  line-height: 50px;
  color: #f5f5f5;
  transition: all 0.5s;
  margin-top: 20px;
  font-weight: 700;
  font-family: lotus;
  &:hover {
    background-color: transparent;
    border: 3px solid #99a4ad;
    color: #b2777c;
    cursor: pointer;
  }
`;
