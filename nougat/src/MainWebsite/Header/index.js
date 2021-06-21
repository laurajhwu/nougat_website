import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import UseAnimations from "react-useanimations";
import menu3 from "react-useanimations/lib/menu3";
import { renderPage } from "../../redux/actions/renderPage";
import ContactInfo from "./ContactUs";
import { useError } from "../../Hooks/useAlert";
import LogoIcon from "../../images/logo2.png";

import { Modal } from "semantic-ui-react";
import {
  Nav,
  Container,
  Logo,
  CartIcon,
  MemberIcon,
  ContactUs,
  ContactModal,
  Bubble,
  Hamburger,
} from "./styles";

function Header() {
  const dispatch = useDispatch();
  const member = useSelector((state) => state.member);
  const qtyDiff = useSelector((state) => state.qtyDiff);
  const [open, setOpen] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [vw, setVw] = useState(window.innerWidth);
  const logoRef = useRef();
  const navRef = useRef();
  const init = useRef(true);
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

  function hamburgerOnClick() {
    setShowNav(!showNav);
  }

  function handleNavAnimation() {
    const timeline = gsap.timeline({ defaults: { ease: "power1.inOut" } });
    if (showNav) {
      timeline
        .to(".products-nav, .contact-nav", { display: "block", duration: 0.1 })
        .to(".products-nav", { opacity: 1, duration: 0.3 })
        .to(".contact-nav", { opacity: 1, duration: 0.3 });
    } else {
      timeline
        .to(".products-nav, .contact-nav", {
          display: "none",
          opacity: 0,
          duration: 0.5,
        })
        .to(".products-nav, .contact-nav", {
          display: "none",
          duration: 0.1,
        });
    }
  }

  function handleWidthChange() {
    setVw(window.innerWidth);
  }

  function handleRWD() {
    if (vw <= 760) {
      handleNavAnimation();
      gsap.set(".products-nav, .contact-nav", {
        display: "none",
        opacity: 0,
      });
      gsap.set(".hamburger", {
        display: "block",
        opacity: 1,
      });
    } else {
      gsap.set(".products-nav, .contact-nav", {
        display: "block",
        opacity: 1,
      });
      gsap.set(".hamburger", {
        display: "none",
        opacity: 0,
      });
    }
  }

  useEffect(() => {
    if (logoRef.current && window.location.pathname === "/") {
      headerAnimation();
    }
  }, [logoRef]);

  useEffect(() => {
    if (!init.current) {
      handleRWD();
    }
  }, [showNav, vw]);

  useEffect(() => {
    window.addEventListener("resize", handleWidthChange);
    init.current = false;

    return () => window.removeEventListener("resize", handleWidthChange);
  }, []);

  return (
    <Container>
      <Link to="/">
        <Logo src={LogoIcon} ref={logoRef} />
      </Link>
      <Nav ref={navRef}>
        <UseAnimations
          animation={menu3}
          size={40}
          strokeColor="#ad6495"
          reverse={showNav}
          onClick={hamburgerOnClick}
          render={(eventProps, animationProps) => (
            <Hamburger {...eventProps} className="hamburger">
              <div {...animationProps} />
            </Hamburger>
          )}
        />

        <Link to="/products" className="products-nav">
          所有產品!
        </Link>

        <Modal
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          trigger={<ContactUs className="contact-nav">聯絡我們</ContactUs>}
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
