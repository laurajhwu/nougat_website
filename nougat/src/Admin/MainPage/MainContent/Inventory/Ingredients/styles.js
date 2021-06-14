import styled from "styled-components";
import { Table, Popover } from "react-bootstrap";
import {
  DeleteOff,
  Delete,
  AddSquare,
} from "@styled-icons/fluentui-system-filled";
import { Notepad, Edit } from "@styled-icons/boxicons-regular/";

export const Search = styled.div`
  margin-top: 10px;
`;

export const ProductsTable = styled(Table)`
  margin-top: 20px;
`;

export const Th = styled.th`
  padding: 10px 5px !important;
  text-align: center;
  vertical-align: middle !important;
  max-width: 150px;
  min-width: 100px;

  &:first-child {
    max-width: 60px;
    min-width: 50px;
  }
`;

export const Thead = styled.thead``;

export const Tbody = styled.tbody``;

export const Tr = styled.tr`
  width: 100%;
  & td {
    text-align: center;
    padding: 10px 5px !important;
    vertical-align: middle;
    position: relative;
  }

  &:last-child td {
    text-align: right;
  }
`;

export const PopoverContent = styled(Popover.Content)`
  height: auto;
`;

export const DisableRemove = styled(DeleteOff)`
  width: 20px;
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

export const Notes = styled(Notepad)`
  width: 24px;
  &:hover {
    cursor: pointer;
  }
`;

export const HasNote = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #820933;
  position: absolute;
  left: 53%;
  bottom: 7px;
`;

export const UpdateIcon = styled(Edit)`
  width: 24px;
  &:hover {
    cursor: pointer;
  }
`;

export const Add = styled(AddSquare)`
  width: 24px;
  margin-left: 12px;
  &:hover {
    cursor: pointer;
  }
`;
