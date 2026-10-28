import type { ComponentProps, ReactNode } from "react";
import { LuArrowUpRight } from "react-icons/lu";
import { cn } from "@/lib/cn";

type Variant = "solid" | "outline" | "accent";
type Size = "sm" | "md";

const variants: Record<Variant, string> = {
  solid: "bg-ink text-canvas hover:bg-accent",
  outline: "border border-ink/20 text-ink hover:border-ink/60 hover:bg-ink/[0.04]",
  accent: "bg-accent text-canvas hover:bg-ink",
};

const sizes: Record<Size, string> = {
  sm: "h-9 gap-1.5 px-4 text-sm",
  md: "h-12 gap-2 px-6 text-[15px]",
};

export function pillClassName({
  variant = "solid",
  size = "md",
  className,
}: { variant?: Variant; size?: Size; className?: string } = {}) {
  return cn(
    "group/pill inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-full font-medium",
    "transition-[background-color,border-color,color] duration-500 ease-premium",
    variants[variant],
    sizes[size],
    className,
  );
}

/** Up-right arrow that nudges on hover; the default icon for external links. */
export function ExternalArrow({ className }: { className?: string }) {
  return (
    <LuArrowUpRight
      aria-hidden
      className={cn(
        "size-[1.05em] transition-transform duration-500 ease-premium group-hover/pill:-translate-y-0.5 group-hover/pill:translate-x-0.5",
        className,
      )}
    />
  );
}

type PillLinkProps = Omit<ComponentProps<"a">, "children"> & {
  variant?: Variant;
  size?: Size;
  /** Opens in a new tab with rel="noopener noreferrer" and an up-right arrow. */
  external?: boolean;
  icon?: ReactNode;
  children: ReactNode;
};

export function PillLink({
  variant,
  size,
  external = false,
  icon,
  className,
  children,
  ...props
}: PillLinkProps) {
  return (
    <a
      className={pillClassName({ variant, size, className })}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      {...props}
    >
      <span>{children}</span>
      {icon ?? (external && <ExternalArrow />)}
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  );
}
