import { ImageResponse } from "next/og";
import { H1_PALETTE, H1_PHONE } from "@/data/h1";
import { readLogoDataUrl } from "@/lib/logo";

/**
 * The link preview, generated at build time. Same hierarchy as the hero: the
 * mark, the eyebrow, the headline with its second half in gold, then the
 * promise. Rendered in next/og's bundled sans-serif; loading Geist here would
 * mean fetching a font at build time for one image.
 *
 * next/og lays out with flexbox and needs `display: flex` on every element
 * that has more than one child.
 */
export const alt =
  "H1 Performance — remote strength and conditioning for athletes of any age and any sport";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const logo = await readLogoDataUrl();
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          padding: "0 88px",
          backgroundColor: H1_PALETTE.ink,
          backgroundImage: `linear-gradient(135deg, ${H1_PALETTE.steel} 0%, ${H1_PALETTE.ink} 55%)`,
          color: H1_PALETTE.chalk,
        }}
      >
        <img src={logo} alt="" width={263} height={320} />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: 80,
          }}
        >
          <div
            style={{
              fontSize: 22,
              letterSpacing: 6,
              color: H1_PALETTE.gold,
            }}
          >
            REMOTE STRENGTH &amp; CONDITIONING
          </div>
          <div style={{ display: "flex", flexDirection: "column", marginTop: 28 }}>
            <div style={{ fontSize: 76, lineHeight: 1.05 }}>Train Harder.</div>
            <div
              style={{ fontSize: 76, lineHeight: 1.05, color: H1_PALETTE.gold }}
            >
              Perform Higher.
            </div>
          </div>
          <div
            style={{
              marginTop: 32,
              fontSize: 28,
              lineHeight: 1.4,
              color: H1_PALETTE.muted,
            }}
          >
            All ages, all sports, trained remotely.
          </div>
          <div
            style={{
              marginTop: 40,
              fontSize: 24,
              letterSpacing: 2,
              color: H1_PALETTE.chalk,
            }}
          >
            {H1_PHONE}
          </div>
        </div>
      </div>
    ),
    size
  );
}
