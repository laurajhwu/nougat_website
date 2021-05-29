import styled from "styled-components";
import { Location, Delete } from "@styled-icons/fluentui-system-filled";
import { List, ListItemText, ListItemSecondaryAction } from "@material-ui/core";

export const Container = styled.div`
  margin-left: 20px;
`;

export const Locations = styled(List)`
  max-height: 800px;
  overflow-y: scroll;
`;

export const Address = styled(ListItemText)`
  opacity: ${(props) => (props.active ? 1 : 0.7)};
`;

export const Action = styled(ListItemSecondaryAction)`
  min-width: 100px;
  margin-left: 10px;
`;

export const MarkerIcon = styled(Location)`
  width: 20px;
  max-width: 200px;
`;

export const DeleteIcon = styled(Delete)`
  width: 30px;
`;
