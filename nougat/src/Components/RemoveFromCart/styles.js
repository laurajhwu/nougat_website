import styled from "styled-components";
// import { DeleteOutline } from "@styled-icons/typicons";
import { RemoveShoppingCart } from "@styled-icons/material";

export const DeleteIcon = styled(RemoveShoppingCart)((props) => ({
  ...{ width: "25px", "&:hover": { cursor: "pointer" } },
  ...props.styles,
}));
