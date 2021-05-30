import styled from "styled-components";
import { PublishedWithChanges } from "@styled-icons/material-rounded";
import { CheckDouble } from "@styled-icons/boxicons-regular";
import { Cancel } from "@styled-icons/material-outlined";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

export const DateTime = styled.div`
  position: relative;
  width: 174px;
`;

export const Change = styled(PublishedWithChanges)`
  width: 16px;
  &:hover {
    cursor: pointer;
  }
`;

export const Done = styled(CheckDouble)`
  width: 20px;
  position: absolute;
  right: 25px;
  top: 2.5px;
  &:hover {
    cursor: pointer;
    color: green;
  }
`;

export const CancelIcon = styled(Cancel)`
  width: 18px;
  margin-left: 1px;
  &:hover {
    cursor: pointer;
    color: red;
  }
`;
