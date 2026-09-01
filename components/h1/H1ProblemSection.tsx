import { Check, X } from "lucide-react";
import { H1_PALETTE } from "@/data/h1";

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

export function H1ProblemSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="section-container">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <h2 className="heading-lg mb-4 text-white">
            Most Athletes Aren&apos;t Short on Effort
          </h2>
          <p className="text-lg" style={{ color: H1_PALETTE.muted }}>
            They&apos;re short on a plan. Working hard without direction builds
            fatigue, not performance. H1 is built for athletes who want
            accountability and visible results — not random workouts.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
          <div
            className="h1-live rounded-xl border p-8"
            style={{
              borderColor: H1_PALETTE.line,
              backgroundColor: `${H1_PALETTE.chalk}05`,
            }}
          >
            <h3 className="mb-6 text-xl font-bold text-white">
              Training Without a Plan
            </h3>
            <ul className="space-y-4">
              {without.map((item) => (
                <li key={item} className="flex gap-3">
                  <X
                    className="mt-0.5 h-5 w-5 shrink-0 text-red-400/80"
                    aria-hidden="true"
                  />
                  <span className="text-sm" style={{ color: H1_PALETTE.muted }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="h1-live rounded-xl border p-8"
            style={{
              borderColor: `${H1_PALETTE.gold}4D`,
              backgroundColor: `${H1_PALETTE.gold}0D`,
            }}
          >
            <h3 className="mb-6 text-xl font-bold text-white">
              Training With H1
            </h3>
            <ul className="space-y-4">
              {withH1.map((item) => (
                <li key={item} className="flex gap-3">
                  <Check
                    className="mt-0.5 h-5 w-5 shrink-0"
                    style={{ color: H1_PALETTE.gold }}
                    aria-hidden="true"
                  />
                  <span className="text-sm text-neutral-200">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
