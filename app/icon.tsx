import { ImageResponse } from "next/og";
import { H1_PALETTE } from "@/data/h1";
import { readLogoDataUrl } from "@/lib/logo";

/**
 * Favicon, generated at build time. The mark itself is white on transparent,
 * which vanishes on a light tab bar, so it is set on an ink tile here.
 */
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default async function Icon() {
  const logo = await readLogoDataUrl();
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: H1_PALETTE.ink,
          borderRadius: 12,
        }}
      >
        {/* The mark is portrait (1644x2000); these keep its ratio. */}
        <img src={logo} alt="" width={39} height={48} />
      </div>
    ),
    size
  );
}
