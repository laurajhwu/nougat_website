import styled from "styled-components";

export const Pay = styled.div`
  display: flex;
  margin: 200px auto;
  flex-flow: column nowrap;
  width: 300px;
  align-items: center;

  &::before {
    content: "";
    background-image: url(${(props) => props.url});
    background-position: center;
    background-size: cover;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: px;
    width: 100vw;
    height: 100vh;
    z-index: -1;
    opacity: 0.5;
    background-color: #f6f4f4;
  }
`;

export const Text = styled.div`
  text-align: center;
  font-size: 36px;
  font-family: chalk;
  color: #08bf5b;
  line-height: 45px;
  margin-bottom: 10px;
`;

export const Logo = styled.img`
  margin-top: 22px;
  width: 250px;
  border: 5px solid #dde8b9;
  padding: 20px;

  &:hover {
    transform: scale(1.1);
  }
`;
