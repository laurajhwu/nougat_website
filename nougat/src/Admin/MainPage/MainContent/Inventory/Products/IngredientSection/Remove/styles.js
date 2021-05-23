import styled from "styled-components";
import { Form } from "react-bootstrap";
import { Delete } from "@styled-icons/typicons";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

export const RemoveIcon = styled(Delete)`
  vertical-align: middle;
  width: 24px;
  &:hover {
    cursor: pointer;
    transform: rotate(90deg);
  }
`;

export const RemoveContainer = styled(Form.Group)`
  display: flex;
  justify-content: center;
  align-items: center;
`;
