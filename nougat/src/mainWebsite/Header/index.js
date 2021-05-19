import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { renderPage } from "../../redux/actions/renderPage";

const Nav = styled.nav`
  width: 500px;
  display: flex;
  justify-content: space-between;
`;

function Header() {
  const dispatch = useDispatch();
  const history = useHistory();
  const member = useSelector((state) => state.member);

  function clickMemberPage() {
    dispatch(renderPage());
  }

  function clickCheckoutPage() {
    if (Object.keys(member).length === 0) {
      alert("請先登入！");
      history.goBack();
    }
  }

  return (
    <header>
      <Nav>
        <Link to="/">首頁</Link>
        <Link to="/products">所有產品</Link>
        <Link to="/contact">聯絡我們</Link>
        <Link to="/event">特別活動</Link>
        <Link to="/member">
          <i onClick={clickMemberPage} class="far fa-user"></i>
        </Link>
        <Link to="/cart">
          <i onClick={clickCheckoutPage} class="fas fa-shopping-cart"></i>
        </Link>
      </Nav>
    </header>
  );
}

export default Header;
