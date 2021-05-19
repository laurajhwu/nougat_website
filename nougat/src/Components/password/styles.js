import styled from "styled-components";
import { EyeSlash, EyeFill } from "@styled-icons/bootstrap";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Input = styled.input`
  border: 1px solid black;
  border-color: ${(props) => (props.notValid ? "red" : "black")};
`;

export const NoShow = styled(EyeSlash)`
  color: #d7cdcc;
  width: 20px;
  &:hover {
    cursor: pointer;
  }
`;

export const Show = styled(EyeFill)`
  color: #d7cdcc;
  width: 20px;
  &:hover {
    cursor: pointer;
  }
`;
