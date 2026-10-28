import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { ExternalArrow } from "@/components/ui/Pill";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { about } from "@/content/about";
import { certificates, type Issuer } from "@/content/certificates";
import { javascriptFundamentals, skillGroups } from "@/content/skills";
import { publicAssetExists } from "@/lib/assets";

const subheadingClass = "font-display text-2xl font-extrabold tracking-[-0.035em] sm:text-[1.75rem]";

function Skills() {
  return (
    <div data-reveal className="mt-20 md:mt-24">
      <h3 className={subheadingClass}>{about.skillsHeading}</h3>
      <div className="mt-8 space-y-8">
        {skillGroups.map((group) => (
          <div key={group.title}>
            <h4 className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">{group.title}</h4>
            <ul role="list" className="mt-3.5 flex flex-wrap gap-2">
              {group.skills.map(({ name, icon: Icon, color }) => (
                <li
                  key={name}
                  className="group inline-flex items-center gap-2 rounded-full border border-line bg-ink/[0.02] py-1.5 pl-2.5 pr-3.5 text-sm text-ink/85 transition-colors duration-500 ease-premium hover:border-ink/20"
                  style={{ "--brand": color }}
                >
                  <Icon
                    aria-hidden
                    className="size-4 shrink-0 text-muted transition-colors duration-500 ease-premium group-hover:text-(--brand)"
                  />
                  {name}
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <h4 className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">{about.fundamentalsHeading}</h4>
          <ul role="list" className="mt-3.5 flex flex-wrap gap-1.5">
            {javascriptFundamentals.map((topic) => (
              <li key={topic} className="rounded-md border border-line px-2.5 py-1 text-[13px] text-ink/70">
                {topic}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/** Issuer logo on a paper tile. Multiply blending drops a logo's white background into the tile. */
function IssuerTile({ issuer }: { issuer: Issuer }) {
  return (
    <div className="grid size-14 shrink-0 place-items-center overflow-hidden rounded-xl border border-line bg-paper sm:size-16">
      {publicAssetExists(issuer.logo) ? (
        <Image src={issuer.logo} alt="" width={36} height={36} className="size-9 object-contain mix-blend-multiply" />
      ) : (
        <span aria-hidden className="font-display text-lg font-extrabold tracking-[-0.04em] text-paper-ink">
          {issuer.initials}
        </span>
      )}
    </div>
  );
}

function Certificates() {
  return (
    <div data-reveal className="mt-20 md:mt-24">
      <h3 className={subheadingClass}>{about.certificatesHeading}</h3>
      <ul role="list" className="mt-6 divide-y divide-line border-y border-line">
        {certificates.map((certificate) => (
          <li key={certificate.href} className="flex gap-4 py-6 sm:gap-6">
            <IssuerTile issuer={certificate.issuer} />
            <div className="min-w-0">
              <h4 className="text-[17px] font-medium leading-snug">
                <a
                  href={certificate.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/pill rounded-sm underline decoration-ink/0 underline-offset-4 transition-colors duration-500 ease-premium hover:text-accent hover:decoration-accent/60"
                >
                  {certificate.title}
                  <ExternalArrow className="ml-1 inline align-[-0.1em] text-muted" />
                  <span className="sr-only"> (opens the certificate in a new tab)</span>
                </a>
              </h4>
              <p className="mt-1.5 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm text-ink/70">
                <span>
                  {certificate.issuer.name}, {certificate.instructor}
                </span>
                <time dateTime={certificate.date.dateTime} className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                  {certificate.date.label}
                </time>
              </p>
              <p className="mt-2.5 max-w-[60ch] text-[15px] leading-relaxed text-muted">{certificate.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="py-24 md:py-32">
      <Container>
        <div className="lg:max-w-[58%]">
          <SectionHeader id="about-heading" label={about.label} title={about.heading} />
          <div
            data-reveal
            className="mt-8 max-w-[60ch] space-y-5 text-[clamp(1rem,0.95rem+0.2vw,1.125rem)] leading-relaxed text-muted"
            style={{ "--reveal-delay": "80ms" }}
          >
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <Skills />
          <Certificates />
        </div>
      </Container>
    </section>
  );
}
