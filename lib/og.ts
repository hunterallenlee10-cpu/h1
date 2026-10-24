import { readFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * Build-time assets for the Open Graph image, read from `assets/og/`.
 *
 * `next/og` renders at build time and can neither fetch the site's own
 * `/public` files (the site does not exist yet) nor use the fonts next/font
 * downloads for the page. So the link preview carries its own copies:
 *
 * - Barlow Condensed ExtraBold and ExtraBold Italic, the page's display face,
 *   as TTF (next/og cannot read woff2). Licensed under the SIL OFL 1.1, whose
 *   text ships beside them in `assets/og/OFL.txt` as the licence requires.
 * - Hunter's cutout as a PNG — the page serves WebP, which next/og cannot
 *   decode. 600px tall, which is all a 630px card needs.
 *
 * `assets/` sits outside `public/` on purpose: none of this is served to
 * visitors. Server only — this imports `node:fs`.
 */
const dir = join(process.cwd(), "assets", "og");

let cached:
  | Promise<{
      display: ArrayBuffer;
      displayItalic: ArrayBuffer;
      athlete: string;
    }>
  | undefined;

function toArrayBuffer(buffer: Buffer): ArrayBuffer {
  return buffer.buffer.slice(
    buffer.byteOffset,
    buffer.byteOffset + buffer.byteLength,
  ) as ArrayBuffer;
}

export function readOgAssets() {
  cached ??= Promise.all([
    readFile(join(dir, "BarlowCondensed-ExtraBold.ttf")),
    readFile(join(dir, "BarlowCondensed-ExtraBoldItalic.ttf")),
    readFile(join(dir, "hunter-lee.png")),
  ]).then(([display, displayItalic, athlete]) => ({
    display: toArrayBuffer(display),
    displayItalic: toArrayBuffer(displayItalic),
    athlete: `data:image/png;base64,${athlete.toString("base64")}`,
  }));
  return cached;
}

/** The athlete PNG's own pixels, so the card can lay it out on its ratio. */
export const OG_ATHLETE_SIZE = { width: 359, height: 600 } as const;
