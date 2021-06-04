import React, { useCallback } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

export default function useAddToCartAnimation(event, refs) {
  function cartTitleAnimation(ref) {
    return gsap
      .timeline()
      .to(ref, { rotation: -5, duration: 0.025 })
      .to(ref, { rotation: 0, duration: 0.025 })
      .to(ref, { rotation: 5, duration: 0.025 })
      .to(ref, { rotation: 0, duration: 0.025 });
  }

  const ref = useCallback(
    (node) => {
      if (node !== null && refs.imageRef.current) {
        const imageRef = refs.imageRef.current;
        const cartRef = refs.cartRef;
        const rect = node.getBoundingClientRect();
        const productRect = imageRef.getBoundingClientRect();
        const cartRect = cartRef.children[0].getBoundingClientRect();

        console.log(rect.bottom, cartRect.top);
        gsap
          .timeline()
          .to(imageRef, {
            scale: 0.7,
            opacity: 1,
            duration: 0.5,
          })
          .to(imageRef, {
            y: cartRect.top - productRect.bottom + productRect.width / 2,
            opacity: 0.6,
            scale: 0.5,
            duration: 1,
          })
          .to(imageRef, {
            x: cartRect.right - productRect.left - productRect.width / 2,
            scale: 0,
            opacity: 0,
            duration: 0.7,
          })
          .add(cartTitleAnimation(cartRef.children[0]), "-=0.25")
          .to(cartRef, {
            duration: 0.3,
            scrollTo: rect.bottom - cartRect.bottom,
            ease: "power1.inOut",
          })
          .to(node, { opacity: 1, duration: 0.5, ease: "power1.in" })
          .set(imageRef, { scale: 1, x: 0, y: 0 });
      }

      refs.imageRef.current = null;
    },
    [event]
  );
  return ref;
}