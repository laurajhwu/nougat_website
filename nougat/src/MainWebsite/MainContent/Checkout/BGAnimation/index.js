import React, { useState, useEffect } from "react";
import propTypes from "prop-types";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useStyleAnimation from "../../../../Hooks/useStyleAnimation";

import { Design1, Design2, Design3 } from "./styles";

gsap.registerPlugin(ScrollTrigger);

export default function BGAnimation(props) {
  const { design } = props;
  const [vWidth, setVWidth] = useState();
  const design1Ref = useStyleAnimation(design1Animation);
  const design2Ref = useStyleAnimation(design2Animation);
  const design3Ref = useStyleAnimation(design3Animation);

  function handleWindowSizeChange() {
    setVWidth(window.innerWidth);
  }

  function design1Animation(ref) {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: ref,
          start: "top top",
          toggleActions: "restart reset resume restart",
        },
      })
      .from(ref, {
        opacity: 0,
        duration: 1,
        ease: "power1.in",
      });
  }

  function design2Animation(ref) {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: ref,
          start: "top 80%",
          end: "+=200",
          scrub: 0.5,
        },
      })
      .from(ref, { x: -500, opacity: 0, duration: 1.5, ease: "power1.in" });
  }

  function design3Animation(ref) {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: ref,
          start: "bottom 80%",
          end: "+=300",
          scrub: 0.5,
        },
      })
      .from(ref, {
        y: -500,
        x: 700,
        opacity: 0,
        duration: 2,
        ease: "power1.in",
      });
  }

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    handleWindowSizeChange();

    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  switch (design) {
    case "design1":
      return (
        <Design1 ref={design1Ref}>
          <div />
        </Design1>
      );
    case "design2":
      return <Design2 vw={vWidth} ref={design2Ref} />;
    case "design3":
      return <Design3 vw={vWidth} ref={design3Ref} />;
    default:
      return "";
  }
}

BGAnimation.propTypes = {
  design: propTypes.string,
};
