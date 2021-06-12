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

export const Hamburger = styled.div`
  display: none;

  @media only screen and (max-width: 760px) {
    display: unset;
    &:hover {
      cursor: pointer;
    }
  }
`;

export const Nav = styled.nav`
  height: 70px;
  display: flex;
  align-items: center;
  margin-left: 110px;
  padding: 0 50px;
  border-radius: 50px;
  background-color: #efe6e8;
  position: relative;
  & > * {
    margin-left: 50px;
    font-size: 45px;
    font-weight: 700;
    transition: transform 0.2s;
    color: #ad6495;
    font-family: lotus;

    @media only screen and (max-width: 960px) {
      font-size: 40px;
    }
    @media only screen and (max-width: 760px) {
      &.products-nav,
      &.contact-nav {
        font-size: 40px;
        position: absolute;
        background-color: #efe6e8;
        line-height: 60px;
        padding: 0 10px;
        left: 0px;
        display: none;
        opacity: 0;
        &:hover {
          transform: scale(1) !important;
          text-decoration: underline;
        }
      }

      &.products-nav {
        top: 70px;
      }
      &.contact-nav {
        top: 130px;
        border-radius: 0 0 20px 20px;
      }
    }

    @media only screen and (max-width: 500px) {
      &.products-nav,
      &.contact-nav {
        left: 20px;
      }

      &.products-nav {
        top: 50px;
      }
      &.contact-nav {
        top: 110px;
      }

      margin-left: 20px;
      &:first-child {
        margin-left: 50px;
      }
    }
  }

  @media only screen and (max-width: 500px) {
    height: 50px;
    margin-left: 50px;
    padding: 0 30px;
    width: auto;
  }

  & > *:hover {
    transform: scale(1.2) !important;
    color: #ad6495;
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
  z-index: 2;
  border: 5px solid #e7dadc;

  @media only screen and (max-width: 500px) {
    width: 120px;
    top: 15px;
  }
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
  color: #ad6495;
  @media only screen and (max-width: 960px) {
    font-size: 26px;
  }
`;

export const MemberIcon = styled.i`
  font-size: 32px;
  color: #ad6495;
  @media only screen and (max-width: 960px) {
    font-size: 30px;
  }
`;

export const Bubble = styled.div`
  position: absolute;
  font-size: 20px;
  background-color: #bba0b2;
  color: #fff;
  top: 5px;
  right: 2px;
  width: 40px;
  height: 40px;
  font-weight: 600;
  display: none;
`;
