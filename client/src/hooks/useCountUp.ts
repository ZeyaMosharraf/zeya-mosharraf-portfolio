import { useState, useEffect } from "react";

/**
 * useCountUp — hook to animate a numeric value from 0 to target.
 * Includes performance guard for mobile and cubic easing.
 */
export function useCountUp(target: number, duration = 2000, delay = 0) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    // Immediate completion on mobile to save battery/perf
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setValue(target);
      return;
    }

    const startTime = performance.now() + delay;
    let rafId: number;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      if (elapsed < 0) {
        rafId = requestAnimationFrame(tick);
        return;
      }

      const progress = Math.min(elapsed / duration, 1);
      
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));

      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [target, duration, delay]);

  return value;
}
