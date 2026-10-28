"use client";

import { useEffect } from "react";

/** Sets `attribute` on each element matching `selector` the first time it comes within `rootMargin` of the viewport. */
function markOnce(selector: string, attribute: string, rootMargin: string) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.setAttribute(attribute, "");
        observer.unobserve(entry.target);
      }
    },
    { rootMargin },
  );
  document.querySelectorAll(selector).forEach((element) => observer.observe(element));
  return observer;
}

/**
 * Page-wide viewport observers:
 * - `[data-reveal]` / `[data-reveal-words]` get `data-revealed` on first entering the viewport (CSS animates it).
 * - `[data-defer-font]` gets `data-font-ready` a screen ahead, which switches it to the web serif font.
 * - `[data-autopause]` gets `data-paused` while off-screen, which pauses its infinite CSS animations.
 */
export function ViewportObserver() {
  useEffect(() => {
    const reveal = markOnce("[data-reveal], [data-reveal-words]", "data-revealed", "0px 0px -8% 0px");
    const fonts = markOnce("[data-defer-font]", "data-font-ready", "100% 0px");

    const pause = new IntersectionObserver((entries) => {
      for (const entry of entries) entry.target.toggleAttribute("data-paused", !entry.isIntersecting);
    });
    document.querySelectorAll("[data-autopause]").forEach((element) => pause.observe(element));

    return () => {
      reveal.disconnect();
      fonts.disconnect();
      pause.disconnect();
    };
  }, []);

  return null;
}
