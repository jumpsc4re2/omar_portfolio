"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useInView } from "@/hooks/useInView";
import { loadGsap } from "@/lib/gsap";

/**
 * Scroll-scrubs the experience timeline: each entry's line segment fills as it passes the
 * reading line, its dot lights up when reached and glows while current. GSAP loads only
 * when the section is near the viewport. Without JS or with reduced motion, the drawn
 * static state from CSS stays.
 */
export function TimelineMotion({ children, className }: { children: ReactNode; className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const near = useInView(rootRef, { rootMargin: "50% 0px", once: true });

  useEffect(() => {
    const root = rootRef.current;
    if (!near || !root) return;

    let revert: (() => void) | undefined;
    let cancelled = false;

    loadGsap().then(({ gsap, ScrollTrigger }) => {
      if (cancelled) return;
      const mm = gsap.matchMedia(root);
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        root.dataset.timeline = "animated";

        root.querySelectorAll<HTMLElement>("[data-timeline-entry]").forEach((entry) => {
          const fill = entry.querySelector("[data-timeline-fill]");
          const dot = entry.querySelector("[data-timeline-dot]");
          if (!fill || !dot) return;
          const range = { trigger: entry, start: "top 70%", end: "bottom 70%" };

          gsap.fromTo(fill, { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { ...range, scrub: 0.6 } });
          ScrollTrigger.create({
            ...range,
            onToggle: ({ isActive }) => dot.toggleAttribute("data-current", isActive),
            onEnter: () => dot.setAttribute("data-lit", ""),
            onLeaveBack: () => dot.removeAttribute("data-lit"),
          });
        });

        return () => {
          delete root.dataset.timeline;
          root.querySelectorAll("[data-timeline-dot]").forEach((dot) => {
            dot.removeAttribute("data-lit");
            dot.removeAttribute("data-current");
          });
        };
      });
      revert = () => mm.revert();
    });

    return () => {
      cancelled = true;
      revert?.();
    };
  }, [near]);

  return (
    <div ref={rootRef} className={className}>
      {children}
    </div>
  );
}
