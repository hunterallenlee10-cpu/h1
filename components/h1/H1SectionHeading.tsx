import type { ReactNode } from "react";
import { H1_PALETTE } from "@/data/h1";

interface H1SectionHeadingProps {
  /** Two-digit section index, e.g. "01". Drawn as part of the telemetry label. */
  index: string;
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  /** `light` for the one chalk section; everything else sits on ink or steel. */
  tone?: "dark" | "light";
  /** `split` puts the lead beside the title from `lg`; `stack` keeps it under. */
  layout?: "split" | "stack";
  id?: string;
}

/**
 * The page's one section-heading pattern: a mono index and label with a gold
 * tick, a condensed uppercase headline, and the lead either beside it (split,
 * the editorial default) or beneath it.
 *
 * Left-aligned throughout. The old page centred every intro, which is what
 * made it read as a template; a left edge that every section shares is what
 * makes it read as one publication.
 */
export function H1SectionHeading({
  index,
  eyebrow,
  title,
  lead,
  tone = "dark",
  layout = "split",
  id,
}: H1SectionHeadingProps) {
  const light = tone === "light";
  const muted = light ? H1_PALETTE.slate : H1_PALETTE.muted;
  const split = layout === "split" && lead;

  return (
    <div
      className={`mb-12 md:mb-16 ${
        split
          ? "grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end lg:gap-10"
          : ""
      }`}
    >
      <div className={split ? "lg:col-span-7" : "max-w-4xl"}>
        <p
          className="h1-eyebrow mb-5 flex items-center gap-3"
          style={{ color: light ? H1_PALETTE.ink : H1_PALETTE.gold }}
        >
          <span
            className="inline-block h-px w-8"
            style={{ backgroundColor: light ? H1_PALETTE.ink : H1_PALETTE.gold }}
            aria-hidden="true"
          />
          <span>
            {index} <span aria-hidden="true">/</span>{" "}
            <span className="sr-only">—</span>
            {eyebrow}
          </span>
        </p>
        <h2
          id={id}
          className="heading-lg"
          style={{ color: light ? H1_PALETTE.ink : H1_PALETTE.chalk }}
        >
          {title}
        </h2>
      </div>
      {lead ? (
        <div className={split ? "lg:col-span-5" : "mt-6 max-w-2xl"}>
          <p
            className="text-base leading-relaxed md:text-lg"
            style={{ color: muted }}
          >
            {lead}
          </p>
        </div>
      ) : null}
    </div>
  );
}
