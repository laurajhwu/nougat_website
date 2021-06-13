import styled from "styled-components";
import { Facebook, Google } from "@styled-icons/bootstrap";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 20px;
  margin-bottom: 10px;
  & > div {
    width: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    border-radius: 20px;
    font-family: chalk;
    &:hover {
      cursor: pointer;
      font-size: 23px;
    }

    @media only screen and (max-width: 430px) {
      font-size: 20px;
      width: 165px;
    }
  }
`;

export const FbContainer = styled(Container)`
  & > div {
    background: rgb(45, 104, 219);
    background: linear-gradient(
      45deg,
      rgba(45, 104, 219, 1) 0%,
      rgba(78, 165, 245, 1) 100%
    );
    color: #fff;
  }
`;

export const GoogleContainer = styled(Container)`
  & > div {
    background: rgb(221, 75, 57);
    background: linear-gradient(
      84deg,
      rgba(221, 75, 57, 1) 0%,
      rgba(244, 113, 103, 1) 100%
    );
    color: #fff;
  }
`;

export const FbIcon = styled(Facebook)`
  width: 42px;
  margin-right: 10px;
  color: #2d68db;

  @media only screen and (max-width: 430px) {
    width: 35px;
  }
`;

export const GoogleIcon = styled.img`
  width: 42px;
  margin-right: 10px;
  color: #d85140;
  @media only screen and (max-width: 430px) {
    width: 35px;
  }
`;
