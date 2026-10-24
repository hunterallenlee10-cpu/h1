import { Check, X } from "lucide-react";
import { H1_PALETTE } from "@/data/h1";
import { H1SectionHeading } from "@/components/h1/H1SectionHeading";

const without = [
  "Random workouts pulled from social media",
  "The same month of training repeated all year",
  "A program written for someone else's body and sport",
  "Guessing at nutrition, supplements, and recovery",
  "No one to ask when something doesn't feel right",
];

const withH1 = [
  "A clear plan for every single session",
  "Four-week blocks that each build on the last",
  "Programming written for your sport and your setup",
  "Researched guidance on diet, supplements, and recovery",
  "Round-the-clock access to your coaches",
];

/**
 * The page's one light section. The leading programs alternate light and
 * dark bands; on an all-ink page the change of surface is what tells a reader
 * the argument has turned from proof to diagnosis. Chalk ground, ink type,
 * `slate` for secondary type — `muted` is tuned for ink and is too faint here.
 *
 * The two lists are deliberately the same length and in matching order, so
 * each line on the left has its answer on the right.
 */
export function H1ProblemSection() {
  return (
    <section
      aria-labelledby="h1-problem-title"
      className="relative overflow-clip py-20 md:py-28"
      style={{ backgroundColor: H1_PALETTE.chalk, color: H1_PALETTE.ink }}
    >
      {/* Oversized outlined word behind the heading, in ink at low alpha. */}
      <span
        className="h1-display pointer-events-none absolute -right-8 top-6 hidden select-none text-[16rem] leading-none lg:block"
        style={{
          color: "transparent",
          WebkitTextStroke: `1.5px ${H1_PALETTE.ink}14`,
        }}
        aria-hidden="true"
      >
        Plan
      </span>

      <div className="section-container relative">
        <H1SectionHeading
          index="02"
          eyebrow="The problem"
          tone="light"
          id="h1-problem-title"
          title={
            <>
              Effort isn&apos;t the problem.
              <br />
              <span className="italic">Direction is.</span>
            </>
          }
          lead="Most athletes aren't short on effort — they're short on a plan. Working hard without direction builds fatigue, not performance. H1 is built for athletes who want accountability and visible results, not random workouts."
        />

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
          <div
            className="rv rounded-2xl border bg-white p-7 md:p-9"
            style={{ borderColor: `${H1_PALETTE.ink}1A` }}
          >
            <p
              className="h1-eyebrow mb-2"
              style={{ color: H1_PALETTE.slate }}
            >
              Without a plan
            </p>
            <h3 className="h1-display mb-7 text-4xl" style={{ color: H1_PALETTE.ink }}>
              Training blind
            </h3>
            <ul className="space-y-1">
              {without.map((item, i) => (
                <li
                  key={item}
                  className="flex items-start gap-4 border-t py-3.5 first:border-t-0"
                  style={{ borderColor: `${H1_PALETTE.ink}12` }}
                >
                  <span
                    className="font-mono text-xs tabular-nums"
                    style={{ color: H1_PALETTE.slate }}
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="flex-1 text-[0.9375rem]"
                    style={{ color: H1_PALETTE.slate }}
                  >
                    {item}
                  </span>
                  <X
                    className="mt-0.5 h-4 w-4 shrink-0 text-red-600"
                    aria-hidden="true"
                  />
                </li>
              ))}
            </ul>
          </div>

          <div
            className="rv relative overflow-clip rounded-2xl p-7 md:p-9"
            style={{ backgroundColor: H1_PALETTE.ink, color: H1_PALETTE.chalk }}
          >
            <div
              className="absolute -right-16 -top-16 h-56 w-56 rounded-full blur-3xl"
              style={{ backgroundColor: `${H1_PALETTE.gold}26` }}
              aria-hidden="true"
            />
            <p className="h1-eyebrow relative mb-2" style={{ color: H1_PALETTE.gold }}>
              With H1
            </p>
            <h3 className="h1-display relative mb-7 text-4xl">
              Training with intent
            </h3>
            <ul className="relative space-y-1">
              {withH1.map((item, i) => (
                <li
                  key={item}
                  className="flex items-start gap-4 border-t py-3.5 first:border-t-0"
                  style={{ borderColor: H1_PALETTE.line }}
                >
                  <span
                    className="font-mono text-xs tabular-nums"
                    style={{ color: H1_PALETTE.gold }}
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 text-[0.9375rem] text-neutral-100">
                    {item}
                  </span>
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0"
                    style={{ color: H1_PALETTE.gold }}
                    aria-hidden="true"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
