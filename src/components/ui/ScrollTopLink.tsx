"use client";

import Link from "next/link";
import type { ComponentProps, MouseEvent } from "react";
import { scrollToTop } from "@/lib/scroll";

type ScrollTopLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  /** Move keyboard focus to the main content once the page reaches the top. */
  focusMain?: boolean;
};

/**
 * Link to the top of the homepage. On the homepage it glides there with an eased scroll
 * (and tidies the URL hash); on other pages it navigates home. Without JS it is a plain
 * link to /#top.
 */
export function ScrollTopLink({ focusMain = false, onClick, ...props }: ScrollTopLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    const modified = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0;
    if (event.defaultPrevented || modified || !document.getElementById("top")) return;

    event.preventDefault();
    window.history.replaceState(window.history.state, "", window.location.pathname + window.location.search);
    scrollToTop(() => {
      if (focusMain) document.getElementById("main")?.focus({ preventScroll: true });
    });
  };

  return <Link href="/#top" onClick={handleClick} {...props} />;
}
