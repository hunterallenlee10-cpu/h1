import Image from "next/image";
import { Check } from "lucide-react";
import { H1_PALETTE, h1Coaches } from "@/data/h1";

/**
 * Playing credentials only. The coaches' hitting instruction — the HLP system,
 * and the Leonardtown-only lessons built around it — is deliberately absent
 * from this page. See docs/H1.md §2.
 */
export function H1CoachesSection() {
  return (
    <section id="h1-coaches" className="py-20 md:py-28">
      <div className="section-container">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <span
            className="text-sm font-semibold tracking-widest"
            style={{ color: H1_PALETTE.gold }}
          >
            MEET THE COACHES
          </span>
          <h2 className="heading-lg mb-4 mt-3 text-white">
            Coached by Athletes Still Competing
          </h2>
          <p className="text-lg" style={{ color: H1_PALETTE.muted }}>
            Hunter Lee and Aaron Wathen are former four-year varsity standouts
            and Leonardtown High School alumni who now compete together at St.
            Mary&apos;s College of Maryland. They bring high-level playing
            experience, energy, and a genuine focus on development to every
            athlete they work with.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
          {h1Coaches.map((coach) => (
            <div
              key={coach.id}
              className="h1-live overflow-hidden rounded-xl border"
              style={{
                borderColor: H1_PALETTE.line,
                backgroundColor: `${H1_PALETTE.chalk}05`,
              }}
            >
              {/* `overflow-hidden` here, not just on the card. The card clips
                  the photo on three sides because the photo bleeds to those
                  edges, but its fourth edge falls mid-card, and on hover the
                  zoom pushes the image past it — a strip of un-faded
                  photograph landing below the fade that is supposed to end
                  it, splitting the card across the middle.

                  The fade is a mask on the photo, not an ink gradient painted
                  over it. The surface below the photo is not ink — it is the
                  card's `chalk` tint composited over it — so an overlay that
                  fades to ink bottoms out darker than the card it is fading
                  into, and the mismatch reads as a line across the middle of
                  the card, worst on hover when the zoom pushes brighter
                  photograph into the fade. Masking the photo out instead lets
                  the card's own background show through, so the fade's last
                  pixel and the card body are the same painted surface and
                  there is no colour to match. The extra stops ease the fade
                  out: a straight two-stop ramp cuts to nothing at full slope,
                  which the eye picks up as an edge even when the colours meet
                  exactly. */}
              <div
                className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[3/2]"
                style={{
                  maskImage: `linear-gradient(to bottom, black calc(100% - 6rem), rgba(0, 0, 0, 0.25) calc(100% - 3rem), rgba(0, 0, 0, 0.08) calc(100% - 1.5rem), transparent calc(100% - 0.25rem))`,
                  WebkitMaskImage: `linear-gradient(to bottom, black calc(100% - 6rem), rgba(0, 0, 0, 0.25) calc(100% - 3rem), rgba(0, 0, 0, 0.08) calc(100% - 1.5rem), transparent calc(100% - 0.25rem))`,
                }}
              >
                <Image
                  src={coach.photo}
                  alt={coach.photoAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 480px"
                  className="h1-zoom object-cover object-top"
                />
              </div>

              <div className="p-8 pt-6">
                <h3 className="text-2xl font-bold text-white">{coach.name}</h3>
                <p
                  className="mb-6 text-sm font-semibold tracking-wide"
                  style={{ color: H1_PALETTE.gold }}
                >
                  {coach.role}
                </p>
                <ul className="space-y-3">
                  {coach.credentials.map((credential) => (
                    <li key={credential} className="flex gap-3">
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0"
                        style={{ color: H1_PALETTE.gold }}
                        aria-hidden="true"
                      />
                      <span
                        className="text-sm leading-relaxed"
                        style={{ color: H1_PALETTE.muted }}
                      >
                        {credential}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
