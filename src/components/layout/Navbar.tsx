import { NavLinks } from "@/components/layout/NavLinks";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { Container } from "@/components/ui/Container";
import { PillLink } from "@/components/ui/Pill";
import { ScrollTopLink } from "@/components/ui/ScrollTopLink";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { siteConfig } from "@/config/site";

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-canvas/60 backdrop-blur-md">
      <Container className="flex h-14 items-center justify-between gap-2 md:h-16">
        <ScrollTopLink
          className="shrink-0 rounded-sm font-display text-[13px] font-extrabold tracking-[-0.03em] transition-colors duration-500 ease-premium hover:text-accent min-[360px]:text-[14px] sm:text-[15px] md:text-lg"
        >
          {siteConfig.name}
        </ScrollTopLink>
        <nav aria-label="Primary">
          <NavLinks items={siteConfig.nav}>
            <li className="ml-0.5 min-[360px]:ml-1 sm:ml-2">
              <PillLink
                href={siteConfig.links.resume}
                external
                variant="outline"
                size="sm"
                className="h-8 gap-1 px-2 text-[13px] max-[359px]:[&>svg]:hidden min-[360px]:px-2.5 sm:h-9 sm:gap-1.5 sm:px-4 sm:text-sm"
              >
                Resume
              </PillLink>
            </li>
            <li className="ml-0.5 min-[360px]:ml-1 sm:ml-1.5">
              <ThemeToggle />
            </li>
          </NavLinks>
        </nav>
      </Container>
      <ScrollProgress />
    </header>
  );
}
