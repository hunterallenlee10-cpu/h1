"use client";

import { ArrowRight, Check } from "lucide-react";
import { smoothScrollToElement } from "@/lib/scrollUtils";
import { H1_NUTRITION_DISCLAIMER, H1_PALETTE, h1Packages } from "@/data/h1";

export function H1PricingSection() {
  return (
    <section id="h1-pricing" className="py-20 md:py-28">
      <div className="section-container">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <span
            className="text-sm font-semibold tracking-widest"
            style={{ color: H1_PALETTE.gold }}
          >
            PACKAGES
          </span>
          <h2 className="heading-lg mb-4 mt-3 text-white">
            Pick Your Block, Lock In Your Rate
          </h2>
          <p className="text-lg" style={{ color: H1_PALETTE.muted }}>
            Spots are limited so every athlete gets coached properly. Both
            packages are fully remote and fully personalized.
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
          {h1Packages.map((pkg) => (
            <div
              key={pkg.id}
              className="h1-live relative flex flex-col rounded-xl border p-8"
              style={
                pkg.highlighted
                  ? {
                      borderColor: H1_PALETTE.gold,
                      backgroundColor: `${H1_PALETTE.gold}0D`,
                    }
                  : {
                      borderColor: H1_PALETTE.line,
                      backgroundColor: `${H1_PALETTE.chalk}05`,
                    }
              }
            >
              {pkg.highlighted && (
                <span
                  className="absolute -top-3 left-8 rounded-full px-3 py-1 text-xs font-bold"
                  style={{
                    backgroundColor: H1_PALETTE.gold,
                    color: H1_PALETTE.ink,
                  }}
                >
                  Most Complete
                </span>
              )}

              <h3 className="mb-2 text-xl font-bold text-white">{pkg.name}</h3>

              {/* A real figure gets display size; "Pricing on request" would
                  tower over its neighbour at the same weight. */}
              <div className="mb-4 flex items-baseline gap-2">
                {pkg.price ? (
                  <>
                    <span
                      className="text-4xl font-bold"
                      style={{ color: H1_PALETTE.gold }}
                    >
                      {pkg.price}
                    </span>
                    <span
                      className="text-sm"
                      style={{ color: H1_PALETTE.muted }}
                    >
                      {pkg.period}
                    </span>
                  </>
                ) : (
                  <span
                    className="text-2xl font-bold"
                    style={{ color: H1_PALETTE.gold }}
                  >
                    Pricing on request
                  </span>
                )}
              </div>

              <p
                className="mb-7 text-sm leading-relaxed"
                style={{ color: H1_PALETTE.muted }}
              >
                {pkg.summary}
              </p>

              <ul className="mb-8 space-y-3">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex gap-3">
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0"
                      style={{ color: H1_PALETTE.gold }}
                      aria-hidden="true"
                    />
                    <span className="text-sm text-neutral-200">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() =>
                  smoothScrollToElement("h1-consultation-form", { focus: true })
                }
                className="h1-tap group mt-auto inline-flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3 font-semibold"
                style={
                  pkg.highlighted
                    ? {
                        backgroundColor: H1_PALETTE.gold,
                        color: H1_PALETTE.ink,
                      }
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
            </div>
          ))}
        </div>

        <p
          className="mx-auto mt-10 max-w-2xl text-center text-sm"
          style={{ color: H1_PALETTE.muted }}
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
