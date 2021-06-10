import styled from "styled-components";
import { Facebook, Google } from "@styled-icons/bootstrap";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px 50px;
  margin-bottom: 20px;
  & > div {
    width: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    border-radius: 20px;
    &:hover {
      cursor: pointer;
      font-size: 21px;
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
    background: rgb(216, 81, 64);
    background: linear-gradient(
      90deg,
      rgba(216, 81, 64, 1) 0%,
      rgba(228, 135, 65, 1) 50%,
      rgba(233, 155, 65, 1) 83%,
      rgba(241, 191, 66, 1) 100%
    );
    color: #fff;
  }
`;

export const FbIcon = styled(Facebook)`
  width: 45px;
  margin-right: 10px;
  color: #2d68db;
`;

export const GoogleIcon = styled(Google)`
  width: 45px;
  margin-right: 10px;
  color: #d85140;
`;
