import React, { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import BGImage from "../../../images/landing-page-bg.jpg";
import BowlImage from "../../../images/bowl.svg";
import WhiskImage from "../../../images/whisk.svg";
import NougatImage from "../../../images/nougat.svg";
import CandyImage from "../../../images/candy.svg";
import CookieImage from "../../../images/cookies.svg";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import Loading from "../../../Components/LoadingPage";

import {
  Container,
  Bowl,
  Whisk,
  Animation,
  SplashArea,
  Nougat,
  Candy,
  Cookie,
  Product,
  About,
  AboutContent,
  Slogan,
  MoreInfo,
} from "./styles";

gsap.registerPlugin(MotionPathPlugin);

export default function LandingPage() {
  const history = useHistory();
  const products = useSelector((state) => state.products);
  const timeline = gsap.timeline();
  const bgRef = useRef();
  const sloganRef = useRef();
  const moreRef = useRef();
  const bowlRef = useRef();
  const whiskRef = useRef();
  const animationRef = useRef();
  const splashItems = useRef();

  function handleMoreInfo() {
    history.push("/products");
  }

  function getRandomNum(min, max) {
    return Math.ceil(Math.random() * (max - min)) + min;
  }
  function getRandomNumArray(min, max) {
    const num = getRandomNum(min, max);
    const arr = [];
    for (let i = 0; i < num; i++) {
      arr.push(i);
    }
    return arr;
  }

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
      .to("body", { backgroundColor: "#d6cfde", ease: "power1.in" }, "-=1")
      .from(animationRef.current, { opacity: 0, duration: 1.5 }, "-=1.5")
      .addLabel("mix")
      .add(whiskTimeline, "mix")
      .add(whiskScale, "mix");
  }

  function splashItemsAnimation() {
    const areaWidth = splashItems.current.clientWidth;
    const areaHeight = splashItems.current.clientHeight;
    const bowlWidth = bowlRef.current.offsetWidth || 400;
    const bowlHeight = bowlRef.current.offsetHeight || 400;
    let index = 0;

    return Array.from(splashItems.current.children).map((item) => {
      if (index % 2 === 0) {
        index = 1;
      } else {
        index = 0;
      }
      const x = [
        getRandomNum(-areaWidth / 2 + 20, -bowlWidth / 2 - 10),
        getRandomNum(bowlWidth / 2 + 10, areaWidth / 2 - 20),
      ][index];

      const y = getRandomNum(-areaHeight + 20, -bowlHeight - 30);
      return gsap
        .timeline()
        .add("start")
        .to(
          item,
          {
            duration: 6,
            ease: "bounce.out",
            rotation: getRandomNum(-360, 360),
            motionPath: {
              curviness: 1,
              path: [
                { x: x / 2, y: y },
                { x: x, y: 0 },
              ],
            },
          },
          `+=${getRandomNum(0, 0.5)}`
        )
        .to(item, { opacity: 1, duration: 0.1 }, "start+=1.5")
        .to(item, { opacity: 0, duration: 1 });
    });
  }

  function splashAnimation() {
    const splashTl = gsap.timeline();

    splashTl
      .addLabel("splash")
      .to(bowlRef.current, { y: 100, duration: 0.5 })
      .to(
        whiskRef.current,
        { y: 50, rotation: 90, duration: 0.5, ease: "power1.out" },
        "splash"
      )
      .add(splashItemsAnimation(), "splash-=1.5");

    return splashTl;
  }

  function removeBowlWhisk() {
    return gsap
      .timeline()
      .addLabel("remove")
      .to(bowlRef.current, { y: 500, duration: 2, opacity: 0 })
      .to(
        whiskRef.current,
        { rotation: 180, duration: 2, opacity: 0 },
        "remove"
      )
      .to(animationRef.current, { display: "none", duration: 0.1 });
  }

  function fadeInBg() {
    return gsap
      .timeline()
      .to("body", { backgroundColor: "#fff", ease: "power1.out" }, "-=1")
      .to(
        bgRef.current,
        { opacity: 1, ease: "power2.in", duration: 1.5 },
        ">-0.5"
      )
      .from(
        sloganRef.current.children,
        { opacity: 0, ease: "slow.in", duration: 1.5, stagger: 0.1 },
        "+=0.5"
      )
      .from(
        moreRef.current,
        {
          opacity: 0,
          scale: 1.1,
          duration: 1,
          ease: "back.out",
        },
        "-=0.5"
      );
  }

  useEffect(() => {
    if (products.length !== 0) {
      timeline
        .add(mixingAnimation())
        .add(splashAnimation(), ">-2")
        .add(removeBowlWhisk(), "<2.5")
        .add(fadeInBg(), "<1.7")
        .to(bgRef.current, { "z-index": 1, duration: 0.1 });
    }
  }, [products]);

  if (products.length !== 0) {
    return (
      <Container>
        <About url={BGImage} ref={bgRef}>
          <AboutContent>
            <Slogan ref={sloganRef}>
              <div>用</div>
              <div>心</div>
              <div>の</div>
              <div>點</div>
              <div>心</div>
              <div></div>
              <div></div>
              <div>品</div>
              <div>嚐</div>
              <div>手</div>
              <div>工</div>
              <div>の</div>
              <div>清</div>
              <div>新</div>
            </Slogan>
            <MoreInfo onClick={handleMoreInfo} ref={moreRef}>
              查看更多
            </MoreInfo>
          </AboutContent>
        </About>
        <SplashArea ref={splashItems}>
          {products.map((product) => (
            <Product key={product.id} url={product.image}></Product>
          ))}
          {getRandomNumArray(5, 7).map((value) => (
            <Nougat key={`nougat${value}`} src={NougatImage} />
          ))}
          {getRandomNumArray(3, 5).map((value) => (
            <Candy key={`candy${value}`} src={CandyImage} />
          ))}
          {getRandomNumArray(2, 4).map((value) => (
            <Cookie key={`cookie${value}`} src={CookieImage} />
          ))}
        </SplashArea>
        <Animation ref={animationRef}>
          <Whisk src={WhiskImage} ref={whiskRef} />
          <Bowl src={BowlImage} ref={bowlRef} />
        </Animation>
      </Container>
    );
  } else {
    return <Loading />;
  }
}
