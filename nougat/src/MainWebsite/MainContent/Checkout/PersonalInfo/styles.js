import styled from "styled-components";

export const Container = styled.div``;

export const Info = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  @media screen and (max-width: 960px) {
    display: flex;
    flex-flow: row wrap;
    & > label {
      width: 90%;
    }
  }
`;
