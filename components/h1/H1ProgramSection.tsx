import type { LucideIcon } from "lucide-react";
import {
  Crosshair,
  FlaskConical,
  Layers,
  Library,
  MessagesSquare,
  Users,
} from "lucide-react";
import {
  H1_PALETTE,
  h1BlockNote,
  h1EquipmentSetups,
  h1ProgramFeatures,
} from "@/data/h1";
import { H1SectionHeading } from "@/components/h1/H1SectionHeading";

/**
 * One icon per feature, keyed by id. Kept here rather than in data/h1.ts
 * because an icon is presentation, not content. A feature added without an
 * entry still renders — it just has no glyph.
 */
const FEATURE_ICONS: Record<string, LucideIcon> = {
  "h1-feature-personalized": Crosshair,
  "h1-feature-blocks": Layers,
  "h1-feature-access": MessagesSquare,
  "h1-feature-resources": Library,
  "h1-feature-research": FlaskConical,
  "h1-feature-community": Users,
};

const BLOCKS = 3;
const WEEKS = 4;

export function H1ProgramSection() {
  return (
    <section
      id="h1-program"
      aria-labelledby="h1-program-title"
      className="relative overflow-clip py-20 md:py-28"
    >
      <div className="section-container relative">
        <H1SectionHeading
          index="03"
          eyebrow="The system"
          id="h1-program-title"
          title={
            <>
              Not a workout.{" "}
              <span style={{ color: H1_PALETTE.gold }}>A system.</span>
            </>
          }
          lead="Any coach can hand you a workout. H1 gives you the whole thing: a plan written for you, the resources to execute it, coaches who answer, and a group that holds you to it. All of it personalized, all of it delivered remotely."
        />

        {/* The spec sheet: six numbered cells on shared hairlines, read like
            a product's specification rather than six floating cards. */}
        <ol
          className="grid grid-cols-1 gap-px overflow-clip rounded-2xl border md:grid-cols-2 lg:grid-cols-3"
          style={{ borderColor: H1_PALETTE.line, backgroundColor: H1_PALETTE.line }}
        >
          {h1ProgramFeatures.map((feature, i) => {
            const Icon = FEATURE_ICONS[feature.id];
            return (
              <li
                key={feature.id}
                className="h1-live group flex flex-col gap-5 p-7 md:p-8"
                style={{ backgroundColor: H1_PALETTE.ink, marginBlockStart: 0 }}
              >
                <div className="flex items-center justify-between">
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-xl border"
                    style={{
                      borderColor: `${H1_PALETTE.gold}40`,
                      backgroundColor: `${H1_PALETTE.gold}0F`,
                      color: H1_PALETTE.gold,
                    }}
                    aria-hidden="true"
                  >
                    {Icon ? <Icon className="h-5 w-5" strokeWidth={1.75} /> : null}
                  </span>
                  <span
                    className="font-mono text-xs tabular-nums"
                    style={{ color: H1_PALETTE.muted }}
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(3, "0")}
                  </span>
                </div>
                <div>
                  <h3
                    className="h1-display text-[1.75rem]"
                    style={{ color: H1_PALETTE.chalk }}
                  >
                    {feature.title}
                  </h3>
                  <div
                    className="h1-accent mt-3 h-0.5 w-8 rounded-full"
                    style={{ backgroundColor: H1_PALETTE.gold }}
                    aria-hidden="true"
                  />
                </div>
                <p
                  className="text-[0.9375rem] leading-relaxed"
                  style={{ color: H1_PALETTE.muted }}
                >
                  {feature.description}
                </p>
              </li>
            );
          })}
        </ol>

        {/* The block, drawn. Three blocks as a staircase, each tread split
            into its four weeks, each step starting where the last one ended.
            It illustrates the one structural claim the program makes —
            blocks build on each other — and deliberately nothing more: no
            axis, no values, no shape inside a block, because the page has
            no source for any of that. Labelled as an illustration. */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:mt-8 lg:grid-cols-12">
          <div
            className="rv relative overflow-clip rounded-2xl border p-7 md:p-9 lg:col-span-7"
            style={{
              borderColor: H1_PALETTE.line,
              background: `linear-gradient(160deg, ${H1_PALETTE.steel}, ${H1_PALETTE.ink})`,
            }}
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="h1-eyebrow" style={{ color: H1_PALETTE.gold }}>
                  How the program runs
                </p>
                <h3
                  className="h1-display mt-3 text-4xl md:text-5xl"
                  style={{ color: H1_PALETTE.chalk }}
                >
                  {h1BlockNote.title}
                </h3>
                <p
                  className="mt-2 max-w-md text-[0.9375rem]"
                  style={{ color: H1_PALETTE.muted }}
                >
                  {h1BlockNote.detail}
                </p>
              </div>
              <span
                className="h1-eyebrow rounded-full border px-2.5 py-1 text-[0.625rem]"
                style={{ borderColor: H1_PALETTE.line, color: H1_PALETTE.muted }}
              >
                Illustration
              </span>
            </div>

            <div
              className="mt-10 flex h-48 items-end gap-2 md:h-56 md:gap-3"
              aria-hidden="true"
            >
              {Array.from({ length: BLOCKS }).map((_, b) => (
                <div key={b} className="flex h-full flex-1 flex-col justify-end">
                  <div
                    className="rv-grow-y relative flex items-stretch gap-[3px] rounded-t-md"
                    style={{ height: `${38 + b * 27}%` }}
                  >
                    {Array.from({ length: WEEKS }).map((__, w) => (
                      <span
                        key={w}
                        className="flex-1 first:rounded-tl-md last:rounded-tr-md"
                        style={{
                          background:
                            b === BLOCKS - 1
                              ? `linear-gradient(180deg, ${H1_PALETTE.gold}, ${H1_PALETTE.goldDeep}66)`
                              : `linear-gradient(180deg, ${H1_PALETTE.chalk}${b === 0 ? "26" : "40"}, ${H1_PALETTE.chalk}08)`,
                        }}
                      />
                    ))}
                    {/* Where the next block picks up. */}
                    {b < BLOCKS - 1 ? (
                      <span
                        className="absolute -right-2 top-0 h-px w-4 md:-right-3 md:w-6"
                        style={{
                          backgroundImage: `linear-gradient(90deg, ${H1_PALETTE.gold} 50%, transparent 50%)`,
                          backgroundSize: "4px 1px",
                        }}
                      />
                    ) : null}
                  </div>
                  <div
                    className="mt-3 flex justify-between font-mono text-[0.5625rem] md:text-[0.625rem]"
                    style={{ color: H1_PALETTE.muted }}
                  >
                    {Array.from({ length: WEEKS }).map((__, w) => (
                      <span key={w} className="flex-1 text-center">
                        W{w + 1}
                      </span>
                    ))}
                  </div>
                  <p
                    className="h1-eyebrow mt-2 text-center text-[0.625rem]"
                    style={{
                      color:
                        b === BLOCKS - 1 ? H1_PALETTE.gold : H1_PALETTE.chalk,
                    }}
                  >
                    Block {String(b + 1).padStart(2, "0")}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Built for your setup — the same list the form asks about. */}
          <div
            className="rv flex flex-col rounded-2xl border p-7 md:p-9 lg:col-span-5"
            style={{ borderColor: H1_PALETTE.line, backgroundColor: H1_PALETTE.ink }}
          >
            <p className="h1-eyebrow" style={{ color: H1_PALETTE.gold }}>
              Wherever you train
            </p>
            <h3
              className="h1-display mt-3 text-4xl md:text-5xl"
              style={{ color: H1_PALETTE.chalk }}
            >
              Written for your setup
            </h3>
            <p
              className="mt-2 text-[0.9375rem]"
              style={{ color: H1_PALETTE.muted }}
            >
              No facility to drive to. Tell us what you have access to and the
              plan is built around it.
            </p>
            <ul className="mt-8 flex flex-col gap-2.5">
              {h1EquipmentSetups.map((setup) => (
                <li
                  key={setup}
                  className="flex items-center gap-3 rounded-xl border px-4 py-3 text-sm"
                  style={{
                    borderColor: H1_PALETTE.line,
                    backgroundColor: `${H1_PALETTE.chalk}05`,
                    color: H1_PALETTE.chalk,
                  }}
                >
                  <span
                    className="h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: H1_PALETTE.gold }}
                    aria-hidden="true"
                  />
                  {setup}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
