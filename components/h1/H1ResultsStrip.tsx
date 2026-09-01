import {
  H1_PALETTE,
  h1ProofPoints,
  proofAttribution,
  proofFigure,
} from "@/data/h1";

/**
 * Every figure this page claims, rendered statically from `h1ProofPoints` — the
 * same array the hero readout rotates. One source, so the two sections cannot
 * end up disagreeing about what an athlete achieved.
 *
 * Two of the six are averages and four are one athlete, so each card carries its
 * own attribution from `proofAttribution()`. A single line under the grid cannot
 * do that job any more: it would have to describe all six at once, and whichever
 * way it was worded it would misdescribe two of them. That is exactly what the
 * old "Individual athlete results…" footer would have done the moment the
 * averages arrived.
 *
 * This is also the accessible and no-JS record. The hero readout is
 * `aria-hidden` and shows one fact at a time; this grid is where a screen
 * reader, a reduced-motion visitor, or anyone with JavaScript off reads the
 * complete set.
 */
export function H1ResultsStrip() {
  return (
    <section
      className="border-y py-14"
      style={{
        borderColor: H1_PALETTE.line,
        backgroundColor: H1_PALETTE.steel,
      }}
    >
      <div className="section-container">
        {/* Six figures across three columns is two clean rows. The old
            three-item version needed exactly three columns to avoid orphaning a
            card on a row of its own; six keeps that property. */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {h1ProofPoints.map((point) => (
            <div key={point.id} className="h1-live rounded-xl p-4 text-center">
              {/* Three size steps rather than two. "120 → 235 lb" is the
                  longest figure this strip has ever carried, and at the old
                  `text-3xl md:text-4xl` it wrapped to a second line in a
                  three-column grid at 640px and again at 768px — which drops
                  that one card's label below its neighbours' and breaks the
                  row. Measured to fit with margin at every step. */}
              <div
                className="text-2xl font-bold tabular-nums tracking-tight md:text-3xl lg:text-4xl"
                style={{ color: H1_PALETTE.gold }}
              >
                {proofFigure(point)}
              </div>
              <div className="mt-2 text-sm font-semibold text-white">
                {point.label}
              </div>
              <p
                className="mt-1 text-xs leading-relaxed"
                style={{ color: H1_PALETTE.muted }}
              >
                {proofAttribution(point)}
              </p>
            </div>
          ))}
        </div>

        <p
          className="mx-auto mt-10 max-w-2xl text-center text-xs leading-relaxed"
          style={{ color: H1_PALETTE.muted }}
        >
          Results achieved by athletes in the H1 Performance program. Each figure
          above is labelled with whose result it is — one athlete&apos;s, or an
          average across H1 athletes. Results vary with training age,
          consistency, and sport.
        </p>
      </div>
    </section>
  );
}
