import styled from "styled-components";

export const doneIconStyle = {
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
  width: 400px;
  background-color: rgba(221, 221, 228, 0.5);
  padding: 10px;
  border-radius: 20px;
`;

export const Picture = styled.img`
  width: 200px;
`;

export const Info = styled.div`
  display: flex;
  margin-bottom: 20px;
  font-size: 20px;
  & > * {
    &:first-child {
      display: inline-block;
      width: 150px;
      letter-spacing: 5px;
      font-weight: 700;
      color: #9d858d;
    }
    &:last-child {
      color: #37323e;
    }
  }
`;

export const Logout = styled.div`
  align-self: center;
  background-color: #99a4ad;
  outline: none;
  border: 3px solid transparent;
  padding-left: 20px;
  font-size: 22px;
  letter-spacing: 20px;
  line-height: 40px;
  color: #f5f5f5;
  transition: all 0.5s;
  margin-top: 20px;
  font-weight: 700;
  &:hover {
    background-color: transparent;
    border: 3px solid #99a4ad;
    color: #b2777c;
    cursor: pointer;
  }
`;
