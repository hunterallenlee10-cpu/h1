import { H1_PALETTE, h1ProcessSteps } from "@/data/h1";
import { H1SectionHeading } from "@/components/h1/H1SectionHeading";

/** Which base each step lands on. Four steps, four bases, home last. */
const BASES = ["1st", "2nd", "3rd", "Home"] as const;

/**
 * How it works, as a trip around the bases.
 *
 * The four steps map onto first, second, third and home, and the base path
 * draws itself as the section scrolls through — the page's one moment that
 * could only belong to a baseball program. Step four is home because it is
 * the one that closes the loop: the block ends, and the next one is built on
 * it, the way a run scores and the next at-bat starts from the plate.
 *
 * The diamond is decoration (`aria-hidden`). The steps are an ordered list
 * beside it and read completely on their own, with or without the drawing,
 * with or without scroll-timeline support.
 */
export function H1ProcessSection() {
  return (
    <section
      id="h1-process"
      aria-labelledby="h1-process-title"
      className="relative overflow-clip border-y py-20 md:py-28"
      style={{ borderColor: H1_PALETTE.line, backgroundColor: H1_PALETTE.steel }}
    >
      <div className="section-container relative">
        <H1SectionHeading
          index="04"
          eyebrow="How it works"
          id="h1-process-title"
          title={
            <>
              Round the bases.{" "}
              <span style={{ color: H1_PALETTE.gold }}>Then go again.</span>
            </>
          }
          lead="Four steps from request to your first block — no facility to drive to, and no long-term contract to sign before you know it fits. When a block ends, the next one starts from where you finished."
        />

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
            <Diamond />
          </div>

          <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7">
            {h1ProcessSteps.map((step, i) => (
              <li key={step.id} className="rv">
                <div
                  className="h1-live flex h-full flex-col rounded-2xl border p-6 md:p-7"
                  style={{
                    borderColor: i === 3 ? `${H1_PALETTE.gold}66` : H1_PALETTE.line,
                    backgroundColor: i === 3 ? `${H1_PALETTE.gold}0D` : H1_PALETTE.ink,
                  }}
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <span
                      className="h1-display text-5xl tabular-nums"
                      style={{ color: H1_PALETTE.gold }}
                    >
                      {String(step.step).padStart(2, "0")}
                    </span>
                    <span
                      className="h1-eyebrow rounded-full border px-2.5 py-1 text-[0.625rem]"
                      style={{
                        borderColor: H1_PALETTE.line,
                        color: H1_PALETTE.chalk,
                      }}
                    >
                      {BASES[i] ?? `Step ${step.step}`}
                      {BASES[i] && BASES[i] !== "Home" ? " base" : ""}
                    </span>
                  </div>
                  <h3
                    className="h1-display mt-4 text-[1.75rem]"
                    style={{ color: H1_PALETTE.chalk }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="mt-3 text-[0.9375rem] leading-relaxed"
                    style={{ color: H1_PALETTE.muted }}
                  >
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Diamond() {
  const home = { x: 200, y: 352 };
  const first = { x: 352, y: 200 };
  const second = { x: 200, y: 48 };
  const third = { x: 48, y: 200 };
  const bases = [first, second, third, home];
  const path = `M ${home.x} ${home.y} L ${first.x} ${first.y} L ${second.x} ${second.y} L ${third.x} ${third.y} Z`;

  // Labels sit outside the diamond, beyond each base.
  const labelAt = [
    { x: first.x + 4, y: first.y + 34, anchor: "end" as const },
    { x: second.x, y: second.y - 18, anchor: "middle" as const },
    { x: third.x - 4, y: third.y + 34, anchor: "start" as const },
    { x: home.x, y: home.y + 40, anchor: "middle" as const },
  ];

  return (
    <svg
      viewBox="0 0 400 410"
      className="h-auto w-full overflow-visible"
      aria-hidden="true"
      fill="none"
    >
      <defs>
        <radialGradient id="h1-infield" cx="50%" cy="55%" r="60%">
          <stop offset="0%" stopColor={H1_PALETTE.gold} stopOpacity="0.10" />
          <stop offset="100%" stopColor={H1_PALETTE.gold} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Foul lines, running out past first and third. */}
      <path
        d={`M ${home.x} ${home.y} L 400 152 M ${home.x} ${home.y} L 0 152`}
        stroke={`${H1_PALETTE.chalk}1F`}
        strokeWidth="1"
      />
      {/* The infield and the grass square inside it. */}
      <path d={path} fill="url(#h1-infield)" stroke={`${H1_PALETTE.chalk}24`} strokeWidth="1.5" />
      <path
        d={`M 200 300 L 300 200 L 200 100 L 100 200 Z`}
        stroke={`${H1_PALETTE.chalk}12`}
        strokeWidth="1"
        strokeDasharray="2 6"
      />
      {/* Mound. */}
      <circle cx="200" cy="208" r="16" stroke={`${H1_PALETTE.chalk}26`} strokeWidth="1" />
      <rect x="194" y="206" width="12" height="3" fill={`${H1_PALETTE.chalk}40`} />

      {/* The run, drawn on scroll. */}
      <path
        d={path}
        className="rv-draw-slow"
        pathLength={100}
        stroke={H1_PALETTE.gold}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ filter: `drop-shadow(0 0 8px ${H1_PALETTE.gold}80)` }}
      />

      {/* Bags. */}
      {bases.slice(0, 3).map((b) => (
        <rect
          key={`${b.x}-${b.y}`}
          x={b.x - 9}
          y={b.y - 9}
          width="18"
          height="18"
          transform={`rotate(45 ${b.x} ${b.y})`}
          fill={H1_PALETTE.chalk}
          stroke={H1_PALETTE.gold}
          strokeWidth="2"
        />
      ))}
      {/* Home plate. */}
      <path
        d={`M ${home.x - 11} ${home.y - 10} h 22 v 9 l -11 11 l -11 -11 z`}
        fill={H1_PALETTE.gold}
      />

      {labelAt.map((l, i) => (
        <g key={i}>
          <text
            x={l.x}
            y={l.y}
            textAnchor={l.anchor}
            fontSize="26"
            fontWeight="800"
            className="font-display"
            fill={i === 3 ? H1_PALETTE.gold : H1_PALETTE.chalk}
          >
            {String(i + 1).padStart(2, "0")}
          </text>
        </g>
      ))}
    </svg>
  );
}
