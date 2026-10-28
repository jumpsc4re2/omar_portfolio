import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

/** Centered content column with equal side gutters. 1280px of content at desktop. */
export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-[1376px] px-5 md:px-8 lg:px-12", className)} {...props} />;
}
