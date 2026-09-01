"use client";

import { CSSProperties } from "react";
import Image from "next/image";
import { ArrowRight, Phone } from "lucide-react";
import { smoothScrollToElement } from "@/lib/scrollUtils";
import {
  H1_PALETTE,
  H1_PHONE,
  H1_PHONE_HREF,
  h1BlockNote,
  h1ProofPoints,
} from "@/data/h1";
import { H1ProofRotator } from "@/components/h1/H1ProofRotator";

/**
 * The hero leads with evidence rather than with the wordmark.
 *
 * It used to give half its width to the H1 mark — a flat white glyph that
 * works as a label but not as a picture, and that told a visitor nothing the
 * headline had not already said — while the only hard proof the page owns sat
 * in a strip below the fold. Someone deciding whether remote coaching works
 * wants to see that it worked for somebody, so the measured results come first
 * and everything else supports them.
 *
 * The headline is still the `<h1>`. Only its rendered size changed; it is the
 * page's semantic heading regardless of how large it is drawn.
 *
 * Nothing in the background animates. All the hero's motion lives inside the
 * readout, behind its pause control, which is what makes a single control
 * enough to satisfy WCAG 2.2.2 for the whole section.
 */
export function H1HeroSection() {
  return (
    <section
      className="relative overflow-hidden py-14 md:py-32"
      // The palette reaches the CSS block through these rather than being
      // written into it, so nothing in globals.css holds a second copy of a
      // colour that could survive an edit to H1_PALETTE.
      style={
        {
          "--h1c-gold": H1_PALETTE.gold,
          "--h1c-ink": H1_PALETTE.ink,
        } as CSSProperties
      }
    >
      <div className="h1c-hero-bg" aria-hidden="true" />

      <div className="section-container relative">
        <div
          className="mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 md:mb-10"
          style={{
            borderColor: `${H1_PALETTE.gold}4D`,
            backgroundColor: `${H1_PALETTE.gold}14`,
          }}
        >
          <span
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: H1_PALETTE.gold }}
          />
          <span
            className="text-sm font-semibold tracking-wide"
            style={{ color: H1_PALETTE.gold }}
          >
            REMOTE STRENGTH &amp; CONDITIONING
          </span>
        </div>

        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <div>
            <H1ProofRotator points={h1ProofPoints} />

            <h1 className="mt-6 text-3xl font-bold tracking-tight text-white md:mt-9 md:text-4xl">
              Train Harder.{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(90deg, ${H1_PALETTE.gold}, ${H1_PALETTE.goldDeep})`,
                }}
              >
                Perform Higher.
              </span>
            </h1>

            {/* Shortened from the original five sentences, which ran nine lines
                at 390px. Not because the old copy pushed the button off the
                first screen — measured, it did not; the CTA sat at 608px in an
                844px viewport — but because the readout above costs real height
                and this is where it is cheapest to buy it back. Net at 390px:
                CTA top 608 before, 634 after, both comfortably visible. */}
            <p
              className="mt-4 max-w-xl text-lg leading-relaxed"
              style={{ color: H1_PALETTE.muted }}
            >
              Personalized programming built around your sport, your goals, and
              the equipment you already have — with round-the-clock access to
              your coaches.
            </p>

            <div className="mt-6 flex flex-col gap-4 sm:flex-row md:mt-8">
              <button
                onClick={() =>
                  smoothScrollToElement("h1-consultation-form", { focus: true })
                }
                className="h1-tap group inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-semibold"
                style={{
                  backgroundColor: H1_PALETTE.chalk,
                  color: H1_PALETTE.ink,
                }}
              >
                Book a Free Consultation
                <ArrowRight
                  className="h-5 w-5 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </button>
              <button
                onClick={() => smoothScrollToElement("h1-pricing")}
                className="h1-tap inline-flex items-center justify-center gap-2 rounded-lg border-2 px-6 py-3 font-semibold"
                style={{
                  borderColor: H1_PALETTE.gold,
                  color: H1_PALETTE.gold,
                }}
              >
                See Packages
              </button>
            </div>
          </div>

          {/* The mark keeps a place here rather than being dropped with the
              column it used to fill; losing it silently would be a brand change
              nobody asked for. It is no longer preloaded, though: below `lg`
              this column stacks under the buttons, so the mark is not above the
              fold there, and the LCP candidate is now server-rendered text
              either way. `sizes` stops a full-width source being fetched for
              a 210px slot.

              Laid out as a row between `sm` and `lg`, where the column would
              otherwise stretch each item across the full container. */}
          <aside className="flex flex-col gap-8 sm:flex-row sm:items-start sm:gap-10 lg:flex-col lg:gap-8">
            <Image
              src="/logos/h1-performance-white.png"
              alt="H1 Performance logo"
              // The mark is portrait (1644x2000); these stay on its ratio so
              // the pre-load layout box matches what arrives.
              width={411}
              height={500}
              sizes="210px"
              className="h-auto w-full max-w-[210px] shrink-0 object-contain"
            />

            {/* Grouped so the row between `sm` and `lg` is the mark beside a
                column, not three siblings competing for the same width — which
                squeezed this card to 124px at 640. */}
            <div className="flex flex-col gap-6">
              {/* A program attribute, not a result — and it has to *look* unlike
                one. Rendered with a gold tabular figure it wore the same
                costume as the six measured results rotating beside it, and a
                hero is skimmed, so the distinction the data model works to
                preserve would have been erased in the reading. No display
                figure, no gold, a label instead. */}
              <div
                className="h1-live max-w-sm rounded-lg border p-4"
                style={{
                  borderColor: H1_PALETTE.line,
                  backgroundColor: `${H1_PALETTE.steel}B3`,
                }}
              >
                <p
                  className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em]"
                  style={{ color: H1_PALETTE.muted }}
                >
                  How the program runs
                </p>
                <p className="mt-2 text-sm font-semibold text-white">
                  {h1BlockNote.title}
                </p>
                <p
                  className="mt-1 text-xs leading-relaxed"
                  style={{ color: H1_PALETTE.muted }}
                >
                  {h1BlockNote.detail}
                </p>
              </div>

              <p className="text-sm" style={{ color: H1_PALETTE.muted }}>
                All ages, all sports, trained remotely. Or reach Hunter directly
                at{" "}
                <a
                  href={H1_PHONE_HREF}
                  className="inline-flex items-center gap-1 font-semibold text-white underline-offset-4 transition-colors hover:underline"
                >
                  <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                  {H1_PHONE}
                </a>
                .
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
