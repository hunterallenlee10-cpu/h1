"use client";

import Image from "next/image";
import { ArrowRight, Phone } from "lucide-react";
import { goToConsultation } from "@/lib/consultation";
import { H1_PALETTE, H1_PHONE, H1_PHONE_HREF } from "@/data/h1";

/**
 * The close, with the palette inverted: a full-bleed gold band, ink type, the
 * mark in ink. Every section above it is dark, so this is the one surface on
 * the page that cannot be scrolled past without being seen.
 *
 * The mark is the white PNG drawn black with `brightness(0)` — one asset, no
 * second file to keep in step with it.
 */
export function H1CTASection() {
  return (
    <section
      aria-labelledby="h1-cta-title"
      data-sticky-cta="hide"
      className="h1-on-gold relative overflow-clip py-20 md:py-28"
      style={{
        background: `linear-gradient(120deg, ${H1_PALETTE.gold} 0%, ${H1_PALETTE.gold} 55%, ${H1_PALETTE.goldDeep} 100%)`,
        color: H1_PALETTE.ink,
      }}
    >
      {/* Diagonal pinstripe and an oversized ink wordmark for texture. */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `repeating-linear-gradient(135deg, ${H1_PALETTE.ink} 0 1px, transparent 1px 14px)`,
        }}
        aria-hidden="true"
      />
      <span
        className="h1-display pointer-events-none absolute -bottom-16 -right-6 select-none text-[22rem] leading-none md:-bottom-24 md:text-[30rem]"
        style={{
          color: "transparent",
          WebkitTextStroke: `2px ${H1_PALETTE.ink}1F`,
        }}
        aria-hidden="true"
      >
        H1
      </span>

      <div className="section-container relative grid grid-cols-1 items-end gap-10 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <Image
            src="/logos/h1-performance-white.png"
            alt=""
            // On the mark's portrait ratio (1644x2000).
            width={66}
            height={80}
            loading="lazy"
            className="mb-8 h-16 w-auto object-contain"
            style={{ filter: "brightness(0)" }}
          />
          <h2
            id="h1-cta-title"
            className="h1-display text-[clamp(3rem,9vw,7.5rem)] leading-[0.85]"
          >
            There&apos;s no time like the present{" "}
            <span className="italic">to get ahead.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-lg font-medium leading-relaxed md:text-xl">
            Spots are limited so every athlete gets coached the right way. Send
            a free consultation request and we&apos;ll build your first block —
            and put you next to a group that won&apos;t let you coast.
          </p>
        </div>

        <div className="flex flex-col gap-3 lg:col-span-4">
          <button
            type="button"
            onClick={() => goToConsultation()}
            className="h1-tap group inline-flex items-center justify-center gap-2 rounded-xl px-7 py-4 text-base font-semibold"
            style={{ backgroundColor: H1_PALETTE.ink, color: H1_PALETTE.chalk }}
          >
            Book a Free Consultation
            <ArrowRight
              className="h-5 w-5 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </button>
          <a
            href={H1_PHONE_HREF}
            className="h1-tap inline-flex items-center justify-center gap-2 rounded-xl border-2 px-7 py-4 text-base font-semibold"
            style={{ borderColor: H1_PALETTE.ink, color: H1_PALETTE.ink }}
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {H1_PHONE}
          </a>
        </div>
      </div>
    </section>
  );
}
