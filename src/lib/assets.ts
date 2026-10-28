import { existsSync } from "node:fs";
import path from "node:path";

/**
 * Whether a file exists in /public. Runs on the server while the page renders, so a
 * missing photo, screenshot or logo falls back to a generated placeholder instead of
 * a broken image.
 */
export function publicAssetExists(src: string) {
  return existsSync(path.join(process.cwd(), "public", src));
}
