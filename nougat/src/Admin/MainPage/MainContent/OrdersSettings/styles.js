import styled from "styled-components";

import { Modal } from "semantic-ui-react";

export const Container = styled.div`
  padding-top: 40px;
`;

export const Title = styled.div`
  border-right: 2px solid #99a4ad;
  ${".MuiTableCell-root"}:last-child > & {
    border-right: none;
  }
`;

export const DetailSection = styled(Modal)`
  width: 100% !important;
`;
