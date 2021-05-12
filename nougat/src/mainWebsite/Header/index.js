import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Nav = styled.nav`
  width: 500px;
  display: flex;
  justify-content: space-between;
`;

function Header() {
  return (
    <header>
      <Nav>
        <Link to="/">首頁</Link>
        <Link to="/products">所有產品</Link>
        <Link to="/contact">聯絡我們</Link>
        <Link to="/event">特別活動</Link>
        <Link to="/">
          <i class="far fa-user"></i>
        </Link>
        <Link to="/">
          <i class="fas fa-shopping-cart"></i>
        </Link>
      </Nav>
    </header>
  );
}

export default Header;
