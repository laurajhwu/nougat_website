import styled from "styled-components";

export const Design1 = styled.div`
  height: 700px;
  width: 300px;
  position: absolute;
  top: -400px;
  right: 80px;
  z-index: -1;

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

  @media only screen and (max-width: 1000px) {
    /* width: 250px; */
    right: 100px;
    left: auto;
  }

  @media only screen and (max-width: 440px) {
    left: 60px;
  }
`;

export const Design2 = styled.div`
  height: 300px;
  width: 50vw;
  min-width: 550px;
  max-width: 900px;
  position: absolute;
  top: 725px;
  left: ${(props) =>
    props.vw > 1016 ? `-${(props.vw - 1016) / 2 + 150}px` : `-150px`};
  z-index: -1;
  border-radius: 150px;
  background-color: #f1f9f6;
  background: rgb(0, 173, 185);
  background: linear-gradient(
    156deg,
    rgba(0, 173, 185, 0.4) 0%,
    rgba(255, 250, 227, 0.5) 100%
  );
`;

export const Design3 = styled.div`
  height: 300px;
  width: 60vw;

  min-width: 600px;
  position: absolute;
  right: ${(props) =>
    props.vw > 1016 ? `-${(props.vw - 1016) / 2 + 200}px` : `-200px`};
  transform: rotate(-25deg);
  top: 1080px;
  z-index: -1;
  border-radius: 150px;
  background-color: #f1f9f6;
  background: rgb(238, 174, 202);
  background: linear-gradient(
    0deg,
    rgba(238, 174, 202, 0.4) 0%,
    rgba(148, 187, 233, 0.4) 100%
  );
  @media screen and (max-width: 1200px) {
    top: 1120px;
  }

  @media screen and (max-width: 960px) {
    top: 1180px;
  }

  @media screen and (max-width: 875px) {
    top: 1600px;
  }

  @media screen and (max-width: 760px) {
    top: 1400px;
    width: 700px;
  }
`;
