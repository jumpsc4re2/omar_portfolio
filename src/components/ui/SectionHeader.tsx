import { cn } from "@/lib/cn";

type SectionHeaderProps = {
  label: string;
  title: string;
  /** id for the h2, referenced by the section's aria-labelledby. */
  id: string;
  className?: string;
};

export function SectionLabel({ children, className }: { children: string; className?: string }) {
  return (
    <p
      className={cn(
        "flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-muted",
        className,
      )}
    >
      <span aria-hidden className="size-1.5 rounded-full bg-accent" />
      {children}
    </p>
  );
}

export function SectionHeader({ label, title, id, className }: SectionHeaderProps) {
  return (
    <div data-reveal className={className}>
      <SectionLabel>{label}</SectionLabel>
      <h2
        id={id}
        className="mt-5 text-balance font-display text-[clamp(2.5rem,1.3rem+4.6vw,5.25rem)] font-extrabold leading-[0.92] tracking-[-0.075em]"
      >
        {title}
      </h2>
    </div>
  );
}
