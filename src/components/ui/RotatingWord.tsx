"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "@/hooks/useInView";
import { usePageVisible } from "@/hooks/usePageVisible";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type RotatingWordProps = {
  phrases: string[];
  intervalMs?: number;
};

/**
 * Outlined pill that cycles through phrases with a vertical slide while its width eases
 * to fit the next phrase. Purely visual: the parent h1 carries the accessible text.
 */
export function RotatingWord({ phrases, intervalMs = 2400 }: RotatingWordProps) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();
  const pageVisible = usePageVisible();
  const inView = useInView(rootRef);
  // Phrase widths in em, so they stay correct as the fluid font size changes.
  const [widths, setWidths] = useState<number[] | null>(null);
  const [cycle, setCycle] = useState({ current: 0, previous: -1 });

  // Measure once fonts are ready, and again when the column resizes: optical sizing makes
  // glyph widths (in em) vary slightly with the font size.
  useEffect(() => {
    const root = rootRef.current;
    const column = root?.parentElement;
    if (!root || !column) return;

    const measure = () => {
      const fontSize = parseFloat(getComputedStyle(root).fontSize);
      const items = root.querySelectorAll<HTMLElement>("[data-rotator-item]");
      const next = Array.from(items, (item) => item.offsetWidth / fontSize);
      setWidths((prev) =>
        prev?.every((width, index) => Math.abs(width - next[index]) < 0.001) ? prev : next,
      );
    };

    let cancelled = false;
    const observer = new ResizeObserver(measure);
    document.fonts.ready.then(() => {
      if (cancelled) return;
      measure();
      observer.observe(column);
    });
    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, []);

  const running = !reducedMotion && pageVisible && inView && widths !== null;

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => {
      setCycle(({ current }) => ({ current: (current + 1) % phrases.length, previous: current }));
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [running, intervalMs, phrases.length]);

  const current = reducedMotion ? 0 : cycle.current;
  const previous = reducedMotion ? -1 : cycle.previous;

  return (
    <span
      ref={rootRef}
      className="rotator"
      style={
        widths
          ? {
              width: `calc(${widths[current]}em + 2 * var(--rotator-pad) + 2 * var(--rotator-border))`,
              "--rotator-max": Math.max(...widths),
            }
          : undefined
      }
    >
      {/* In-flow copy of the first phrase: sizes the pill before JS and sets its height. */}
      <span className="invisible whitespace-nowrap">{phrases[0]}</span>
      {phrases.map((phrase, index) => (
        <span
          key={phrase}
          data-rotator-item
          data-state={index === current ? "active" : index === previous ? "exit" : "idle"}
          className="rotator-item"
        >
          {phrase}
        </span>
      ))}
    </span>
  );
}
