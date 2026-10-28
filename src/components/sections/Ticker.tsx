import { tickerItems } from "@/content/ticker";

// Each half of the track repeats the list so it is wider than ultra-wide screens;
// the track scrolls by exactly one half for a seamless loop.
const COPIES_PER_HALF = 3;

function TickerList({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul role="list" aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {Array.from({ length: COPIES_PER_HALF }, (_, copy) =>
        tickerItems.map((item) => (
          <li
            key={`${copy}-${item}`}
            aria-hidden={copy > 0 || undefined}
            className="flex items-center gap-6 pl-6 font-mono text-[11px] uppercase tracking-[0.2em] text-muted sm:gap-8 sm:pl-8 sm:text-xs"
          >
            {item}
            <span aria-hidden className="text-accent">
              ✦
            </span>
          </li>
        )),
      )}
    </ul>
  );
}

export function Ticker() {
  return (
    <div data-autopause className="marquee overflow-hidden border-y border-line py-4 sm:py-5">
      <div className="marquee-track" style={{ "--marquee-duration": "110s" }}>
        <TickerList />
        <TickerList hidden />
      </div>
    </div>
  );
}
