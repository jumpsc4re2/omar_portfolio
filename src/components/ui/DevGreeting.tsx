"use client";

import { useEffect } from "react";
import { siteConfig } from "@/config/site";

let greeted = false;

/** A hello in the console for anyone inspecting the page. */
export function DevGreeting() {
  useEffect(() => {
    if (greeted) return;
    greeted = true;
    console.log(
      `%cHey, curious about the code? Say hi: ${siteConfig.email}`,
      `font: 600 13px/1.6 ui-monospace, monospace; color: ${siteConfig.theme.dark.background}; background: ${siteConfig.theme.dark.accent}; padding: 6px 10px; border-radius: 6px;`,
    );
  }, []);

  return null;
}
