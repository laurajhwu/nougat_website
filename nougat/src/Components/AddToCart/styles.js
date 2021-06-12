import styled from "styled-components";
import { CartPlus, CartPlusFill, CartX } from "@styled-icons/bootstrap";

export const Add = styled.div`
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  transition: all 0.5s;
  &:hover {
    cursor: pointer;
    transform: scale(1.1);
    color: #c44536;
  }
`;

export const CartPlusIcon = styled(CartPlus)`
  width: 30px;
`;
export const CartPlusFillIcon = styled(CartPlusFill)`
  width: 30px;
`;
export const CartDisableIcon = styled(CartX)`
  width: 30px;
`;

export const CartButton = styled.div`
  outline: none;
  padding-left: 5px;
  padding: 5px 5px 5px 0;
  letter-spacing: 7px;
  line-height: 40px;
  background-color: transparent;
  border: 3px solid #99a4ad;
  color: #b2777c;
  transition: all 0.5s;
  text-align: center;
  border-radius: 5px;
  &:hover {
    background-color: #99a4ad;
    border: 3px solid transparent;
    color: #f5f5f5;
    cursor: pointer;
  }
`;
