import styled from "styled-components";
import { CartPlus, CartPlusFill, CartX } from "@styled-icons/bootstrap";

export const Add = styled.div`
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  &:hover {
    cursor: pointer;
  }
`;

export const CartPlusIcon = styled(CartPlus)`
  width: 25px;
`;
export const CartPlusFillIcon = styled(CartPlusFill)`
  width: 25px;
`;
export const CartDisableIcon = styled(CartX)`
  width: 25px;
`;

export const CartButton = styled.button``;
