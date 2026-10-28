"use client";

import Image from "next/image";
import { useRef, useState, type PointerEvent, type ReactNode } from "react";
import { LuArrowDown, LuArrowUpRight } from "react-icons/lu";
import { SiGithub } from "react-icons/si";
import { ExternalArrow, PillLink } from "@/components/ui/Pill";
import { TagList } from "@/components/ui/TagList";
import type { Project } from "@/content/projects";
import { cn } from "@/lib/cn";

type ProjectCardProps = {
  project: Project;
  /** Whether project.image.src exists in /public; otherwise a generated placeholder is shown. */
  hasImage: boolean;
  /** Where the image links to. Its label rides along with the cursor (CursorPill). */
  link?: { href: string; label: string };
};

export function ProjectCard({ project, hasImage, link }: ProjectCardProps) {
  const [open, setOpen] = useState(false);
  const cardRef = useRef<HTMLElement>(null);
  const frame = useRef(0);
  const panelId = `${project.slug}-details`;
  const { live, github } = project.links;

  // Feeds the cursor position to CSS (spotlight, tilt, image parallax). Mouse only.
  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse") return;
    const { clientX, clientY } = event;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const card = cardRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      card.style.setProperty("--mx", `${x}px`);
      card.style.setProperty("--my", `${y}px`);
      card.style.setProperty("--px", ((x / rect.width) * 2 - 1).toFixed(3));
      card.style.setProperty("--py", ((y / rect.height) * 2 - 1).toFixed(3));
    });
  };

  return (
    <article
      ref={cardRef}
      data-featured={project.featured || undefined}
      onPointerMove={handlePointerMove}
      className="project-card relative rounded-[1.75rem] border border-line bg-ink/2 p-2 sm:p-2.5"
    >
      <span aria-hidden className="card-spotlight" />
      <span aria-hidden className="card-spotlight-border" />

      <MediaFrame
        link={link}
        title={project.title}
        className={cn(
          "relative block aspect-16/10 overflow-hidden rounded-[1.25rem] bg-surface",
          project.featured && "lg:aspect-2/1",
        )}
      >
        {hasImage ? (
          <Image
            src={project.image.src}
            alt={project.image.alt}
            fill
            loading="eager"
            sizes={project.featured ? "(min-width: 1376px) 1280px, 100vw" : "(min-width: 768px) 50vw, 100vw"}
            className="card-media-img object-cover"
          />
        ) : (
          <ProjectPlaceholder title={project.title} />
        )}
        {project.status && (
          <span className="absolute left-3 opacity-50 top-3 rounded-full bg-paper px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-paper-ink sm:left-4 sm:top-4 sm:text-[11px]">
            {project.status}
          </span>
        )}
      </MediaFrame>

      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((value) => !value)}
          className="flex w-full items-center justify-between gap-5 rounded-[1.25rem] px-3 py-4 text-left sm:px-4 sm:py-5"
        >
          <span className="min-w-0">
            <span
              className={cn(
                "block font-display font-extrabold tracking-[-0.035em]",
                project.featured ? "text-[clamp(1.5rem,1rem+1.6vw,2.5rem)] leading-none" : "text-2xl leading-none sm:text-[1.75rem]",
              )}
            >
              {project.title}
            </span>
            <span className="mt-2 block text-[15px] leading-snug text-muted">{project.brief}</span>
          </span>
          <span
            aria-hidden
            className="card-arrow grid size-11 shrink-0 place-items-center rounded-full sm:size-12"
          >
            <LuArrowDown className="size-4.5" />
          </span>
          <span className="sr-only">{open ? "Hide project details" : "Show project details"}</span>
        </button>
      </h3>

      <div id={panelId} className="project-panel" data-open={open || undefined} inert={!open}>
        <div>
          <div
            className={cn(
              "grid gap-8 px-3 pb-4 pt-1 sm:px-4 sm:pb-5",
              project.featured && "lg:grid-cols-2 lg:gap-14",
            )}
          >
            <div>
              <p className="max-w-[60ch] leading-relaxed text-ink/75">{project.description}</p>
              <ul role="list" className="mt-5 space-y-2.5">
                {project.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3 text-[15px] leading-snug text-muted">
                    <span aria-hidden className="mt-[0.55em] h-px w-3 shrink-0 bg-accent" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-6">
              <TagList tags={project.stack} label={`${project.title} tech stack`} />
              {(live || github) && (
                <div className="flex flex-wrap gap-2.5">
                  {live && (
                    <PillLink href={live} external size="sm">
                      <span className="sr-only">{project.title} </span>Live site
                    </PillLink>
                  )}
                  {github && (
                    <PillLink
                      href={github}
                      external
                      variant="outline"
                      size="sm"
                      icon={
                        <>
                          <SiGithub aria-hidden className="size-3.5" />
                          <ExternalArrow />
                        </>
                      }
                    >
                      <span className="sr-only">{project.title} on </span>GitHub
                    </PillLink>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

type MediaFrameProps = {
  link?: { href: string; label: string };
  title: string;
  className: string;
  children: ReactNode;
};

/**
 * The image area. With a link it is an anchor labelled for CursorPill; touch screens and
 * keyboard focus get a static version of the label in the corner instead (hidden while a
 * mouse hovers, when the moving pill is already showing).
 */
function MediaFrame({ link, title, className, children }: MediaFrameProps) {
  if (!link) return <div className={className}>{children}</div>;

  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor={link.label}
      aria-label={`${link.label}: ${title} (opens in a new tab)`}
      className={cn(className, "group/media")}
    >
      {children}
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-3 right-3 hidden items-center gap-1.5 rounded-full bg-ink px-3.5 py-2 text-[13px] font-medium text-canvas group-focus-visible/media:inline-flex group-hover/media:hidden! sm:bottom-4 sm:right-4 [@media(hover:none)]:inline-flex"
      >
        {link.label}
        <LuArrowUpRight className="size-3.5" />
      </span>
    </a>
  );
}

/** Stand-in artwork until a real screenshot is added. */
function ProjectPlaceholder({ title }: { title: string }) {
  return (
    <div
      aria-hidden
      className="absolute inset-0 grid place-items-center bg-[radial-gradient(90%_70%_at_15%_0%,color-mix(in_oklab,var(--color-accent)_16%,transparent),transparent_60%),linear-gradient(160deg,var(--color-surface),var(--color-canvas))]"
    >
      <span
        className="absolute inset-0 opacity-50 bg-[linear-gradient(var(--color-line)_1px,transparent_1px),linear-gradient(90deg,var(--color-line)_1px,transparent_1px)] bg-size-[48px_48px] mask-[radial-gradient(ellipse_at_center,#000_30%,transparent_75%)]"
      />
      <span className="relative px-6 text-center font-display text-[clamp(2rem,1rem+4vw,4.5rem)] font-extrabold leading-none tracking-tighter text-ink/85">
        {title}
      </span>
    </div>
  );
}
