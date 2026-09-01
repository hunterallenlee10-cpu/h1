"use client";

import Image from "next/image";
import { ArrowRight, Phone } from "lucide-react";
import { smoothScrollToElement } from "@/lib/scrollUtils";
import { H1_PALETTE, H1_PHONE, H1_PHONE_HREF } from "@/data/h1";

export function H1CTASection() {
  return (
    <section
      className="relative overflow-hidden border-t py-20 md:py-28"
      style={{
        borderColor: H1_PALETTE.line,
        backgroundColor: H1_PALETTE.steel,
      }}
    >
      <div
        className="absolute left-1/2 top-0 -z-10 h-96 w-96 -translate-x-1/2 rounded-full blur-3xl"
        style={{ backgroundColor: `${H1_PALETTE.gold}14` }}
      />

      <div className="section-container text-center">
        <Image
          src="/logos/h1-performance-white.png"
          alt=""
          // On the mark's portrait ratio (1644x2000): a square box here would
          // letterbox it and shrink its visual weight.
          width={79}
          height={96}
          loading="lazy"
          className="mx-auto mb-8 h-20 w-auto object-contain"
        />

        <h2 className="heading-lg mx-auto mb-5 max-w-2xl text-white">
          There&apos;s No Time Like the Present to Get Ahead
        </h2>
        <p
          className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed"
          style={{ color: H1_PALETTE.muted }}
        >
          Spots are limited so every athlete gets coached the right way. Send a
          free consultation request and we&apos;ll build your first block — and
          put you next to a group that won&apos;t let you coast.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            onClick={() =>
              smoothScrollToElement("h1-consultation-form", { focus: true })
            }
            className="h1-tap group inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-semibold"
            style={{ backgroundColor: H1_PALETTE.gold, color: H1_PALETTE.ink }}
          >
            Book a Free Consultation
            <ArrowRight
              className="h-5 w-5 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </button>
          <a
            href={H1_PHONE_HREF}
            className="h1-tap inline-flex items-center justify-center gap-2 rounded-lg border-2 px-6 py-3 font-semibold"
            style={{ borderColor: H1_PALETTE.chalk, color: H1_PALETTE.chalk }}
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {H1_PHONE}
          </a>
        </div>
      </div>
    </section>
  );
}
