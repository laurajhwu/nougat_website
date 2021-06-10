import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { renderPage } from "../../redux/actions/renderPage";
// import LogoIcon from "../../images/logo.png";
import LogoIcon from "../../images/logo2.png";
import { gsap } from "gsap";
import ContactInfo from "./ContactUs";
import { Modal } from "semantic-ui-react";
import { useError } from "../../Hooks/useAlert";

import {
  Nav,
  Container,
  Logo,
  CartIcon,
  MemberIcon,
  ContactUs,
  ContactModal,
  Bubble,
} from "./styles";

function Header() {
  const dispatch = useDispatch();
  const member = useSelector((state) => state.member);
  const qtyDiff = useSelector((state) => state.qtyDiff);
  const [open, setOpen] = useState(false);
  const logoRef = useRef();
  const navRef = useRef();
  const errorAlert = useError("請先登入！");

  function clickMemberPage() {
    dispatch(renderPage());
  }

  function clickCheckoutPage(event) {
    if (!member) {
      event.preventDefault();
      errorAlert();
    }
  }

  function headerAnimation() {
    const tl = gsap.timeline({ defaults: { duration: 1 } });
    tl.from(logoRef.current, { y: -200, ease: "elastic.out" }).from(
      navRef.current.children,
      { y: -35, opacity: 0, ease: "circ.in", stagger: 0.2 }
    );
  }

  useEffect(() => {
    if (logoRef.current && window.location.pathname === "/") {
      headerAnimation();
    }
  }, [logoRef]);

  return (
    <Container>
      <Link to="/">
        <Logo src={LogoIcon} ref={logoRef} />
      </Link>
      <Nav ref={navRef}>
        {/* <Link to="/">首頁</Link> */}
        <Link to="/products">所有產品</Link>

        <Modal
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          trigger={<ContactUs>聯絡我們</ContactUs>}
          centered={false}
          size="mini"
          style={ContactModal}
          dimmer={{
            style: {
              "justify-content": "center",
              display: "flex",
              "align-items": "center",
            },
          }}
        >
          <ContactInfo handleClose={() => setOpen(false)} />
        </Modal>

        {/* <Link to="/event">特別活動</Link> */}
        <Link to="/member" onClick={clickMemberPage}>
          <MemberIcon className="fas fa-user-circle" />
        </Link>
        <Bubble id="qty-diff">
          {qtyDiff ? (qtyDiff >= 0 ? `+${qtyDiff}` : qtyDiff) : ""}
        </Bubble>
        <Link to="/cart" onClick={clickCheckoutPage}>
          <CartIcon className="fas fa-shopping-cart" id="cart-icon" />
        </Link>
      </Nav>
    </Container>
  );
}

export default Header;
