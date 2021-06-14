import styled from "styled-components";
import { PublishedWithChanges } from "@styled-icons/material-rounded";
import { CheckDouble } from "@styled-icons/boxicons-regular";
import { Cancel } from "@styled-icons/material-outlined";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 200px;
`;

export const DateTime = styled.div`
  position: relative;

  & > ${".react-datepicker-wrapper"} {
    width: 140px;
  }

  & input {
    font-size: 14px;
    width: 140px;
  }

  @media only screen and (max-width: 1000px) {
    & > ${".react-datepicker-wrapper"} {
      width: 110px;
    }

    & input {
      font-size: 12px;
      width: 110px;
    }
  }
`;

export const Change = styled(PublishedWithChanges)`
  width: 16px;
  &:hover {
    cursor: pointer;
    color: #347285;
  }
`;

export const Done = styled(CheckDouble)`
  width: 20px;
  position: absolute;

  left: 125px;
  top: 0px;
  &:hover {
    cursor: pointer;
    color: green;
  }

  @media only screen and (max-width: 1000px) {
    position: relative;
    left: 0px;
  }
`;

export const CancelIcon = styled(Cancel)`
  width: 18px;
  margin-left: 1px;
  &:hover {
    cursor: pointer;
    color: red;
  }

  @media only screen and (max-width: 1000px) {
    margin-left: 2px;
  }
`;
