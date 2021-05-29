import styled from "styled-components";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";

export const Container = styled.div`
  padding-top: 40px;
`;

export const Title = styled.div`
  /* height: 20px; */
  border-right: 2px solid #99a4ad;
  ${".MuiTableCell-root"}:last-child > & {
    border-right: none;
  }
`;
