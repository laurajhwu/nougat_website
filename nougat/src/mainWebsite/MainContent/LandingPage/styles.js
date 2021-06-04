import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

export const About = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  background-color: #ebe7ef;
  top: 0;
  z-index: -1;
  opacity: 0;

  &::before {
    content: "";
    background-image: url(${(props) => props.url});
    background-size: cover;
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    opacity: 0.75;
  }
`;

export const AboutContent = styled.div`
  width: 30%;
  height: 30%;
  min-width: 400px;
  position: absolute;
  background-color: #dddde4;
  opacity: 0.6;
  bottom: 150px;
  left: 100px;
  border-radius: 10px;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
`;

export const Slogan = styled.div`
  width: 70%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 30px 10px;
  & * {
    font-size: 28px;
    font-style: italic;
    font-weight: bolder;
    color: #820933;
    opacity: 1;
  }
`;

export const MoreInfo = styled.div`
  margin-top: 40px;

  font-size: 24px;
  padding: 15px 20px;
  border: 5px solid white;
  font-weight: bold;
  opacity: 1;
  color: #bba0b2;
  transition: all 0.5s;
  z-index: 100;
  &:hover {
    transform: scale(1.1) !important;
    color: #584573;
    border-color: #584573;
    cursor: pointer;
  }
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
