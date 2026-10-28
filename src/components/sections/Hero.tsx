import { LuArrowDown } from "react-icons/lu";
import { Container } from "@/components/ui/Container";
import { PaperNote } from "@/components/ui/PaperNote";
import { PillLink } from "@/components/ui/Pill";
import { PortraitCluster } from "@/components/ui/PortraitCluster";
import { RotatingWord } from "@/components/ui/RotatingWord";
import { siteConfig } from "@/config/site";
import { hero } from "@/content/hero";
import { publicAssetExists } from "@/lib/assets";

export function Hero() {
  const [roleNote, bioNote] = hero.notes;

  return (
    <section id="top" data-autopause className="relative">
      <Container className="grid items-center gap-x-10 gap-y-20 pb-20 pt-28 sm:pt-32 lg:min-h-svh lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] lg:pb-16 lg:pt-24 xl:gap-x-16">
        <div className="@container">
          <p
            className="intro inline-flex items-center gap-2.5 rounded-full border border-line bg-ink/[0.03] py-1.5 pl-3 pr-3.5 font-mono text-[11px] uppercase tracking-[0.16em] text-ink/80"
            style={{ "--intro-step": 0 }}
          >
            <span aria-hidden className="relative flex size-2">
              <span className="pulse-ring absolute inset-0 rounded-full bg-accent" />
              <span className="relative size-2 rounded-full bg-accent" />
            </span>
            {hero.status}
          </p>

          <h1 className="mt-7 font-display text-[clamp(4.25rem,0.75rem+10.4vw,10.25rem)] font-extrabold leading-[0.8] tracking-[-0.08em] text-ink">
            <span className="sr-only">{hero.accessibleTitle}</span>
            <span aria-hidden>
              {hero.titleLines.map((line, index) => (
                <span key={line} className="intro block" style={{ "--intro-step": index + 1 }}>
                  {line}
                </span>
              ))}
              <span
                className="intro mt-[0.08em] flex"
                style={{ "--intro-step": hero.titleLines.length + 1 }}
              >
                <RotatingWord phrases={hero.rotatingPhrases} />
              </span>
            </span>
          </h1>

          <p
            className="intro mt-9 max-w-[45ch] text-[clamp(1rem,0.92rem+0.3vw,1.1875rem)] leading-relaxed text-muted"
            style={{ "--intro-step": 4 }}
          >
            {hero.description}
          </p>

          <div className="intro mt-10 flex flex-wrap gap-3" style={{ "--intro-step": 5 }}>
            <PillLink
              href={hero.primaryCta.href}
              icon={
                <LuArrowDown
                  aria-hidden
                  className="size-4 transition-transform duration-500 ease-premium group-hover/pill:translate-y-0.5"
                />
              }
            >
              {hero.primaryCta.label}
            </PillLink>
            <PillLink href={siteConfig.links.resume} external variant="outline">
              {hero.resumeLabel}
            </PillLink>
          </div>
        </div>

        <div className="intro mx-auto w-full max-w-[25rem] sm:max-w-[28rem] lg:max-w-[32rem]" style={{ "--intro-step": 3 }}>
          <PortraitCluster
            portrait={hero.portrait}
            hasPortrait={publicAssetExists(hero.portrait.src)}
            ringText={hero.ringText}
          >
            <PaperNote
              label={roleNote.label}
              text={roleNote.text}
              rotate={-4}
              className="left-0 top-[1%] w-[47%] px-3 pb-3 pt-3.5 text-[10px] sm:-left-[6%] sm:text-[11px] lg:px-4 lg:pb-4 lg:text-[11.5px]"
            />
            <PaperNote
              label={bioNote.label}
              text={bioNote.text}
              rotate={3}
              className="bottom-[0%] right-0 w-[50%] px-3.5 pb-3.5 pt-4 text-[10.5px] sm:-right-[5%] sm:text-[11.5px] lg:px-4 lg:pb-4 lg:text-[12px]"
            />
          </PortraitCluster>
        </div>
      </Container>
    </section>
  );
}
