import { readFile } from "node:fs/promises";
import { join } from "node:path";

let cached: Promise<string> | undefined;

/**
 * The H1 mark as a data URL, for the icon and Open Graph image routes.
 *
 * Those routes render at build time with `next/og`, which accepts a data URL
 * for `<img src>` but cannot fetch `/logos/...` from a site that does not
 * exist yet. The file is read once and shared between the three routes.
 *
 * Server only: this imports `node:fs`, so it must never be pulled into a
 * client component.
 */
export function readLogoDataUrl(): Promise<string> {
  cached ??= readFile(
    join(process.cwd(), "public", "logos", "h1-performance-white.png")
  ).then((buffer) => `data:image/png;base64,${buffer.toString("base64")}`);
  return cached;
}
