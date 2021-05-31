import styled from "styled-components";
import { EyeSlash, EyeFill } from "@styled-icons/bootstrap";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
`;

export const Input = styled.input`
  border: 1px solid black;
  border-color: ${(props) => (props.notValid ? "red" : "black")};
  height: ${(props) => props.theme.height};
  padding: ${(props) => props.theme.padding};
  font-size: ${(props) => props.theme["font-size"]};
  border-radius: ${(props) => props.theme["border-radius"]};
  width: ${(props) => props.theme.width};
  outline: none;
  /* background-color: transparent; */
`;

export const NoShow = styled(EyeSlash)`
  color: #d7cdcc;
  width: 20px;
  position: ${(props) => props.theme.position};
  right: ${(props) => props.theme.right};
  top: ${(props) => props.theme.top};
  width: ${(props) => props.theme.width};
  &:hover {
    cursor: pointer;
  }
`;

export const Show = styled(EyeFill)`
  color: #d7cdcc;
  width: 20px;
  position: ${(props) => props.theme.position};
  right: ${(props) => props.theme.right};
  top: ${(props) => props.theme.top};
  width: ${(props) => props.theme.width};
  &:hover {
    cursor: pointer;
  }
`;
