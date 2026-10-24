import type { CSSProperties } from "react";
import type { H1ProofPoint } from "@/types";
import { H1_PALETTE, proofFigureParts, proofMagnitudes } from "@/data/h1";

/**
 * The small instrument under each result in the results lab.
 *
 * Every chart here is drawn from `proofMagnitudes()` — the result's own two
 * figures, or for a percentage a baseline of 100 against 100 plus the figure —
 * on a zero-based scale. Nothing is plotted that the source did not publish:
 * no invented intermediate points, no axis values, no scatter of "batted
 * balls". The shapes are baseball's own (a spray-chart fan, a radar dial),
 * but the geometry is only ever the ratio the figure states.
 *
 * Purely visual and `aria-hidden`: the figure and its attribution are the
 * card's own text, right above and below.
 */
export function H1ResultViz({ point }: { point: H1ProofPoint }) {
  const magnitudes = proofMagnitudes(point);
  if (!magnitudes) return null;

  if (point.id === "h1-proof-distance") {
    return <SprayViz {...magnitudes} figure={figureText(point)} />;
  }
  if (point.id === "h1-proof-exit-velo") {
    return <DialViz {...magnitudes} figure={figureText(point)} />;
  }

  if (point.kind === "pair") {
    const { from, to, unit } = proofFigureParts(point);
    const suffix = unit ? ` ${unit}` : "";
    return (
      <BarsViz
        {...magnitudes}
        rows={["Before", "After"]}
        values={[`${from}${suffix}`, `${to}${suffix}`]}
      />
    );
  }

  return (
    <BarsViz
      {...magnitudes}
      rows={["Baseline", "After"]}
      values={["", point.figure]}
    />
  );
}

function figureText(point: H1ProofPoint): string {
  return point.kind === "delta" ? point.figure : "";
}

/**
 * Two bars on one zero-based scale. Lower-is-better results (sprint times)
 * read correctly without special-casing: the after bar is simply shorter, and
 * gold says which one is the result.
 */
function BarsViz({
  before,
  after,
  rows,
  values,
}: {
  before: number;
  after: number;
  rows: [string, string];
  values: [string, string];
}) {
  const max = Math.max(before, after);
  const bars = [
    { label: rows[0], value: values[0], share: before / max, lit: false },
    { label: rows[1], value: values[1], share: after / max, lit: true },
  ];

  return (
    <div className="space-y-3" aria-hidden="true">
      {bars.map((bar) => (
        <div key={bar.label} className="flex items-center gap-3">
          <span
            className="h1-eyebrow w-[4.5rem] shrink-0 text-[0.625rem]"
            style={{ color: bar.lit ? H1_PALETTE.chalk : H1_PALETTE.muted }}
          >
            {bar.label}
          </span>
          <div
            className="relative h-2.5 flex-1 overflow-clip rounded-full"
            style={{ backgroundColor: `${H1_PALETTE.chalk}0D` }}
          >
            <div
              className="rv-grow-x absolute inset-y-0 left-0 rounded-full"
              style={{
                width: `${(bar.share * 100).toFixed(2)}%`,
                background: bar.lit
                  ? `linear-gradient(90deg, ${H1_PALETTE.goldDeep}, ${H1_PALETTE.gold})`
                  : `${H1_PALETTE.muted}80`,
                boxShadow: bar.lit
                  ? `0 0 16px ${H1_PALETTE.gold}66`
                  : undefined,
              }}
            />
          </div>
          <span
            className="w-16 shrink-0 text-right font-mono text-xs tabular-nums"
            style={{ color: bar.lit ? H1_PALETTE.gold : H1_PALETTE.muted }}
          >
            {bar.value}
          </span>
        </div>
      ))}
    </div>
  );
}

/**
 * A spray-chart fan: home plate, two foul lines at 45°, and two arcs whose
 * radii are in exactly the ratio the result states — 1 : 1.37 for "+37%".
 * The dashed arc is the baseline, the gold one is where the average now
 * reaches. No balls in play are drawn; there is no data for them.
 */
function SprayViz({
  before,
  after,
  figure,
}: {
  before: number;
  after: number;
  figure: string;
}) {
  const home = { x: 120, y: 122 };
  const outer = 100;
  const inner = (outer * before) / after;
  const point = (r: number, side: -1 | 1) => ({
    x: home.x + side * r * Math.SQRT1_2,
    y: home.y - r * Math.SQRT1_2,
  });
  const arc = (r: number) => {
    const a = point(r, -1);
    const b = point(r, 1);
    return `M ${a.x.toFixed(2)} ${a.y.toFixed(2)} A ${r} ${r} 0 0 1 ${b.x.toFixed(2)} ${b.y.toFixed(2)}`;
  };
  const fan = `M ${home.x} ${home.y} L ${point(outer, -1).x.toFixed(2)} ${point(outer, -1).y.toFixed(2)} A ${outer} ${outer} 0 0 1 ${point(outer, 1).x.toFixed(2)} ${point(outer, 1).y.toFixed(2)} Z`;
  const line = (side: -1 | 1) => {
    const end = point(outer + 8, side);
    return `M ${home.x} ${home.y} L ${end.x.toFixed(2)} ${end.y.toFixed(2)}`;
  };

  return (
    <svg
      viewBox="0 0 240 132"
      className="h-auto w-full"
      aria-hidden="true"
      fill="none"
    >
      <defs>
        <radialGradient id="h1-spray-fill" cx={home.x} cy={home.y} r={outer} gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={H1_PALETTE.gold} stopOpacity="0" />
          <stop offset="100%" stopColor={H1_PALETTE.gold} stopOpacity="0.22" />
        </radialGradient>
      </defs>
      <path d={fan} fill="url(#h1-spray-fill)" />
      <path d={line(-1)} stroke={`${H1_PALETTE.chalk}40`} strokeWidth="1" />
      <path d={line(1)} stroke={`${H1_PALETTE.chalk}40`} strokeWidth="1" />
      <path
        d={arc(inner)}
        stroke={H1_PALETTE.muted}
        strokeWidth="1.5"
        strokeDasharray="3 4"
      />
      <path
        d={arc(outer)}
        className="rv-draw"
        pathLength={100}
        stroke={H1_PALETTE.gold}
        strokeWidth="2.5"
        strokeLinecap="round"
        style={{ filter: `drop-shadow(0 0 6px ${H1_PALETTE.gold}99)` } as CSSProperties}
      />
      {/* Home plate. */}
      <path
        d={`M ${home.x - 5} ${home.y - 6} h 10 v 4 l -5 4 l -5 -4 z`}
        fill={H1_PALETTE.chalk}
      />
      {/* Baseline named just inside its own arc; the result named just
          outside the gold one, so the two labels can never meet. */}
      <text
        x={home.x}
        y={home.y - inner + 13}
        textAnchor="middle"
        className="font-mono"
        fontSize="7.5"
        letterSpacing="1.5"
        fill={H1_PALETTE.muted}
      >
        BASELINE
      </text>
      <text
        x={home.x}
        y={home.y - outer - 5}
        textAnchor="middle"
        className="font-mono"
        fontSize="9"
        fontWeight="600"
        letterSpacing="1.5"
        fill={H1_PALETTE.gold}
      >
        {figure}
      </text>
    </svg>
  );
}

/**
 * A radar-gun dial on a zero-based scale that ends at the result. The muted
 * sweep runs to the baseline tick; the gold sweep is the gain. With "+20%",
 * the baseline tick sits at 100/120 of the arc — the ratio, and nothing else.
 */
function DialViz({
  before,
  after,
  figure,
}: {
  before: number;
  after: number;
  figure: string;
}) {
  const cx = 120;
  const cy = 108;
  const r = 86;
  const share = before / after;
  // Angles run from 180° (left) to 0° (right) across the top.
  const at = (t: number) => {
    const angle = Math.PI * (1 - t);
    return { x: cx + r * Math.cos(angle), y: cy - r * Math.sin(angle) };
  };
  const sweep = (t0: number, t1: number) => {
    const a = at(t0);
    const b = at(t1);
    return `M ${a.x.toFixed(2)} ${a.y.toFixed(2)} A ${r} ${r} 0 0 1 ${b.x.toFixed(2)} ${b.y.toFixed(2)}`;
  };
  const tick = (t: number, inset: number, outset: number) => {
    const angle = Math.PI * (1 - t);
    const x1 = cx + (r - inset) * Math.cos(angle);
    const y1 = cy - (r - inset) * Math.sin(angle);
    const x2 = cx + (r + outset) * Math.cos(angle);
    const y2 = cy - (r + outset) * Math.sin(angle);
    return `M ${x1.toFixed(2)} ${y1.toFixed(2)} L ${x2.toFixed(2)} ${y2.toFixed(2)}`;
  };
  const end = at(1);

  return (
    <svg
      viewBox="0 0 240 120"
      className="h-auto w-full"
      aria-hidden="true"
      fill="none"
    >
      {/* Graduations: decoration, evenly spaced, unlabelled. */}
      {Array.from({ length: 13 }).map((_, i) => (
        <path
          key={i}
          d={tick(i / 12, 10, 0)}
          stroke={`${H1_PALETTE.chalk}26`}
          strokeWidth="1"
        />
      ))}
      <path
        d={sweep(0, 1)}
        stroke={`${H1_PALETTE.chalk}12`}
        strokeWidth="9"
        strokeLinecap="round"
      />
      <path
        d={sweep(0, share)}
        stroke={`${H1_PALETTE.muted}99`}
        strokeWidth="9"
        strokeLinecap="round"
      />
      <path
        d={sweep(share, 1)}
        className="rv-draw"
        pathLength={100}
        stroke={H1_PALETTE.gold}
        strokeWidth="9"
        strokeLinecap="round"
        style={{ filter: `drop-shadow(0 0 6px ${H1_PALETTE.gold}99)` } as CSSProperties}
      />
      {/* The baseline tick, and a bright cap where the reading ends. */}
      <path d={tick(share, 14, 6)} stroke={H1_PALETTE.chalk} strokeWidth="1.5" />
      <circle cx={end.x} cy={end.y} r="6.5" fill={H1_PALETTE.gold} />
      <circle cx={end.x} cy={end.y} r="2.5" fill={H1_PALETTE.ink} />
      <text
        x={cx}
        y={cy - 24}
        textAnchor="middle"
        className="font-mono"
        fontSize="12"
        fontWeight="600"
        letterSpacing="1.5"
        fill={H1_PALETTE.gold}
      >
        {figure}
      </text>
      <text
        x={cx}
        y={cy - 9}
        textAnchor="middle"
        className="font-mono"
        fontSize="7.5"
        letterSpacing="1.5"
        fill={H1_PALETTE.muted}
      >
        VS. BASELINE
      </text>
    </svg>
  );
}
