/** A span of calendar months as "YYYY-MM" strings. No `end` means it is ongoing. */
export type MonthRange = { start: string; end?: string };

const toMonthIndex = (yearMonth: string) => {
  const [year, month] = yearMonth.split("-").map(Number);
  return year * 12 + (month - 1);
};

/**
 * Counts the calendar months covered by the ranges, counting both the start and end
 * month (as LinkedIn does) and each month only once where ranges overlap.
 */
export function countMonths(ranges: MonthRange[], now: Date) {
  const current = now.getUTCFullYear() * 12 + now.getUTCMonth();
  const months = new Set<number>();
  for (const { start, end } of ranges) {
    const last = end ? toMonthIndex(end) : current;
    for (let month = toMonthIndex(start); month <= last; month++) months.add(month);
  }
  return months.size;
}

const plural = (count: number, unit: string) => `${count} ${unit}${count === 1 ? "" : "s"}`;

/** 17 → "1 year and 5 months", 24 → "2 years", 5 → "5 months". */
export function formatMonths(total: number) {
  const years = Math.floor(total / 12);
  const months = total % 12;
  if (years === 0) return plural(months, "month");
  if (months === 0) return plural(years, "year");
  return `${plural(years, "year")} and ${plural(months, "month")}`;
}
