import { ImageResponse } from "next/og";
import { H1_PALETTE, H1_PHONE } from "@/data/h1";
import { readLogoDataUrl } from "@/lib/logo";
import { OG_ATHLETE_SIZE, readOgAssets } from "@/lib/og";

/**
 * The link preview, generated at build time — the hero, in one frame: the
 * condensed headline with its second line in gold italic, and Hunter in his
 * stance on a gold-lit stage behind it. Set in the page's own display face,
 * Barlow Condensed, which ships for this purpose in `assets/og/` (see
 * lib/og.ts for why it cannot come from next/font).
 *
 * A group chat or a social feed is often the first place someone sees H1, so
 * the card is built to read at thumbnail size: two lines of type, one figure,
 * no small print it depends on.
 *
 * next/og lays out with flexbox and needs `display: flex` on every element
 * that has more than one child.
 */
export const alt =
  "H1 Performance — Train Harder. Perform Higher. Remote strength and conditioning for athletes of any age and any sport.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const [logo, { display, displayItalic, athlete }] = await Promise.all([
    readLogoDataUrl(),
    readOgAssets(),
  ]);

  const athleteHeight = 600;
  const athleteWidth = Math.round(
    (OG_ATHLETE_SIZE.width / OG_ATHLETE_SIZE.height) * athleteHeight,
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          backgroundColor: H1_PALETTE.ink,
          backgroundImage: `radial-gradient(circle at 78% 55%, ${H1_PALETTE.gold}38 0%, ${H1_PALETTE.ink}00 42%), linear-gradient(135deg, ${H1_PALETTE.steel} 0%, ${H1_PALETTE.ink} 60%)`,
          color: H1_PALETTE.chalk,
          fontFamily: "Barlow Condensed",
        }}
      >
        {/* The wordmark the athlete stands in front of. */}
        <div
          style={{
            position: "absolute",
            right: 40,
            top: -40,
            fontSize: 520,
            lineHeight: 1,
            color: `${H1_PALETTE.chalk}0A`,
            letterSpacing: -10,
          }}
        >
          H1
        </div>

        <img
          src={athlete}
          alt=""
          width={athleteWidth}
          height={athleteHeight}
          style={{ position: "absolute", right: 120, bottom: 0 }}
        />

        {/* Gold rule down the left edge. */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 10,
            backgroundColor: H1_PALETTE.gold,
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "64px 0 60px 84px",
            width: 820,
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <img src={logo} alt="" width={53} height={64} />
            <div
              style={{
                marginLeft: 20,
                fontSize: 30,
                letterSpacing: 6,
                textTransform: "uppercase",
              }}
            >
              H1 Performance
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: 26,
                letterSpacing: 5,
                color: H1_PALETTE.gold,
                textTransform: "uppercase",
              }}
            >
              Remote strength &amp; conditioning
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: 14,
                // "PERFORM HIGHER." is 6.85em wide: 104px sets it at ~712px,
                // inside the column and clear of the athlete's body.
                fontSize: 104,
                lineHeight: 0.9,
                textTransform: "uppercase",
                whiteSpace: "nowrap",
              }}
            >
              <div>Train Harder.</div>
              <div style={{ color: H1_PALETTE.gold, fontStyle: "italic" }}>
                Perform Higher.
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: 26,
              letterSpacing: 3,
              color: H1_PALETTE.muted,
              textTransform: "uppercase",
            }}
          >
            <div>All ages · All sports · 100% remote</div>
            <div style={{ marginLeft: 28, color: H1_PALETTE.chalk }}>
              {H1_PHONE}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Barlow Condensed", data: display, style: "normal", weight: 800 },
        {
          name: "Barlow Condensed",
          data: displayItalic,
          style: "italic",
          weight: 800,
        },
      ],
    },
  );
}
