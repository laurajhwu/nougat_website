import React, { useEffect, useRef } from "react";
import LogoImage from "../../images/logo.png";
import SnailImage from "../../images/snail.svg";
import { gsap } from "gsap";

import { Container, Logo, Snail, Dots, Dot } from "./styles";

export default function LoadingPage() {
  const logoRef = useRef();
  const dotsRef = useRef();
  const snailRef = useRef();
  const tl = gsap.timeline();

  function logoAnimation() {
    return gsap
      .timeline({ repeat: -1, yoyo: true, defaults: { ease: "power1.inOut" } })
      .to(logoRef.current, { yPercent: -20, duration: 1 })
      .to(logoRef.current, { yPercent: 0, duration: 0.5 });
  }

  function snailAnimation() {
    return gsap
      .timeline({
        repeat: -1,
        repeatDelay: 0.1,
      })
      .addLabel("start")
      .to(snailRef.current, {
        x: 270,
        duration: 5,
        // ease: "slow(0.1,0.1,false)",
        ease: "power2.out",
      })
      .to(
        dotsRef.current.children,
        { opacity: 1, duration: 4, stagger: 1 },
        "start"
      );
  }

  useEffect(() => {
    if (snailRef.current) {
      tl.addLabel("start").add(logoAnimation()).add(snailAnimation(), "start");
    }
  }, [snailRef]);

  return (
    <Container>
      <Logo src={LogoImage} ref={logoRef} />
      <Dots ref={dotsRef}>
        <Dot></Dot>
        <Dot></Dot>
        <Dot></Dot>
      </Dots>
      <Snail src={SnailImage} ref={snailRef} />
    </Container>
  );
}
