import styled from "styled-components";
import { PeopleCircle } from "@styled-icons/ionicons-sharp";
import { ShoppingCart } from "@styled-icons/remix-fill";

export const Container = styled.header`
  display: flex;
  padding: 10px 0 10px 20px;
  background: rgb(194, 61, 102);
  background: linear-gradient(
    90deg,
    rgba(194, 61, 102, 1) 0%,
    rgba(218, 130, 158, 1) 16%,
    rgba(227, 145, 149, 1) 47%,
    rgba(247, 191, 229, 1) 76%,
    rgba(241, 232, 238, 1) 100%
  );
  align-items: center;
  position: fixed;
  width: 100%;
  height: 160px;
`;

export const Nav = styled.nav`
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  margin-left: 140px;
  padding-left: 50px;
  & > * {
    margin-left: 50px;
    font-size: 24px;
    color: #efdef7;
    transition: transform 0.2s;
  }

  & > *:hover {
    color: #025068;
    transform: scale(1.2);
  }
`;

export const Logo = styled.img`
  width: 160px;
  border-radius: 50%;
  &:hover {
    cursor: pointer;
  }
  position: absolute;
  top: 6px;
`;

export const CartIcon = styled(ShoppingCart)`
  width: 32px;
`;

export const MemberIcon = styled(PeopleCircle)`
  width: 32px;
`;
