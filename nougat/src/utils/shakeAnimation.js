import { gsap } from "gsap";

export default function shakeAnimation(ref) {
  return gsap
    .timeline()
    .to(ref, { rotation: -5, duration: 0.025 })
    .to(ref, { rotation: 0, duration: 0.025 })
    .to(ref, { rotation: 5, duration: 0.025 })
    .to(ref, { rotation: 0, duration: 0.025 });
}
