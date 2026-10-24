// ---------------------------------------------------------------------------
// H1 Performance
//
// Content for these lives in data/h1.ts. Read docs/H1.md before editing any
// figure, testimonial, or coach credential: every one of them has a source.
// ---------------------------------------------------------------------------

interface H1ProofBase {
  id: string;
  /** What was measured, e.g. "40-yard dash". */
  label: string;
  /** One athlete's result, or an average across athletes. */
  scope: "individual" | "average";
  /**
   * Who the result belongs to. Singular for an individual ("football player"),
   * plural for an average ("baseball players") — `proofAttribution()` composes
   * a sentence around this, so the number has to agree with `scope`.
   */
  subject: string;
  /** Timeframe. Set only when the client stated one, e.g. "two months". */
  period?: string;
}

/**
 * One measured result. The hero readout rotates these and the results strip
 * lists them, both from the same array in `data/h1.ts`.
 *
 * `scope` is the only place the individual/average distinction is stored. The
 * visible wording is composed from it by `proofAttribution()`, never written by
 * hand — two fields carrying the same fact can disagree, and on a page making
 * public performance claims that disagreement would be an average presented as
 * one athlete's result.
 *
 * A union rather than one interface with optional fields, because on this page
 * the type is the last guard between the data and a false public claim. Flat
 * optionals would let a pair missing `to` compile and render "5.1 → undefined",
 * and would make `precision` skippable — leaving a formatter to pick a default
 * number of decimal places, which is exactly the invented precision docs/H1.md
 * §3 forbids.
 */
export type H1ProofPoint =
  | (H1ProofBase & {
      /** Renders `from → to`, and the hero counts between the two. */
      kind: "pair";
      from: number;
      to: number;
      /** Decimal places. Required, and must match the client's published precision. */
      precision: number;
      /** Unit shown after the second figure, e.g. "lb". */
      unit?: string;
    })
  | (H1ProofBase & {
      /**
       * A single figure with no stated starting point, e.g. `+30%`. Rendered
       * verbatim wherever it is at rest. The hero readout counts it up from
       * zero — a meter filling, not a claimed baseline — reading both its
       * target and its decimal places straight out of this string, so nothing
       * stored elsewhere can disagree with what is on screen. docs/H1.md §3.
       */
      kind: "delta";
      figure: string;
    });

export interface H1ProgramFeature {
  id: string;
  title: string;
  description: string;
}

export interface H1Package {
  id: string;
  name: string;
  /**
   * Display string including the currency symbol, or null to render
   * "Pricing on request". Null is a real state, not a placeholder bug.
   */
  price: string | null;
  /** Billing period shown beside the price, e.g. "per month". */
  period: string;
  summary: string;
  features: string[];
  highlighted: boolean;
  ctaLabel: string;
}

export interface H1ProcessStep {
  id: string;
  step: number;
  title: string;
  description: string;
}

export interface H1Coach {
  id: string;
  name: string;
  role: string;
  photo: string;
  photoAlt: string;
  /**
   * The same photograph with its background removed, for the trading-card
   * front. Optional so a coach without one still gets a card — it falls back
   * to `photo`. `width`/`height` are the file's own pixels, so the layout box
   * reserved before it loads matches what arrives.
   */
  cutout?: {
    src: string;
    width: number;
    height: number;
  };
  credentials: string[];
  /**
   * Up to three lines of `credentials`, restated as a figure and a label for
   * the stat block on the card. Every one must be a line already in
   * `credentials` — this is a display of the record, never an addition to it.
   */
  featured?: { value: string; label: string }[];
}

export interface H1Testimonial {
  id: string;
  quote: string;
  name: string;
  /** Sport, position, or class year — whatever identifies the athlete. */
  detail: string;
  /**
   * Optional athlete photo, under `public/h1/testimonials/`. One field rather
   * than `photo` + `photoAlt` so an image cannot ship without its alt text.
   * Cards render without one, so a mixed grid stays legal.
   */
  photo?: {
    src: string;
    alt: string;
  };
  /**
   * One sentence from `quote`, copied character for character, which the card
   * sets apart in the athlete's own words. Must be an exact substring of
   * `quote` — the card checks, and renders the quote without emphasis if it
   * is not, so a paraphrase can never be displayed as something said.
   */
  highlight?: string;
}

export interface H1Faq {
  id: string;
  question: string;
  answer: string;
}
