"use client";

import { useSyncExternalStore } from "react";
import { LuMoon, LuSun } from "react-icons/lu";
import { getClockSnapshot, getServerClockSnapshot, subscribeToClock } from "@/lib/clock";

function useNow() {
  return useSyncExternalStore(subscribeToClock, getClockSnapshot, getServerClockSnapshot);
}

type LiveClockProps = {
  timeZone: string;
  label: string;
};

/** Live local time for a time zone, with a sun or moon depending on the hour. Renders after hydration. */
export function LiveClock({ timeZone, label }: LiveClockProps) {
  const now = useNow();
  const parts =
    now === null
      ? null
      : new Intl.DateTimeFormat("en-GB", {
          timeZone,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hourCycle: "h23",
        }).formatToParts(now);

  const part = (type: Intl.DateTimeFormatPartTypes) => parts?.find((p) => p.type === type)?.value ?? "--";
  const hour = Number(part("hour"));
  const daytime = parts !== null && hour >= 6 && hour < 18;
  const Icon = daytime ? LuSun : LuMoon;

  return (
    <p className="flex items-center gap-2 tabular-nums">
      <Icon aria-hidden className="size-3.5 text-accent" />
      <span>{label}</span>
      <time dateTime={now === null ? undefined : new Date(now).toISOString()} className="min-w-[8ch]">
        {part("hour")}:{part("minute")}:{part("second")}
      </time>
    </p>
  );
}

/** Current year for the copyright line, rendered after hydration. */
export function CurrentYear() {
  const now = useNow();
  return <span className="inline-block min-w-[4ch]">{now === null ? "" : new Date(now).getFullYear()}</span>;
}
