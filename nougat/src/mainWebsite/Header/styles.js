import styled from "styled-components";

export const Container = styled.header`
  display: flex;
  padding: 10px 0 10px 20px;
  background: transparent;
  align-items: center;
  position: fixed;
  width: 100%;
  height: 160px;
  opacity: 0.8;
  z-index: 1000;
`;

export const Nav = styled.nav`
  height: 70px;
  display: flex;
  align-items: center;
  margin-left: 110px;
  padding: 0 50px;
  border-radius: 50px;
  background-color: #fcefee;
  & > * {
    margin-left: 50px;
    font-size: 24px;
    font-weight: 700;
    line-height: 26px;
    transition: transform 0.2s;
    /* color: #7f7594; */
    background: #7f7594;
    background: -webkit-linear-gradient(
      to right,
      #7f7594 0%,
      #ad6495 50%,
      #b05d8c 50%,
      #7f7594 100%
    );
    background: -moz-linear-gradient(
      to right,
      #7f7594 0%,
      #ad6495 50%,
      #b05d8c 50%,
      #7f7594 100%
    );
    background: linear-gradient(
      to right,
      #7f7594 0%,
      #ad6495 50%,
      #b05d8c 50%,
      #7f7594 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  & > *:hover {
    transform: scale(1.2) !important;
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

export const ContactModal = {
  height: "auto",
  top: "auto",
  left: "auto",
  bottom: "auto",
  right: "auto",
};

export const ContactUs = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

export const CartIcon = styled.i`
  font-size: 28px;
  &::before {
    background: #ff9e9e;
    background: radial-gradient(
      circle farthest-corner at center center,
      #ff9e9e 0%,
      #775a94 50%,
      #048fba 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

export const MemberIcon = styled.i`
  font-size: 32px;
  &::before {
    background: #ff9e9e;
    background: radial-gradient(
      circle farthest-corner at center center,
      #ff9e9e 0%,
      #775a94 50%,
      #048fba 100%
    );

    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;
