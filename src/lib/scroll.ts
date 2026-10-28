import { easeInOut } from "@/lib/motion";

const INTERRUPTIONS = ["wheel", "touchstart", "keydown"] as const;

let cancelActive: (() => void) | undefined;

/**
 * Glides the window to the top, easing in and out over a duration that grows with the
 * distance. Wheel, touch or key input hands control straight back to the user.
 * Jumps instantly when the user prefers reduced motion.
 */
export function scrollToTop(onArrive?: () => void) {
  cancelActive?.();
  const from = window.scrollY;

  if (from <= 0 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.scrollTo({ top: 0, behavior: "instant" });
    onArrive?.();
    return;
  }

  const duration = Math.min(700 + from * 0.15, 1600);
  const start = performance.now();
  let frame = 0;

  const stop = () => {
    cancelAnimationFrame(frame);
    INTERRUPTIONS.forEach((type) => window.removeEventListener(type, stop));
    cancelActive = undefined;
  };

  const step = (now: number) => {
    const progress = Math.min((now - start) / duration, 1);
    // "instant" bypasses the CSS smooth scrolling so each frame lands exactly.
    window.scrollTo({ top: from * (1 - easeInOut(progress)), behavior: "instant" });
    if (progress < 1) {
      frame = requestAnimationFrame(step);
    } else {
      stop();
      onArrive?.();
    }
  };

  INTERRUPTIONS.forEach((type) => window.addEventListener(type, stop, { passive: true }));
  cancelActive = stop;
  frame = requestAnimationFrame(step);
}
