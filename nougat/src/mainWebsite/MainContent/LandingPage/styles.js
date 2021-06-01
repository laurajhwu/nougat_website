import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

export const About = styled.div`
  /* width: 100vw;
  height: calc(100vh - 160px);
  background-image: url(${(props) => props.url});
  background-position: center;
  background-size: cover;
  & * {
  } */
`;

export const Animation = styled.div`
  display: flex;
  width: 900px;
  height: calc(100vh - 160px);
  position: relative;
  justify-content: center;
  overflow-y: hidden;
  background-color: transparent;
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
  /* outline: 1px solid black; */
  position: absolute;
  height: calc(100vh - 200px);
  padding: 10px 20px;
  width: 95%;
  min-height: 600px;
  background: transparent;
  & * {
    position: absolute;
    bottom: 0;
    left: 50%;
    opacity: 0;
  }
`;

export const Nougat = styled.img`
  width: 65px;
`;

export const Candy = styled.img`
  width: 65px;
`;

export const Cookie = styled.img`
  width: 60px;
`;

export const Product = styled.div`
  background-image: url(${(props) => props.url});
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-position: center;
  background-size: cover;
`;
