import React, { useRef, useEffect, useState } from "react";
import BowlImage from "../../../images/bowl.svg";
import WhiskImage from "../../../images/whisk.svg";
import NougatImage from "../../../images/nougat.svg";
import CandyImage from "../../../images/candy.svg";
import CookieImage from "../../../images/cookies.svg";
import { gsap } from "gsap";

import {
  Container,
  Bowl,
  Whisk,
  Animation,
  SplashArea,
  Nougat,
} from "./styles";

export default function LandingPage() {
  const timeline = gsap.timeline();
  const bowlRef = useRef();
  const whiskRef = useRef();
  const animationRef = useRef();

  function mixingAnimation() {
    const whiskTimeline = gsap.timeline({
      repeat: 1,
      defaults: { duration: 1, ease: "power1.inOut" },
    });
    const whiskScale = gsap.timeline({
      repeat: 1,
      defaults: { duration: 0.5 },
    });
    whiskTimeline
      .to(
        whiskRef.current,
        {
          xPercent: -120,
          rotation: -90,
        },
        "-=0.2"
      )
      .to(
        whiskRef.current,
        {
          xPercent: 0,
          rotation: 0,
        },
        "-=0.2"
      );
    whiskScale
      .to(
        whiskRef.current,
        {
          scale: 0.7,
        },
        "-=0.1"
      )
      .to(whiskRef.current, {
        scale: 1,
        y: -1,
      })
      .to(whiskRef.current, {
        scale: 1.3,
        y: -1,
      })
      .to(
        whiskRef.current,
        {
          scale: 1,
        },
        "-=0.1"
      );
    return gsap
      .timeline()
      .addLabel("mix")
      .add(whiskTimeline)
      .add(whiskScale, "mix");
  }

  function splashAnimation() {
    const bowlTl = gsap.timeline();

    bowlTl
      .addLabel("splash")
      .to(bowlRef.current, { y: 100, duration: 0.3 })
      .to(whiskRef.current, { y: 50, rotation: 90, duration: 0.3 }, "splash");

    return bowlTl;
  }

  useEffect(() => {
    timeline.add(mixingAnimation()).add(splashAnimation(), "+=0.1");
  }, [whiskRef]);

  return (
    <Container>
      <SplashArea>
        <Nougat src={NougatImage} />
      </SplashArea>
      <Animation ref={animationRef}>
        <Whisk src={WhiskImage} ref={whiskRef} />
        <Bowl src={BowlImage} ref={bowlRef} />
      </Animation>
    </Container>
  );
}
