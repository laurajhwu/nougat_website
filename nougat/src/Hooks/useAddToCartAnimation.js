import { useCallback } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import cartTitleAnimation from "../utils/shakeAnimation";

gsap.registerPlugin(ScrollToPlugin);

export default function useAddToCartAnimation(event, refs, showCart) {
  const ref = useCallback(
    (node) => {
      if (node !== null && refs.imageRef.current) {
        const imageRef = refs.imageRef.current;
        const { cartRef, productsRef } = refs;
        const rect = node.getBoundingClientRect();
        const productRect = imageRef.getBoundingClientRect();
        const cartRect = cartRef.children[0].getBoundingClientRect();

        gsap
          .timeline()
          .to(imageRef, {
            visibility: "visible",
            duration: 0.1,
            y: -productsRef.scrollTop - productRect.height / 15,
            x: -productRect.width / 50,
          })
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
          .add(showCart, "-=0.25")
          .add(cartTitleAnimation(cartRef.children[0]), "-=0.25")
          .to(cartRef, {
            duration: 0.3,
            scrollTo: rect.bottom - cartRect.bottom,
            ease: "power1.inOut",
          })
          .to(node, { opacity: 1, duration: 0.5, ease: "power1.in" })
          .set(imageRef, { scale: 1, x: 0, y: 0, visibility: "hidden" });
      }

      refs.imageRef.current = null;
    },
    [event]
  );
  return ref;
}
