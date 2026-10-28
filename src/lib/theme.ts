import { siteConfig, type Theme } from "@/config/site";

export const THEME_STORAGE_KEY = "theme";

const { dark, light } = siteConfig.theme;

/** Accent and background custom properties for both themes, injected into <head>. */
export const themeColorsCss = `:root{--accent:${dark.accent};--canvas:${dark.background}}:root[data-theme="light"]{--accent:${light.accent};--canvas:${light.background}}`;

/** Runs in <head> before first paint: applies a saved theme. The server always renders dark. */
export const themeInitScript = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;

export function readTheme(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

/** Notifies when <html data-theme> changes (useSyncExternalStore subscriber). */
export function subscribeToTheme(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

/** Points the browser UI colour (<meta name="theme-color">) at the theme's background. */
export function syncThemeColor(theme: Theme) {
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", siteConfig.theme[theme].background);
}

/** Switches the theme and remembers the choice. */
export function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Storage can be unavailable (private mode); the theme still applies for this visit.
  }
}
