import { cn } from "@/lib/cn";

type TagListProps = {
  tags: string[];
  /** Accessible name for the list, e.g. "Tech stack". */
  label: string;
  className?: string;
};

/** Row of small uppercase tech chips. */
export function TagList({ tags, label, className }: TagListProps) {
  return (
    <ul role="list" aria-label={label} className={cn("flex flex-wrap gap-2", className)}>
      {tags.map((tag) => (
        <li
          key={tag}
          className="rounded-full border border-line px-3 py-1 font-mono text-[11px] uppercase tracking-[0.08em] text-ink/75"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}
