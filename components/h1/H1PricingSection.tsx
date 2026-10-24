"use client";

import { ArrowRight, Check } from "lucide-react";
import { goToConsultation } from "@/lib/consultation";
import { H1_NUTRITION_DISCLAIMER, H1_PALETTE, h1Packages } from "@/data/h1";
import { H1SectionHeading } from "@/components/h1/H1SectionHeading";

/**
 * Two packages, priced in the open — the leading programs mostly hide their
 * prices behind a call, and a visible number is an advantage this page has.
 *
 * Each card's button goes to the consultation form with its own package
 * already chosen (`goToConsultation(pkg.name)`), so the click that says "this
 * one" is not followed by a form asking which one.
 */
export function H1PricingSection() {
  return (
    <section
      id="h1-pricing"
      aria-labelledby="h1-pricing-title"
      className="relative overflow-clip border-y py-20 md:py-28"
      style={{ borderColor: H1_PALETTE.line, backgroundColor: H1_PALETTE.steel }}
    >
      <div
        className="absolute left-1/2 top-1/3 h-[30rem] w-[50rem] max-w-[140vw] -translate-x-1/2 rounded-full blur-3xl"
        style={{ backgroundColor: `${H1_PALETTE.gold}0A` }}
        aria-hidden="true"
      />

      <div className="section-container relative">
        <H1SectionHeading
          index="08"
          eyebrow="Packages"
          id="h1-pricing-title"
          title={
            <>
              Pick your block.{" "}
              <span style={{ color: H1_PALETTE.gold }}>Lock in your rate.</span>
            </>
          }
          lead="Spots are limited so every athlete gets coached properly. Both packages are fully remote and fully personalized — and the consultation that comes first is free."
        />

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
          {h1Packages.map((pkg) => (
            <article
              key={pkg.id}
              className={`rv h1-live relative flex flex-col rounded-3xl p-8 md:p-10 ${
                pkg.highlighted ? "h1-featured" : "border"
              }`}
              style={
                pkg.highlighted
                  ? {
                      boxShadow: `0 40px 80px -40px ${H1_PALETTE.gold}40`,
                    }
                  : {
                      borderColor: H1_PALETTE.line,
                      backgroundColor: H1_PALETTE.ink,
                    }
              }
            >
              {pkg.highlighted && (
                <span
                  className="h1-eyebrow absolute -top-3 left-8 rounded-full px-3 py-1.5 text-[0.625rem] font-semibold md:left-10"
                  style={{
                    backgroundColor: H1_PALETTE.gold,
                    color: H1_PALETTE.ink,
                  }}
                >
                  Most Complete
                </span>
              )}

              <h3
                className="h1-display text-3xl md:text-4xl"
                style={{ color: H1_PALETTE.chalk }}
              >
                {pkg.name}
              </h3>

              {/* A real figure gets display size; "Pricing on request" would
                  tower over its neighbour at the same weight. */}
              <div className="mt-6 flex items-end gap-3">
                {pkg.price ? (
                  <>
                    <span
                      className="h1-display text-8xl leading-[0.8] tabular-nums md:text-[7rem]"
                      style={{
                        color: pkg.highlighted
                          ? H1_PALETTE.gold
                          : H1_PALETTE.chalk,
                      }}
                    >
                      {pkg.price}
                    </span>
                    <span
                      className="h1-eyebrow pb-1 text-[0.6875rem]"
                      style={{ color: H1_PALETTE.muted }}
                    >
                      {pkg.period}
                    </span>
                  </>
                ) : (
                  <span
                    className="h1-display text-4xl"
                    style={{ color: H1_PALETTE.gold }}
                  >
                    Pricing on request
                  </span>
                )}
              </div>

              <p
                className="mt-6 text-[0.9375rem] leading-relaxed"
                style={{ color: H1_PALETTE.muted }}
              >
                {pkg.summary}
              </p>

              <div
                className="my-7 h-px"
                style={{ backgroundColor: H1_PALETTE.line }}
                aria-hidden="true"
              />

              <ul className="mb-9 space-y-3.5">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex gap-3">
                    <span
                      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                      style={{
                        backgroundColor: pkg.highlighted
                          ? H1_PALETTE.gold
                          : `${H1_PALETTE.gold}1F`,
                        color: pkg.highlighted ? H1_PALETTE.ink : H1_PALETTE.gold,
                      }}
                      aria-hidden="true"
                    >
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    <span className="text-[0.9375rem] text-neutral-200">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => goToConsultation(pkg.name)}
                className={`h1-tap group mt-auto inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-4 text-base font-semibold ${
                  pkg.highlighted ? "h1-btn-gold" : ""
                }`}
                style={
                  pkg.highlighted
                    ? undefined
                    : {
                        backgroundColor: H1_PALETTE.chalk,
                        color: H1_PALETTE.ink,
                      }
                }
              >
                {pkg.ctaLabel}
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </button>
            </article>
          ))}
        </div>

        <ul
          className="h1-eyebrow mx-auto mt-10 flex max-w-5xl flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[0.6875rem]"
          style={{ color: H1_PALETTE.muted }}
        >
          {[
            "Free consultation first",
            "No payment to book",
            "Fully remote",
          ].map((item) => (
            <li key={item} className="flex items-center gap-2">
              <Check
                className="h-3.5 w-3.5"
                style={{ color: H1_PALETTE.gold }}
                aria-hidden="true"
              />
              {item}
            </li>
          ))}
        </ul>

        <p
          className="mx-auto mt-6 max-w-2xl text-center text-sm"
          style={{ color: H1_PALETTE.chalk }}
        >
          Bring a teammate and ask about the referral bonus when you send your
          request.
        </p>

        <p
          className="mx-auto mt-6 max-w-3xl text-center text-xs leading-relaxed"
          style={{ color: H1_PALETTE.muted }}
        >
          {H1_NUTRITION_DISCLAIMER}
        </p>
      </div>
    </section>
  );
}
