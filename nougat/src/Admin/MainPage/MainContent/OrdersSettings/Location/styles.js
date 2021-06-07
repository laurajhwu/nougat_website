import styled from "styled-components";
import { ChangeCircle } from "@styled-icons/material";
import { CheckmarkDoneCircle } from "@styled-icons/ionicons-solid";
import { CancelOutline } from "@styled-icons/typicons";

import { TextField } from "@material-ui/core";

export const Input = styled(TextField)`
  & ${"#input-with-icon-textfield"} {
    width: 200px;
  }
`;

export const Change = styled(ChangeCircle)`
  width: 20px;
  &:hover {
    cursor: pointer;
    color: #347285;
  }
`;

export const Done = styled(CheckmarkDoneCircle)`
  width: 22px;
  &:hover {
    cursor: pointer;
    color: green;
  }
`;

export const Cancel = styled(CancelOutline)`
  width: 24px;
  &:hover {
    cursor: pointer;
    color: red;
  }
`;

export const Container = styled.div`
  width: 220px;
  position: relative;
`;

export const Suggests = styled.div`
  width: 220px;
  background-color: white;
  position: absolute;
  z-index: 1;
`;

export const Suggest = styled.div`
  margin-top: 5px;
  text-align: left;
  padding-left: 5px;
  &:hover {
    cursor: pointer;
    background-color: #d7cdcc;
  }
  z-index: 2;
`;
