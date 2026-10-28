/**
 * A shared one-second clock for useSyncExternalStore. The server snapshot is null, so
 * time-dependent text renders only after hydration and never mismatches.
 */
let now: number | null = null;
let timer: ReturnType<typeof setTimeout> | undefined;
const listeners = new Set<() => void>();

function tick() {
  now = Date.now();
  listeners.forEach((listener) => listener());
  // Align the next tick with the start of the next second.
  timer = setTimeout(tick, 1000 - (now % 1000));
}

export function subscribeToClock(listener: () => void) {
  listeners.add(listener);
  if (listeners.size === 1) tick();
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) clearTimeout(timer);
  };
}

export const getClockSnapshot = () => now;
export const getServerClockSnapshot = () => null;
