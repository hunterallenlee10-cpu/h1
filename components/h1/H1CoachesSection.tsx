import Image from "next/image";
import { Check } from "lucide-react";
import { H1_PALETTE, h1Coaches } from "@/data/h1";
import { H1SectionHeading } from "@/components/h1/H1SectionHeading";

/**
 * The coaches, as trading cards: a gold foil frame, the player cut out of his
 * own game photo and standing on the card, a stat strip, and the full record
 * on the "back" below it — front and back on one face, because a card that
 * has to be flipped to be read hides half its content from anyone who does
 * not think to flip it.
 *
 * Playing credentials only. The coaches' hitting instruction — the HLP system,
 * and the Leonardtown-only lessons built around it — is deliberately absent
 * from this page. See docs/H1.md §2. The stat strip is `featured`, which may
 * only restate lines already in `credentials`.
 */
export function H1CoachesSection() {
  return (
    <section
      id="h1-coaches"
      aria-labelledby="h1-coaches-title"
      className="relative overflow-clip border-y py-20 md:py-28"
      style={{ borderColor: H1_PALETTE.line, backgroundColor: H1_PALETTE.steel }}
    >
      <div className="section-container relative">
        <H1SectionHeading
          index="06"
          eyebrow="Meet the coaches"
          id="h1-coaches-title"
          title={
            <>
              Coached by athletes{" "}
              <span style={{ color: H1_PALETTE.gold }}>still competing.</span>
            </>
          }
          lead="Hunter Lee and Aaron Wathen are former four-year varsity standouts and Leonardtown High School alumni who now compete together at St. Mary's College of Maryland. They bring high-level playing experience, energy, and a genuine focus on development to every athlete they work with."
        />

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:gap-10">
          {h1Coaches.map((coach, i) => {
            const initials = coach.name
              .split(" ")
              .map((part) => part[0])
              .join("");
            return (
              <article key={coach.id} className="rv h1-card h1-foil flex">
                {/* Fills the frame: the grid stretches both cards to the
                    taller one, and an inner face that stopped short would
                    leave a band of bare foil below it. */}
                <div
                  className="relative w-full overflow-clip rounded-[calc(1.25rem-2px)]"
                  style={{ backgroundColor: H1_PALETTE.ink }}
                >
                  <span className="h1-sheen" aria-hidden="true" />

                  {/* Card front. */}
                  <div
                    className="relative aspect-[5/5] overflow-clip sm:aspect-[5/4.6]"
                    style={{
                      background: `radial-gradient(70% 70% at 50% 60%, ${H1_PALETTE.gold}2E, transparent 70%), repeating-linear-gradient(135deg, ${H1_PALETTE.chalk}06 0 2px, transparent 2px 14px), linear-gradient(180deg, ${H1_PALETTE.steel}, ${H1_PALETTE.ink})`,
                    }}
                  >
                    <span
                      className="h1-display h1-outline-text pointer-events-none absolute inset-x-0 top-6 select-none text-center text-[11rem] leading-none sm:text-[13rem]"
                      aria-hidden="true"
                    >
                      {initials}
                    </span>

                    <div className="absolute inset-x-5 top-5 z-[3] flex items-center justify-between">
                      <span
                        className="h1-eyebrow text-[0.625rem]"
                        style={{ color: H1_PALETTE.chalk }}
                      >
                        H1 Performance{" "}
                        <span style={{ color: H1_PALETTE.gold }}>
                          · {String(i + 1).padStart(2, "0")}
                        </span>
                      </span>
                      <span
                        className="h1-eyebrow rounded-full px-2.5 py-1 text-[0.625rem] font-semibold"
                        style={{
                          backgroundColor: H1_PALETTE.gold,
                          color: H1_PALETTE.ink,
                        }}
                      >
                        {coach.role}
                      </span>
                    </div>

                    <div className="h1-zoom absolute inset-0">
                      <Image
                        src={coach.cutout?.src ?? coach.photo}
                        alt={coach.photoAlt}
                        fill
                        sizes="(max-width: 768px) 90vw, 480px"
                        className={
                          coach.cutout
                            ? "object-contain object-bottom pt-14 drop-shadow-[0_20px_30px_rgba(0,0,0,0.7)]"
                            : "object-cover object-top"
                        }
                      />
                    </div>

                    {/* Nameplate. */}
                    <div
                      className="absolute inset-x-0 bottom-0 z-[3] px-6 pb-5 pt-16"
                      style={{
                        background: `linear-gradient(180deg, transparent, ${H1_PALETTE.ink}E6 55%, ${H1_PALETTE.ink})`,
                      }}
                    >
                      <h3
                        className="h1-display text-5xl"
                        style={{ color: H1_PALETTE.chalk }}
                      >
                        {coach.name}
                      </h3>
                    </div>
                  </div>

                  {/* Stat strip. */}
                  {coach.featured?.length ? (
                    <dl
                      className="grid border-y"
                      style={{
                        gridTemplateColumns: `repeat(${coach.featured.length}, minmax(0, 1fr))`,
                        borderColor: H1_PALETTE.line,
                      }}
                    >
                      {coach.featured.map((stat, s) => (
                        <div
                          key={stat.label}
                          className={`flex flex-col-reverse gap-1 px-4 py-4 ${s > 0 ? "border-l" : ""}`}
                          style={{ borderColor: H1_PALETTE.line }}
                        >
                          <dt
                            className="font-mono text-[0.625rem] uppercase leading-snug tracking-[0.12em]"
                            style={{ color: H1_PALETTE.muted }}
                          >
                            {stat.label}
                          </dt>
                          <dd
                            className="h1-display text-3xl tabular-nums"
                            style={{ color: H1_PALETTE.gold }}
                          >
                            {stat.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  ) : null}

                  {/* Card back: the full record. */}
                  <div className="p-6 md:p-7">
                    <p
                      className="h1-eyebrow mb-4 text-[0.625rem]"
                      style={{ color: H1_PALETTE.muted }}
                    >
                      Playing record
                    </p>
                    <ul className="space-y-2.5">
                      {coach.credentials.map((credential) => (
                        <li key={credential} className="flex gap-3">
                          <Check
                            className="mt-0.5 h-4 w-4 shrink-0"
                            style={{ color: H1_PALETTE.gold }}
                            aria-hidden="true"
                          />
                          <span
                            className="text-sm leading-relaxed"
                            style={{ color: H1_PALETTE.chalk }}
                          >
                            {credential}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
