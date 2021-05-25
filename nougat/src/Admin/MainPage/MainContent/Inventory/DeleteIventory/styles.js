import styled from "styled-components";
import { DeleteOff, Delete } from "@styled-icons/fluentui-system-filled";

export const DisableRemove = styled(DeleteOff)`
  width: 20px;
  opacity: 0.5;
  &:hover {
    cursor: pointer;
  }
`;

export const EnableRemove = styled(Delete)`
  width: 24px;
  &:hover {
    cursor: pointer;
  }
`;
