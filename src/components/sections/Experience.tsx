import { cacheLife } from "next/cache";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TagList } from "@/components/ui/TagList";
import { TimelineMotion } from "@/components/ui/TimelineMotion";
import { experience, type ExperienceEntry } from "@/content/experience";
import { cn } from "@/lib/cn";
import { countMonths, formatMonths } from "@/lib/duration";

/** Summed length of all entries. Cached for a day so "Present" stays current on a static page. */
async function TotalExperience() {
  "use cache";
  cacheLife("days");

  const months = countMonths(
    experience.entries.map(({ start, end }) => ({ start: start.dateTime, end: end.dateTime })),
    new Date(),
  );

  return (
    <p data-reveal className="mt-8 flex flex-wrap items-baseline gap-x-4 gap-y-1" style={{ "--reveal-delay": "80ms" }}>
      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">{experience.totalLabel}</span>
      <span className="text-[clamp(1.25rem,1rem+0.8vw,1.75rem)] font-light tracking-[-0.02em]">
        {formatMonths(months)}
      </span>
    </p>
  );
}

function TimelineEntry({ entry, last }: { entry: ExperienceEntry; last: boolean }) {
  return (
    <li
      data-timeline-entry
      className="grid grid-cols-[1.5rem_minmax(0,1fr)] gap-x-5 sm:gap-x-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_4rem_minmax(0,1.75fr)] lg:gap-x-6 xl:gap-x-10"
    >
      {/* Line segment + dot. Segments of consecutive entries join into one continuous line. */}
      <div aria-hidden className="relative col-start-1 row-span-3 row-start-1 lg:col-start-3 lg:row-span-1">
        <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-line" />
        <span data-timeline-fill className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 origin-top bg-accent" />
        <span data-timeline-dot className="timeline-dot top-2 lg:top-3" />
      </div>

      <div data-reveal className="col-start-2 lg:col-start-1 lg:row-start-1">
        <h3 className="text-[clamp(1.5rem,1.1rem+1vw,2rem)] font-medium leading-[1.1] tracking-[-0.025em]">
          {entry.role}
        </h3>
        <p className="mt-2 text-[15px] font-medium text-accent">{entry.company}</p>
        {entry.meta && (
          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">{entry.meta}</p>
        )}
      </div>

      <p
        data-reveal
        className="col-start-2 mt-5 text-[clamp(1.75rem,0.9rem+2.6vw,3.5rem)] font-light leading-[1.02] tracking-[-0.035em] lg:col-start-2 lg:row-start-1 lg:mt-0"
        style={{ "--reveal-delay": "80ms" }}
      >
        <time dateTime={entry.start.dateTime} className="block whitespace-nowrap">
          {entry.start.label}
        </time>
        <span className="block whitespace-nowrap text-muted">
          –{" "}
          {entry.end.dateTime ? <time dateTime={entry.end.dateTime}>{entry.end.label}</time> : entry.end.label}
        </span>
      </p>

      <div
        data-reveal
        className={cn("col-start-2 mt-6 lg:col-start-4 lg:row-start-1 lg:mt-0", last ? "pb-2" : "pb-20 lg:pb-32")}
        style={{ "--reveal-delay": "160ms" }}
      >
        <div className="space-y-4 text-[clamp(1rem,0.95rem+0.15vw,1.0625rem)] leading-[1.7] text-ink/70">
          {entry.description.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <TagList tags={entry.tech} label={`Technologies used as ${entry.role}`} className="mt-7" />
      </div>
    </li>
  );
}

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-heading" className="py-24 md:py-32">
      <Container>
        <SectionHeader id="experience-heading" label={experience.label} title={experience.heading} />
        <TotalExperience />
        <TimelineMotion className="mt-16 md:mt-24">
          <ol role="list">
            {experience.entries.map((entry, index) => (
              <TimelineEntry
                key={`${entry.role}-${entry.start.dateTime}`}
                entry={entry}
                last={index === experience.entries.length - 1}
              />
            ))}
          </ol>
        </TimelineMotion>
      </Container>
    </section>
  );
}
