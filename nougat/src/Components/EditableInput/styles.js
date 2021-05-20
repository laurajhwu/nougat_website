import styled from "styled-components";
import { PencilAlt } from "@styled-icons/fa-solid";
import { CheckCircleFill } from "@styled-icons/bootstrap";

export const Container = styled.div`
  display: flex;
`;

export const Input = styled.input``;

export const Text = styled.div``;

export const Edit = styled(PencilAlt)`
  width: 15px;
  &:hover {
    cursor: pointer;
  }
`;

export const Done = styled(CheckCircleFill)`
  width: 15px;
  &:hover {
    cursor: pointer;
  }
`;
