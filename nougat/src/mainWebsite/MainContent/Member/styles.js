import styled from "styled-components";

export const Container = styled.div`
  &:before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100vw;
    height: 100vh;
    background-image: url(${(props) => props.url});
    background-size: cover;
    background-position: center;
    z-index: -1;
    opacity: 0.9;
  }
`;
