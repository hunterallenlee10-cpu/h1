import {
  H1_PALETTE,
  h1ProofPoints,
  proofAttribution,
  proofChange,
  proofFigureParts,
} from "@/data/h1";
import { H1SectionHeading } from "@/components/h1/H1SectionHeading";
import { H1ResultViz } from "@/components/h1/H1ResultViz";

/**
 * The results lab: every figure this page claims, rendered statically from
 * `h1ProofPoints` — the same array the hero readout rotates. One source, so
 * the two sections cannot end up disagreeing about what an athlete achieved.
 *
 * Laid out the way the leading programs present proof — a board of
 * instruments, each one a measured figure — but held to this site's rules:
 *
 * - Every card carries its own `proofAttribution()`, because four of the six
 *   are one athlete and two are averages, and no single footer line can
 *   describe both kinds truthfully.
 * - The change chip on a pair (`−0.6`, `+115 lb`) is `proofChange()`:
 *   arithmetic on the two published figures, at their published precision.
 * - The charts plot only the ratio a figure states. See `H1ResultViz`.
 *
 * This is also the accessible and no-JS record. The hero readout is
 * `aria-hidden` and shows one fact at a time; this grid is where a screen
 * reader, a reduced-motion visitor, or anyone with JavaScript off reads the
 * complete set.
 */
export function H1ResultsStrip() {
  const total = String(h1ProofPoints.length).padStart(2, "0");

  return (
    <section
      id="h1-results"
      aria-labelledby="h1-results-title"
      className="relative overflow-clip py-20 md:py-28"
    >
      <div className="h1-grid-bg opacity-60" aria-hidden="true" />

      <div className="section-container relative">
        <H1SectionHeading
          index="01"
          eyebrow="Results"
          id="h1-results-title"
          title={
            <>
              Measured.{" "}
              <span style={{ color: H1_PALETTE.gold }}>Not promised.</span>
            </>
          }
          lead="Six results from athletes in the program. Every figure says whose it is — one athlete's, or an average across H1 athletes. Nothing is rounded, and nothing is restated as typical."
        />

        <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {h1ProofPoints.map((point, i) => {
            const change = proofChange(point);
            return (
              <li key={point.id} className="rv">
                <article
                  className="h1-live flex h-full flex-col rounded-2xl border p-6 md:p-7"
                  style={{
                    borderColor: H1_PALETTE.line,
                    background: `linear-gradient(180deg, ${H1_PALETTE.steel}, ${H1_PALETTE.ink})`,
                  }}
                >
                  <header className="flex items-start justify-between gap-4">
                    <h3
                      className="h1-eyebrow"
                      style={{ color: H1_PALETTE.chalk }}
                    >
                      {point.label}
                    </h3>
                    <span
                      className="font-mono text-[0.6875rem] tabular-nums"
                      style={{ color: H1_PALETTE.muted }}
                      aria-hidden="true"
                    >
                      {String(i + 1).padStart(2, "0")}/{total}
                    </span>
                  </header>

                  {/* The figure. A pair dims its opening number and lights its
                      closing one; both come from `proofFigureParts`, the same
                      formatter the static string uses. Sized in three steps
                      so "120 → 235 lb", the longest, holds one line in a
                      three-column card at every width. */}
                  <p className="h1-display mt-5 flex items-baseline gap-2 whitespace-nowrap text-5xl tabular-nums md:text-6xl">
                    {point.kind === "pair" ? (
                      (() => {
                        const { from, to, unit } = proofFigureParts(point);
                        return (
                          <>
                            <span style={{ color: H1_PALETTE.muted }}>
                              {from}
                            </span>
                            <span
                              className="text-[0.5em]"
                              style={{ color: H1_PALETTE.muted }}
                              aria-hidden="true"
                            >
                              →
                            </span>
                            <span className="sr-only">to</span>
                            <span style={{ color: H1_PALETTE.gold }}>{to}</span>
                            {unit ? (
                              <span
                                className="text-[0.35em]"
                                style={{ color: H1_PALETTE.muted }}
                              >
                                {unit}
                              </span>
                            ) : null}
                          </>
                        );
                      })()
                    ) : (
                      <span style={{ color: H1_PALETTE.gold }}>
                        {point.figure}
                      </span>
                    )}
                  </p>

                  {change ? (
                    <p
                      className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[0.6875rem] tabular-nums"
                      style={{
                        borderColor: `${H1_PALETTE.gold}40`,
                        color: H1_PALETTE.gold,
                        backgroundColor: `${H1_PALETTE.gold}0F`,
                      }}
                    >
                      <span aria-hidden="true">Δ</span>
                      <span className="sr-only">Change:</span>
                      {change}
                    </p>
                  ) : null}

                  <div className="mt-6 flex flex-1 flex-col justify-end">
                    <H1ResultViz point={point} />
                  </div>

                  <p
                    className="mt-6 border-t pt-4 text-sm"
                    style={{
                      borderColor: H1_PALETTE.line,
                      color: H1_PALETTE.muted,
                    }}
                  >
                    {proofAttribution(point)}
                  </p>
                </article>
              </li>
            );
          })}
        </ol>

        <p
          className="mt-10 max-w-3xl text-xs leading-relaxed"
          style={{ color: H1_PALETTE.muted }}
        >
          Results achieved by athletes in the H1 Performance program. Each
          figure above is labelled with whose result it is — one athlete&apos;s,
          or an average across H1 athletes. Charts show only the ratio between
          the two published figures. Results vary with training age,
          consistency, and sport.
        </p>
      </div>
    </section>
  );
}
