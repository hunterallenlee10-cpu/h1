"use client";

import { CSSProperties } from "react";
import Image from "next/image";
import { ArrowRight, Phone } from "lucide-react";
import { goToConsultation } from "@/lib/consultation";
import { smoothScrollToElement } from "@/lib/scrollUtils";
import {
  H1_PALETTE,
  H1_PHONE,
  H1_PHONE_HREF,
  h1Coaches,
  h1ProofPoints,
} from "@/data/h1";
import { H1ProofRotator } from "@/components/h1/H1ProofRotator";

const founder = h1Coaches[0];

/**
 * The hero, built the way the elite performance brands build theirs: one
 * enormous condensed headline, one real athlete, and the proof on the same
 * screen as the call to action.
 *
 * The athlete is Hunter — the founder, in his own Leonardtown at-bat photo,
 * cut out of its background so he can stand on the page rather than sit in a
 * box. A real person from the program, not a stock model and not a generated
 * one; the page makes claims about real athletes and its imagery should be as
 * honest as its numbers. The tag beside him is his name, his role and the
 * first line of his record, all from `h1Coaches`.
 *
 * The headline is the `<h1>` and is never hidden on load — it is the largest
 * thing on the first screen and so the likely LCP element, and fading it in
 * would delay that paint for the sake of an effect. Everything around it
 * enters in one staggered pass (`.h1-enter`), under a second, never repeated.
 *
 * Nothing in the background animates after that pass. All of the hero's
 * ongoing motion lives inside the readout, behind its pause control, which is
 * what makes a single control enough to satisfy WCAG 2.2.2 for the section.
 */
export function H1HeroSection() {
  return (
    <section
      className="relative isolate overflow-clip"
      aria-label="Introduction"
      data-sticky-cta="hide"
      style={
        {
          "--h1c-gold": H1_PALETTE.gold,
          "--h1c-ink": H1_PALETTE.ink,
        } as CSSProperties
      }
    >
      <div className="h1c-hero-bg" aria-hidden="true" />
      <div className="h1-grid-bg opacity-80" aria-hidden="true" />

      <div className="section-container relative grid min-h-[calc(100svh-80px)] grid-cols-1 items-center gap-6 pb-14 pt-10 md:pt-14 lg:grid-cols-12 lg:gap-4 lg:pb-16">
        {/* Copy column. A size container, so the headline can be sized to
            the column it sits in rather than to the viewport — the longest
            line has to fit its column exactly at every width. */}
        <div className="relative z-10 [container-type:inline-size] lg:col-span-7">
          <div
            className="h1-enter inline-flex items-center gap-2.5 rounded-full border px-3.5 py-1.5"
            style={{
              borderColor: `${H1_PALETTE.gold}4D`,
              backgroundColor: `${H1_PALETTE.gold}12`,
            }}
          >
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span
                className="absolute inset-0 rounded-full"
                style={{ backgroundColor: H1_PALETTE.gold }}
              />
            </span>
            <span
              className="h1-eyebrow text-[0.6875rem]"
              style={{ color: H1_PALETTE.gold }}
            >
              Remote Strength &amp; Conditioning
            </span>
          </div>

          {/* 16cqi is measured, not guessed: "PERFORM HIGHER." in Barlow
              Condensed 800 italic is 6.03em wide, so this sets it at about
              96% of the column at every width, from 320px up. */}
          <h1
            className="h1-display mt-6 text-[16cqi] leading-[0.84] md:mt-8"
            style={{ color: H1_PALETTE.chalk }}
          >
            <span className="block">Train Harder.</span>
            <span
              className="block bg-clip-text pr-[0.06em] italic text-transparent"
              style={{
                backgroundImage: `linear-gradient(95deg, ${H1_PALETTE.gold} 10%, ${H1_PALETTE.goldDeep} 90%)`,
              }}
            >
              Perform Higher.
            </span>
          </h1>

          <p
            className="h1-enter mt-6 max-w-xl text-lg leading-relaxed md:mt-8 md:text-xl"
            style={{ color: H1_PALETTE.muted, "--d": "120ms" } as CSSProperties}
          >
            Personalized programming built around your sport, your goals, and
            the equipment you already have — with{" "}
            <span className="text-white">
              round-the-clock access to your coaches.
            </span>
          </p>

          <div
            className="h1-enter mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4"
            style={{ "--d": "220ms" } as CSSProperties}
          >
            <button
              type="button"
              onClick={() => goToConsultation()}
              className="h1-tap h1-btn-gold group inline-flex items-center justify-center gap-2 rounded-lg px-7 py-4 text-base font-semibold"
            >
              Book a Free Consultation
              <ArrowRight
                className="h-5 w-5 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </button>
            <button
              type="button"
              onClick={() => smoothScrollToElement("h1-pricing")}
              className="h1-tap inline-flex items-center justify-center gap-2 rounded-lg border px-7 py-4 text-base font-semibold"
              style={{
                borderColor: `${H1_PALETTE.chalk}40`,
                color: H1_PALETTE.chalk,
                backgroundColor: `${H1_PALETTE.chalk}08`,
              }}
            >
              See Packages
            </button>
          </div>

          <div
            className="h1-enter mt-8 flex flex-wrap items-center gap-x-6 gap-y-3"
            style={{ "--d": "320ms" } as CSSProperties}
          >
            <ul
              className="h1-eyebrow flex flex-wrap gap-x-4 gap-y-1 text-[0.6875rem]"
              style={{ color: H1_PALETTE.muted }}
            >
              {["All ages", "All sports", "100% remote"].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span
                    className="h-1 w-1 rounded-full"
                    style={{ backgroundColor: H1_PALETTE.gold }}
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
            <a
              href={H1_PHONE_HREF}
              className="h1-nav-link inline-flex items-center gap-2 text-sm font-semibold"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Talk to Hunter: {H1_PHONE}
            </a>
          </div>
        </div>

        {/* The stage. The athlete, the wordmark behind him, the capture frame
            and the readout panel. */}
        <div className="relative lg:col-span-5">
          <div className="relative mx-auto h-[24rem] max-w-md sm:h-[30rem] lg:h-[min(40rem,calc(100svh-12rem))] lg:max-w-none">
            {/* The wordmark the athlete stands in front of. */}
            <span
              className="h1-display h1-outline-text pointer-events-none absolute inset-x-0 top-[2%] select-none text-center text-[clamp(12rem,38vw,24rem)] leading-none"
              aria-hidden="true"
            >
              H1
            </span>

            {/* Floor glow and a shadow to stand on. */}
            <div
              className="absolute bottom-[4%] left-1/2 h-10 w-3/4 -translate-x-1/2 rounded-[50%] blur-2xl"
              style={{ backgroundColor: `${H1_PALETTE.gold}2E` }}
              aria-hidden="true"
            />

            {/* Capture frame — corner ticks and a crosshair, the look of a
                camera tracking an athlete. Decoration only: it carries no
                numbers, so it cannot be read as a measurement. */}
            <div
              className="h1-hud absolute inset-x-[8%] bottom-[2%] top-[6%]"
              aria-hidden="true"
            >
              <span
                className="absolute left-1/2 top-1/2 h-6 w-px -translate-x-1/2 -translate-y-1/2"
                style={{ backgroundColor: `${H1_PALETTE.gold}40` }}
              />
              <span
                className="absolute left-1/2 top-1/2 h-px w-6 -translate-x-1/2 -translate-y-1/2"
                style={{ backgroundColor: `${H1_PALETTE.gold}40` }}
              />
            </div>

            {/* Centred by the wrapper, animated on the image. The entrance
                animates the `translate` property, which is also what
                Tailwind's `-translate-x-1/2` sets — on one element the
                animation would win and throw the athlete off-centre. */}
            <div className="absolute bottom-[2%] left-1/2 h-[96%] -translate-x-1/2 lg:left-[60%]">
              <Image
                src={founder.cutout?.src ?? founder.photo}
                alt={`${founder.name}, H1 Performance ${founder.role.toLowerCase()}, in his batting stance`}
                width={founder.cutout?.width ?? 1062}
                height={founder.cutout?.height ?? 1162}
                preload
                sizes="(max-width: 1024px) 70vw, 420px"
                className="h1-enter-athlete h-full w-auto max-w-none object-contain drop-shadow-[0_30px_40px_rgba(0,0,0,0.6)]"
              />
            </div>

            {/* Player tag, in the open space up and to the left of the
                athlete, clear of the bat and the helmet. */}
            <div
              className="h1-enter absolute left-0 top-[6%] hidden border-l-2 py-1 pl-3 sm:block"
              style={
                {
                  borderColor: H1_PALETTE.gold,
                  "--d": "600ms",
                } as CSSProperties
              }
            >
              <p className="h1-display text-2xl" style={{ color: H1_PALETTE.chalk }}>
                {founder.name}
              </p>
              <p className="h1-eyebrow mt-1 text-[0.625rem]" style={{ color: H1_PALETTE.gold }}>
                {founder.role}
              </p>
              <p
                className="mt-1 max-w-[11rem] text-xs leading-snug"
                style={{ color: H1_PALETTE.muted }}
              >
                {founder.credentials[0]}
              </p>
            </div>
          </div>

          {/* The readout. In flow under the athlete on a phone, pulled up to
              overlap his feet; from `lg` it floats over the stage's lower
              left — the empty corner of the cutout, behind his hands and in
              front of his back foot — with the athlete shifted right to make
              the room. Its height is reserved inside the component, so a
              rotating fact can never move anything around it. */}
          <div
            className="h1-enter relative z-10 -mt-20 sm:-mt-24 lg:absolute lg:bottom-6 lg:left-0 lg:mt-0 lg:w-[21rem] xl:-left-16 xl:w-[24rem]"
            style={{ "--d": "450ms" } as CSSProperties}
          >
            <H1ProofRotator points={h1ProofPoints} />
          </div>
        </div>
      </div>
    </section>
  );
}
