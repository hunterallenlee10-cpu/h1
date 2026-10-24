import { Phone, Plus } from "lucide-react";
import { H1_PALETTE, H1_PHONE, H1_PHONE_HREF, h1Faqs } from "@/data/h1";
import { consultationHref } from "@/data/navigation";

/**
 * Native `<details>` rather than a scripted accordion: it opens and closes
 * with no JavaScript, it is announced correctly as a disclosure everywhere,
 * and the browser's find-in-page can open a closed answer to show a match.
 * The shared `name` makes the group exclusive — opening one closes the
 * others — where supported, and degrades to independent panels where not.
 * The first question starts open, as it did before.
 *
 * The structured data in app/page.tsx is built from the same `h1Faqs`, so the
 * questions a search engine reads are the ones a visitor reads.
 */
export function H1FAQSection() {
  return (
    <section
      id="h1-faq"
      aria-labelledby="h1-faq-title"
      className="relative py-20 md:py-28"
    >
      <div className="section-container grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <p
              className="h1-eyebrow mb-5 flex items-center gap-3"
              style={{ color: H1_PALETTE.gold }}
            >
              <span
                className="inline-block h-px w-8"
                style={{ backgroundColor: H1_PALETTE.gold }}
                aria-hidden="true"
              />
              09 <span aria-hidden="true">/</span> Common questions
            </p>
            <h2
              id="h1-faq-title"
              className="heading-lg"
              style={{ color: H1_PALETTE.chalk }}
            >
              Before you{" "}
              <span style={{ color: H1_PALETTE.gold }}>sign up.</span>
            </h2>

            <div
              className="mt-10 rounded-2xl border p-6"
              style={{
                borderColor: H1_PALETTE.line,
                backgroundColor: H1_PALETTE.steel,
              }}
            >
              <p
                className="h1-display text-2xl"
                style={{ color: H1_PALETTE.chalk }}
              >
                Still have a question?
              </p>
              <p
                className="mt-2 text-sm leading-relaxed"
                style={{ color: H1_PALETTE.muted }}
              >
                Call Hunter directly, or send a consultation request and ask it
                there.
              </p>
              <div className="mt-5 flex flex-col gap-2.5">
                <a
                  href={H1_PHONE_HREF}
                  className="h1-tap inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-3 text-sm font-semibold"
                  style={{
                    borderColor: `${H1_PALETTE.chalk}33`,
                    color: H1_PALETTE.chalk,
                  }}
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  {H1_PHONE}
                </a>
                <a
                  href={consultationHref}
                  className="h1-tap h1-btn-gold inline-flex items-center justify-center rounded-lg px-4 py-3 text-sm font-semibold"
                >
                  Book a Free Consultation
                </a>
              </div>
            </div>
          </div>
        </div>

        <div
          className="divide-y rounded-2xl border lg:col-span-8"
          style={{ borderColor: H1_PALETTE.line }}
        >
          {h1Faqs.map(({ id, question, answer }, index) => (
            <details
              key={id}
              name="h1-faq"
              open={index === 0}
              className="group"
              style={{ borderColor: H1_PALETTE.line }}
            >
              <summary className="flex cursor-pointer list-none items-center gap-5 px-5 py-5 transition-colors hover:bg-white/[0.03] focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 md:px-7 md:py-6 [&::-webkit-details-marker]:hidden">
                <span
                  className="font-mono text-xs tabular-nums"
                  style={{ color: H1_PALETTE.gold }}
                  aria-hidden="true"
                >
                  Q.{String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="flex-1 text-base font-semibold text-white md:text-lg">
                  {question}
                </h3>
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-transform duration-300 group-open:rotate-45"
                  style={{
                    borderColor: `${H1_PALETTE.gold}4D`,
                    color: H1_PALETTE.gold,
                  }}
                  aria-hidden="true"
                >
                  <Plus className="h-4 w-4" />
                </span>
              </summary>
              <div className="px-5 pb-6 pl-[4.25rem] md:px-7 md:pb-7 md:pl-[5.25rem]">
                <p
                  className="max-w-2xl leading-relaxed"
                  style={{ color: H1_PALETTE.muted }}
                >
                  {answer}
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
