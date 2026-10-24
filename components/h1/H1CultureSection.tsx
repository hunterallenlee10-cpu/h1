import { H1_PALETTE, h1CultureContent } from "@/data/h1";

/**
 * The group.
 *
 * Everything else on this page describes the programming. This is the part
 * that is not a deliverable, so it gets the page's biggest type and nothing
 * else competing with it: the owner's own sentence, set as a statement, with
 * the two supporting points beneath.
 *
 * It sits between how the program runs and who runs it: you learn what you
 * get, then who you do it with, then who is coaching.
 *
 * The lead carries its weight through size rather than quotation marks —
 * this is the program's own voice, not something an athlete said, and quote
 * marks would make it read as a testimonial.
 */
export function H1CultureSection() {
  // The title stays one string in data/h1.ts; its last word takes the gold.
  const words = h1CultureContent.title.split(" ");
  const last = words.pop();
  const lead = words.join(" ");

  return (
    <section
      id="h1-culture"
      aria-labelledby="h1-culture-title"
      className="relative overflow-clip py-24 md:py-36"
    >
      {/* Seam stitching top and bottom, and the warm pool behind the type. */}
      <div className="h1-seam absolute inset-x-0 top-0" aria-hidden="true" />
      <div className="h1-seam absolute inset-x-0 bottom-0 rotate-180" aria-hidden="true" />
      <div
        className="absolute left-1/2 top-1/2 h-[40rem] w-[60rem] max-w-[140vw] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ backgroundColor: `${H1_PALETTE.gold}0F` }}
        aria-hidden="true"
      />

      <div className="section-container relative">
        <p
          className="h1-eyebrow mb-6 flex items-center gap-3"
          style={{ color: H1_PALETTE.gold }}
        >
          <span
            className="inline-block h-px w-8"
            style={{ backgroundColor: H1_PALETTE.gold }}
            aria-hidden="true"
          />
          05 <span aria-hidden="true">/</span> {h1CultureContent.eyebrow}
        </p>

        <h2
          id="h1-culture-title"
          className="h1-display text-[clamp(3.5rem,12vw,10rem)] leading-[0.82]"
          style={{ color: H1_PALETTE.chalk }}
        >
          {lead}{" "}
          <span className="italic" style={{ color: H1_PALETTE.gold }}>
            {last}
          </span>
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:mt-16 lg:grid-cols-12">
          <p className="rv text-xl leading-relaxed text-neutral-200 md:text-2xl md:leading-relaxed lg:col-span-7">
            {h1CultureContent.lead}
          </p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
            {h1CultureContent.points.map((point, i) => (
              <div
                key={point.id}
                className="rv h1-live rounded-2xl border p-6"
                style={{
                  borderColor: H1_PALETTE.line,
                  backgroundColor: `${H1_PALETTE.steel}CC`,
                }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="font-mono text-xs tabular-nums"
                    style={{ color: H1_PALETTE.gold }}
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div
                    className="h1-accent h-0.5 w-8 rounded-full"
                    style={{ backgroundColor: H1_PALETTE.gold }}
                    aria-hidden="true"
                  />
                </div>
                <h3
                  className="h1-display mt-4 text-2xl"
                  style={{ color: H1_PALETTE.chalk }}
                >
                  {point.title}
                </h3>
                <p
                  className="mt-2 text-[0.9375rem] leading-relaxed"
                  style={{ color: H1_PALETTE.muted }}
                >
                  {point.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
