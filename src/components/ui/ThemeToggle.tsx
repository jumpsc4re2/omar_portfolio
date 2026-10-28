"use client";

import { useEffect, useSyncExternalStore } from "react";
import { LuMoon, LuSun } from "react-icons/lu";
import type { Theme } from "@/config/site";
import { applyTheme, readTheme, subscribeToTheme, syncThemeColor } from "@/lib/theme";

/**
 * Sun/moon button. The icons swap with a turn driven by CSS on <html data-theme>, so the
 * right one shows before hydration; the switch itself cross-fades via View Transitions.
 */
export function ThemeToggle() {
  const theme = useSyncExternalStore<Theme>(subscribeToTheme, readTheme, () => "dark");
  const next: Theme = theme === "dark" ? "light" : "dark";

  useEffect(() => syncThemeColor(theme), [theme]);

  const toggle = () => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || reducedMotion) applyTheme(next);
    else document.startViewTransition(() => applyTheme(next));
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${next} theme`}
      className="grid size-7 shrink-0 place-items-center rounded-full border border-ink/20 text-ink transition-colors duration-500 ease-premium hover:border-ink/60 hover:bg-ink/[0.04] min-[360px]:size-8 sm:size-9"
    >
      <LuSun aria-hidden className="theme-icon theme-icon-sun size-4" />
      <LuMoon aria-hidden className="theme-icon theme-icon-moon size-4" />
    </button>
  );
}
