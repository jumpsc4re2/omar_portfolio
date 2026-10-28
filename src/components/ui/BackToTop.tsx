import { LuArrowUp } from "react-icons/lu";
import { ScrollTopLink } from "@/components/ui/ScrollTopLink";
import { cn } from "@/lib/cn";

const RADIUS = 47;

type BackToTopProps = {
  label: string;
  ringText: string;
  className?: string;
};

/** Round accent badge with slowly rotating circular text that glides back to the top. */
export function BackToTop({ label, ringText, className }: BackToTopProps) {
  return (
    <ScrollTopLink
      focusMain
      className={cn(
        "group relative grid size-28 shrink-0 place-items-center overflow-hidden rounded-full bg-accent text-canvas sm:size-32",
        className,
      )}
    >
      <svg aria-hidden viewBox="0 0 120 120" className="badge-ring absolute inset-0 size-full">
        <defs>
          <path
            id="back-to-top-path"
            d={`M 60 60 m -${RADIUS} 0 a ${RADIUS} ${RADIUS} 0 1 1 ${RADIUS * 2} 0 a ${RADIUS} ${RADIUS} 0 1 1 -${RADIUS * 2} 0`}
          />
        </defs>
        <text className="fill-current font-mono font-medium" fontSize="9.5">
          <textPath href="#back-to-top-path" textLength={2 * Math.PI * RADIUS} lengthAdjust="spacing">
            {ringText}
          </textPath>
        </text>
      </svg>
      <span className="sr-only">{label}</span>
      <LuArrowUp
        aria-hidden
        className="size-6 transition-transform duration-500 ease-premium group-hover:-translate-y-1"
      />
    </ScrollTopLink>
  );
}
