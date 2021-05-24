import styled from "styled-components";
import { Table } from "react-bootstrap";
import {
  DeleteOff,
  Delete,
  AddSquare,
} from "@styled-icons/fluentui-system-filled";
import { Detail, Edit } from "@styled-icons/boxicons-regular/";

export const ProductsTable = styled(Table)`
  margin-top: 30px;
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
  }

  &:last-child td {
    text-align: right;
  }
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

export const Details = styled(Detail)`
  width: 24px;
  &:hover {
    cursor: pointer;
  }
`;

export const UpdateIcon = styled(Edit)`
  width: 24px;
  &:hover {
    cursor: pointer;
  }
`;

export const Add = styled(AddSquare)`
  width: 24px;
  &:hover {
    cursor: pointer;
  }
`;
