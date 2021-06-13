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
  min-width: 500px;
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

  @media screen and (max-width: 650px) {
    left: 50px;
    min-width: 350px;
    align-items: flex-start;
    padding-left: 20px;
  }

  @media screen and (max-width: 500px) {
    min-width: 300px;
    left: 30px;
    padding-left: 10px;
  }
`;

export const Slogan = styled.div`
  width: 70%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 30px 10px;
  & * {
    font-size: 35px;
    font-style: italic;
    font-weight: 700;
    color: #820933;
    opacity: 1;
    font-family: scholar;
    @media screen and (max-width: 500px) {
      gap: 5px 10px;
    }
  }
  @media screen and (max-width: 650px) {
    & * {
      font-size: 30px;
    }
  }

  @media screen and (max-width: 500px) {
    gap: 30px 5px;
  }
`;

export const MoreInfo = styled.div`
  margin-top: 40px;
  font-family: lotus;
  font-size: 40px;
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
  @media screen and (max-width: 650px) {
    align-self: center;
  }

  @media screen and (max-width: 500px) {
    font-size: 30px;
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

  @media screen and (max-width: 500px) {
    width: 100%;
  }
`;

export const Bowl = styled.img`
  width: 500px;
  position: absolute;
  bottom: 0px;

  @media screen and (max-width: 760px) {
    width: 400px;
  }

  @media screen and (max-width: 500px) {
    width: 300px;
  }
`;

export const Whisk = styled.img`
  width: 350px;
  align-self: flex-end;
  margin-bottom: 250px;
  margin-left: 400px;

  @media screen and (max-width: 760px) {
    width: 250px;
    margin-bottom: 200px;
    margin-left: 330px;
  }

  @media screen and (max-width: 500px) {
    width: 150px;
    margin-bottom: 150px;
    margin-left: 200px;
  }
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
  border: thick double #b2777c;

  @media screen and (max-width: 500px) {
    width: 50px;
    height: 50px;
  }
`;
