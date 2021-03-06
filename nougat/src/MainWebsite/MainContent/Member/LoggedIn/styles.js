import styled from "styled-components";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

export const Container = styled.div`
  max-width: 1016px;
  margin: auto;
  padding: 20px;
  overflow-x: auto;
`;

export const Header = styled(Tabs)`
  width: 100%;
  border-bottom: 1px solid #b2777c;
  line-height: 25px;
  min-width: 400px;
  & > * {
    font-family: lotus;
    font-size: 45px;
    line-height: 40px;
    color: #b2777c;
    font-weight: 700;
    letter-spacing: 10px;
    &:hover {
      border: 3px solid #b2777c !important;
      color: #b2777c;
    }

    @media only screen and (max-width: 560px) {
      font-size: 34px;
      line-height: 30px;
      letter-spacing: 5px;
    }
  }

  & > ${".active"} {
    color: #f5f5f5 !important;
    background-color: #b2777c !important;
    border-bottom: none;
    border: 3px solid #b2777c !important;
    &:hover {
      color: #f5f5f5 !important;
      background-color: #b2777c !important;
    }
  }
`;

export const ProfilePage = styled(Tab)``;
export const OrderPage = styled(Tab)``;
