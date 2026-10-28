"use client";

import { useEffect, useRef } from "react";
import { LuArrowUpRight } from "react-icons/lu";

/** Gap between the pointer and the pill's top-left corner. */
const OFFSET = 18;
/** Share of the remaining distance closed per 60fps frame; lower trails further behind. */
const SMOOTHING = 0.2;
/** Closest the pill may sit to the viewport edge. */
const EDGE = 12;

/**
 * A pill that trails the mouse over any element with a `data-cursor` label (the project
 * images), saying where a click leads. One shared element, eased toward the pointer by a
 * requestAnimationFrame loop that only runs while it is catching up. Mouse only: touch
 * users get a static label on the image instead.
 */
export function CursorPill() {
  const pillRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const pill = pillRef.current;
    const label = labelRef.current;
    if (!pill || !label) return;

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const position = { x: 0, y: 0 };
    const goal = { x: 0, y: 0 };
    let pointer: { x: number; y: number } | null = null;
    let target: Element | null = null;
    let frame = 0;
    let lastTime = 0;

    const place = () => {
      pill.style.transform = `translate3d(${position.x}px, ${position.y}px, 0)`;
    };

    // Below and right of the pointer, but never past the viewport edges.
    const aim = () => {
      if (!pointer) return;
      goal.x = Math.min(pointer.x + OFFSET, window.innerWidth - pill.offsetWidth - EDGE);
      goal.y = Math.min(pointer.y + OFFSET, window.innerHeight - pill.offsetHeight - EDGE);
    };

    const tick = (now: number) => {
      // Frame-rate independent easing, so it feels the same at 60Hz and 120Hz.
      const step = reducedMotion.matches ? 1 : 1 - (1 - SMOOTHING) ** ((now - lastTime) / (1000 / 60));
      lastTime = now;
      position.x += (goal.x - position.x) * step;
      position.y += (goal.y - position.y) * step;
      place();
      const settled = Math.abs(goal.x - position.x) < 0.1 && Math.abs(goal.y - position.y) < 0.1;
      frame = settled ? 0 : requestAnimationFrame(tick);
    };

    const follow = () => {
      if (frame) return;
      lastTime = performance.now();
      frame = requestAnimationFrame(tick);
    };

    const setTarget = (next: Element | null) => {
      if (next !== target) {
        const appearing = target === null;
        target = next;
        pill.toggleAttribute("data-visible", next !== null);
        if (!next) return;
        label.textContent = next.getAttribute("data-cursor");
        aim();
        if (appearing) {
          // Appear at the pointer instead of flying in from wherever it last faded out.
          position.x = goal.x;
          position.y = goal.y;
          place();
        }
      } else if (next) {
        aim();
      }
      if (next) follow();
    };

    const closestLabelled = (element: Element | null) => element?.closest("[data-cursor]") ?? null;

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || !finePointer.matches) return;
      pointer = { x: event.clientX, y: event.clientY };
      setTarget(closestLabelled(event.target instanceof Element ? event.target : null));
    };

    // Scrolling moves images under a still pointer without firing pointermove.
    const onScroll = () => {
      if (pointer) setTarget(closestLabelled(document.elementFromPoint(pointer.x, pointer.y)));
    };

    const onLeave = () => {
      pointer = null;
      setTarget(null);
    };

    document.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
    };
  }, []);

  return (
    <div
      ref={pillRef}
      aria-hidden
      className="cursor-pill pointer-events-none fixed left-0 top-0 z-[60] inline-flex h-10 items-center gap-1.5 whitespace-nowrap rounded-full bg-ink px-4 text-sm font-medium text-canvas shadow-[0_10px_30px_-10px_rgb(0_0_0/0.45)] [@media(hover:none)]:hidden"
    >
      <span ref={labelRef} />
      <LuArrowUpRight className="size-4" />
    </div>
  );
}
