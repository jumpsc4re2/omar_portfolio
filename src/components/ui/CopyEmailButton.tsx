"use client";

import { useRef, useState } from "react";
import { LuCheck, LuCopy } from "react-icons/lu";
import { pillClassName } from "@/components/ui/Pill";
import { copyText } from "@/lib/clipboard";
import { cn } from "@/lib/cn";

type CopyEmailButtonProps = {
  email: string;
  copiedMessage: string;
};

/** Accent pill that copies the email address. If copying is impossible, it opens the mail app instead. */
export function CopyEmailButton({ email, copiedMessage }: CopyEmailButtonProps) {
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef<number | undefined>(undefined);

  const handleCopy = async () => {
    if (!(await copyText(email))) {
      window.location.href = `mailto:${email}`;
      return;
    }
    setCopied(true);
    window.clearTimeout(resetTimer.current);
    resetTimer.current = window.setTimeout(() => setCopied(false), 2200);
  };

  const Icon = copied ? LuCheck : LuCopy;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleCopy}
        aria-label={`Copy email address ${email}`}
        className={pillClassName({ variant: "accent", className: "max-w-full" })}
      >
        <span className="truncate">{email}</span>
        <Icon aria-hidden className="size-4 shrink-0" />
      </button>
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 rounded-full border border-line bg-paper px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-paper-ink",
          "transition-[opacity,translate] duration-500 ease-premium",
          copied ? "translate-y-0 opacity-100" : "translate-y-1.5 opacity-0",
        )}
      >
        {copiedMessage}
      </span>
      <span role="status" className="sr-only">
        {copied ? `${copiedMessage}: ${email}` : ""}
      </span>
    </div>
  );
}
