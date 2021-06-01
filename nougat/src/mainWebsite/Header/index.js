import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { renderPage } from "../../redux/actions/renderPage";
import LogoIcon from "../../images/logo.png";

import { Nav, Container, Logo, CartIcon, MemberIcon } from "./styles";

function Header() {
  const dispatch = useDispatch();
  const member = useSelector((state) => state.member);

  function clickMemberPage() {
    dispatch(renderPage());
  }

  function clickCheckoutPage(event) {
    if (Object.keys(member).length === 0) {
      event.preventDefault();
      alert("請先登入！");
    }
  }

  return (
    <Container>
      <Link to="/">
        <Logo src={LogoIcon} />
      </Link>
      <Nav>
        <Link to="/">首頁</Link>
        <Link to="/products">所有產品</Link>
        <Link to="/contact">聯絡我們</Link>
        {/* <Link to="/event">特別活動</Link> */}
        <Link to="/member" onClick={clickMemberPage}>
          <MemberIcon />
        </Link>
        <Link to="/cart" onClick={clickCheckoutPage}>
          <CartIcon />
        </Link>
      </Nav>
    </Container>
  );
}

export default Header;
