import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  justify-content: center;
  align-items: center;
  left: 0;
  background-color: #f1f9f6;
`;

export const Logo = styled.img`
  width: 220px;
  border-radius: 50%;
`;

export const Snail = styled.img`
  width: 70px;
  position: absolute;
  bottom: 33.5%;
  left: 41%;
`;

export const Dots = styled.div`
  display: flex;
  width: 200px;
  justify-content: space-between;
  margin-top: 50px;
`;

export const Dot = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: #474973;
  opacity: 0;
`;
