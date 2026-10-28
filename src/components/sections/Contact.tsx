import { BackToTop } from "@/components/ui/BackToTop";
import { Container } from "@/components/ui/Container";
import { CopyEmailButton } from "@/components/ui/CopyEmailButton";
import { CurrentYear, LiveClock } from "@/components/ui/LiveClock";
import { PillLink } from "@/components/ui/Pill";
import { siteConfig } from "@/config/site";
import { contact } from "@/content/contact";

export function Contact() {
  return (
    <footer id="contact" aria-labelledby="contact-heading" data-autopause data-defer-font className="border-t border-line">
      <Container className="pb-16 pt-24 md:pb-20 md:pt-36">
        <h2
          id="contact-heading"
          data-reveal
          className="text-balance font-display text-[clamp(3.25rem,0.6rem+8.6vw,9.75rem)] font-extrabold leading-[0.9] tracking-[-0.045em]"
        >
          {contact.headline.bold}{" "}
          <span className="font-serif text-[1.08em] font-normal italic tracking-[-0.025em]">
            {contact.headline.italic}
          </span>
        </h2>

        <div className="mt-12 flex flex-col gap-12 md:mt-16 md:flex-row md:items-end md:justify-between">
          <div data-reveal style={{ "--reveal-delay": "80ms" }}>
            <p className="max-w-[44ch] text-[clamp(1rem,0.95rem+0.25vw,1.1875rem)] leading-relaxed text-muted">
              {contact.availability}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <CopyEmailButton email={siteConfig.email} copiedMessage={contact.copiedMessage} />
              {contact.links.map((link) => (
                <PillLink key={link.label} href={link.href} external variant="outline">
                  {link.label}
                </PillLink>
              ))}
            </div>
          </div>
          <BackToTop
            label={contact.backToTop.label}
            ringText={contact.backToTop.ringText}
            className="self-end"
          />
        </div>
      </Container>

      <div className="border-t border-line">
        <Container className="grid gap-3 py-6 font-mono text-[11px] uppercase tracking-[0.16em] text-muted md:grid-cols-3 md:items-center">
          <p>
            © <CurrentYear /> {siteConfig.name}
          </p>
          <div className="md:justify-self-center">
            <LiveClock timeZone={siteConfig.location.timeZone} label={contact.clockLabel} />
          </div>
          <p className="md:text-right">{contact.builtWith}</p>
        </Container>
      </div>
    </footer>
  );
}
