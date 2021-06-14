import styled from "styled-components";
import Image404 from "../../images/error404.jpg";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100vw;
  height: 100vh;
  background-image: url(${Image404});
  background-position: center top;
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1000;
`;
