"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import type { NavItem } from "@/config/site";
import { cn } from "@/lib/cn";

type NavLinksProps = {
  items: NavItem[];
  /** Extra list items rendered after the links (the Resume pill). */
  children?: ReactNode;
};

/** Section links with scroll-spy: the link of the section crossing the upper middle of the viewport is active. */
export function NavLinks({ items, children }: NavLinksProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  // Re-run the spy after client-side navigation (e.g. from the 404 page back home).
  const pathname = usePathname();

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main section[id], footer[id]"));
    if (sections.length === 0) return;

    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        setActiveId(sections.findLast((section) => visible.has(section.id))?.id ?? null);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <ul role="list" className="flex items-center gap-0.5 sm:gap-1">
      {items.map((item) => {
        const active = item.sectionId === activeId;
        return (
          <li key={item.href}>
            <a
              href={item.href}
              aria-current={active ? "true" : undefined}
              className={cn(
                "relative block rounded-full px-1 py-1.5 text-[12.5px] min-[360px]:px-1.5 min-[360px]:text-[13px] transition-colors duration-500 ease-premium sm:px-3 sm:text-sm",
                active ? "text-ink" : "text-muted hover:text-ink",
              )}
            >
              {item.label}
              <span
                aria-hidden
                className={cn(
                  "absolute bottom-0 left-1/2 size-1 -translate-x-1/2 rounded-full bg-accent transition-[scale,opacity] duration-500 ease-premium",
                  active ? "scale-100 opacity-100" : "scale-0 opacity-0",
                )}
              />
            </a>
          </li>
        );
      })}
      {children}
    </ul>
  );
}
