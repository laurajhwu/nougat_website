import styled from "styled-components";
import Button from "@material-ui/core/Button";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-right: 200px;
  align-items: center;
  padding-top: 150px;
  position: relative;
`;

export const Logout = styled(Button)`
  margin-top: 50px !important;
  border-radius: 24px !important;
  width: 100px;
  height: 50px;

  & ${".MuiButton-label"} {
    font-size: 18px;
  }
`;
