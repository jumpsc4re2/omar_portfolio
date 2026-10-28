import { cn } from "@/lib/cn";

type PaperNoteProps = {
  label: string;
  text: string;
  /** Resting rotation in degrees. */
  rotate: number;
  className?: string;
};

/** A paper note taped to the wall. Straightens and lifts a little on hover. */
export function PaperNote({ label, text, rotate, className }: PaperNoteProps) {
  return (
    <div className={cn("paper-note absolute z-10", className)} style={{ "--note-rotate": `${rotate}deg` }}>
      <span aria-hidden className="paper-note-tape" />
      <p className="font-mono text-[0.9em] uppercase tracking-[0.14em] text-paper-ink/70">{label}</p>
      <p className="mt-1.5 font-mono leading-[1.5]">{text}</p>
    </div>
  );
}
