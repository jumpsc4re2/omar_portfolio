/** rAF approximation of the site curve, cubic-bezier(0.22, 1, 0.36, 1). */
export const easeOut = (t: number) => 1 - (1 - t) ** 4;

export const clamp = (value: number, min = -1, max = 1) => Math.min(max, Math.max(min, value));

/** Quartic ease-in-out for long, self-contained moves such as scrolling back to the top. */
export const easeInOut = (t: number) => (t < 0.5 ? 8 * t ** 4 : 1 - (-2 * t + 2) ** 4 / 2);
