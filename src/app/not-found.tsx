import type { Metadata } from "next";
import { LuArrowLeft } from "react-icons/lu";
import { Container } from "@/components/ui/Container";
import { PillLink } from "@/components/ui/Pill";
import { SectionLabel } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <Container className="flex min-h-svh flex-col justify-center pb-20 pt-32">
        <SectionLabel>Error 404</SectionLabel>
        <h1 className="mt-6 max-w-[14ch] font-display text-[clamp(3.25rem,1rem+8vw,8.5rem)] font-extrabold leading-[0.9] tracking-[-0.045em]">
          This page doesn&apos;t exist.{" "}
          <span className="font-serif text-[1.08em] font-normal italic tracking-[-0.025em]">The rest of the site does.</span>
        </h1>
        <p className="mt-8 max-w-[44ch] leading-relaxed text-muted">
          The link may be old or mistyped. Head back to the homepage to see my work.
        </p>
        <div className="mt-10">
          {/* A plain anchor (full load) so the homepage's scroll effects initialise normally. */}
          <PillLink
            href="/"
            icon={
              <LuArrowLeft
                aria-hidden
                className="size-4 transition-transform duration-500 ease-premium group-hover/pill:-translate-x-0.5"
              />
            }
            className="flex-row-reverse"
          >
            Back to homepage
          </PillLink>
        </div>
      </Container>
    </main>
  );
}
