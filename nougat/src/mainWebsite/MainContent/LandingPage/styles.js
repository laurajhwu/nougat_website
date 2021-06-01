import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  align-items: center;
`;

export const Animation = styled.div`
  display: flex;
  width: 900px;
  height: calc(100vh - 160px);
  position: relative;
  justify-content: center;
  overflow-y: hidden;
`;

export const Bowl = styled.img`
  width: 500px;
  position: absolute;
  bottom: 0px;
`;

export const Whisk = styled.img`
  width: 350px;
  align-self: flex-end;
  margin-bottom: 250px;
  margin-left: 400px;
`;

export const SplashArea = styled.div`
  outline: 1px solid black;
  position: absolute;
  height: calc(100vh - 200px);
  padding: 10px 20px;
  width: 100%;
`;

export const Nougat = styled.img`
  width: 70px;
`;
