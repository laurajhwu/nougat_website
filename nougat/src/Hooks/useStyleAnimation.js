import { useCallback } from "react";

export default function useStyleAnimation(animation) {
  return useCallback((ref) => {
    if (ref) {
      animation(ref);
    }
  }, []);
}
