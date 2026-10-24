import { Fragment } from "react";
import { H1_PALETTE, h1TickerItems } from "@/data/h1";

/** Enough copies that the band never runs out of track across a wide screen. */
const REPEATS = 4;

/**
 * The gold band under the hero: two counter-moving rows of the program's
 * attributes, set at a slight angle like tape across a dugout rail.
 *
 * It moves with the reader's scroll, not on a clock — `animation-timeline:
 * view()` in globals.css. That matters for more than taste: an auto-playing
 * marquee is moving content under WCAG 2.2.2 and would need its own pause
 * button, while motion the reader drives with their own scrolling stops the
 * instant they do. Without scroll-timeline support, or with reduced motion,
 * the rows simply sit still.
 *
 * Decorative and `aria-hidden`: every item here is said in full elsewhere on
 * the page, and a screen reader reading forty repeated words is noise.
 */
export function H1Ticker() {
  const rows = [
    { key: "a", reverse: false, tone: "gold" as const },
    { key: "b", reverse: true, tone: "ink" as const },
  ];

  return (
    <div
      className="relative z-10 -my-6 overflow-clip py-10"
      aria-hidden="true"
    >
      <div className="-rotate-2 scale-105">
        {rows.map(({ key, reverse, tone }) => (
          <div
            key={key}
            className="overflow-clip border-y py-3"
            style={
              tone === "gold"
                ? {
                    backgroundColor: H1_PALETTE.gold,
                    borderColor: H1_PALETTE.goldDeep,
                  }
                : {
                    backgroundColor: H1_PALETTE.ink,
                    borderColor: H1_PALETTE.line,
                  }
            }
          >
            <div
              className="h1-ticker-track flex w-max items-center gap-8"
              data-reverse={reverse ? "true" : "false"}
            >
              {Array.from({ length: REPEATS }).flatMap((_, copy) =>
                h1TickerItems.map((item) => (
                  <Fragment key={`${copy}-${item}`}>
                    <span
                      className="h1-display whitespace-nowrap text-2xl md:text-3xl"
                      style={{
                        color:
                          tone === "gold" ? H1_PALETTE.ink : H1_PALETTE.chalk,
                      }}
                    >
                      {item}
                    </span>
                    <Stitch
                      color={tone === "gold" ? H1_PALETTE.ink : H1_PALETTE.gold}
                    />
                  </Fragment>
                )),
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** A single baseball stitch — two short chevrons — as the item separator. */
function Stitch({ color }: { color: string }) {
  return (
    <svg
      width="22"
      height="14"
      viewBox="0 0 22 14"
      fill="none"
      className="shrink-0"
    >
      <path
        d="M2 2 L8 7 L2 12 M12 2 L18 7 L12 12"
        stroke={color}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
