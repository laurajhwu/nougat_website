import styled from "styled-components";

export const Container = styled.div`
  border-color: ${(props) => (props.notFilled ? "red" : "black")};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  margin-top: 50px;
  width: auto;

  & > * {
    &:first-child {
      & > div {
        display: flex;
        align-items: center;

        margin-bottom: 30px;
        margin-right: 20px;
        @media screen and (max-width: 530px) {
          display: flex;
          flex-wrap: wrap;
          & > label {
            width: 90%;
          }
        }
      }
    }
    @media screen and (max-width: 875px) {
      &:last-child {
        margin-top: 20px;
      }
    }
  }

  @media screen and (max-width: 875px) {
    flex-direction: column;
  }
`;
