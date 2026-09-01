import { H1_PALETTE, h1CultureContent } from "@/data/h1";

/**
 * The group.
 *
 * Everything else on this page describes the programming — the blocks, the
 * research, the coaching. This is the part that is not a deliverable, and it
 * was previously one card among six in the program grid, which undersold it.
 *
 * It sits between the program and the coaches deliberately: you learn what you
 * get, then who you do it with, then who is running it.
 *
 * A raised band rather than another section on the page ground, because the
 * two sections either side of it are both on the ground and the page needs a
 * change of surface here to stop the middle reading as one long list.
 */
export function H1CultureSection() {
  return (
    <section
      id="h1-culture"
      className="border-y py-20 md:py-28"
      style={{
        borderColor: H1_PALETTE.line,
        backgroundColor: H1_PALETTE.steel,
      }}
    >
      <div className="section-container">
        {/* Centred, because every other section on this page centres its
            intro and an outlier here reads as a mistake rather than as
            emphasis. The lead carries its weight through size and a near-white
            fill instead — and through a rule rather than quotation marks,
            since this is the program's own voice, not something an athlete
            said. Quote marks would read as a testimonial, and there are no
            testimonials on this page yet, deliberately. */}
        <div className="mx-auto max-w-3xl text-center">
          <p
            className="mb-4 text-sm font-semibold uppercase tracking-[0.2em]"
            style={{ color: H1_PALETTE.gold }}
          >
            {h1CultureContent.eyebrow}
          </p>

          <h2 className="heading-lg mb-7 text-white">
            {h1CultureContent.title}
          </h2>

          <div
            className="mx-auto mb-7 h-1 w-14 rounded-full"
            style={{ backgroundColor: H1_PALETTE.gold }}
            aria-hidden="true"
          />

          <p className="text-lg leading-relaxed text-neutral-200 md:text-xl md:leading-relaxed">
            {h1CultureContent.lead}
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
          {h1CultureContent.points.map((point) => (
            <div
              key={point.id}
              className="h1-live rounded-xl border p-6"
              style={{
                borderColor: H1_PALETTE.line,
                backgroundColor: `${H1_PALETTE.chalk}05`,
              }}
            >
              <div
                className="h1-accent mb-4 h-1 w-10 rounded-full"
                style={{ backgroundColor: H1_PALETTE.gold }}
              />
              <h3 className="mb-2 text-base font-bold text-white">
                {point.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: H1_PALETTE.muted }}
              >
                {point.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
