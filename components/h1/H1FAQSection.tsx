"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { H1_PALETTE, h1Faqs } from "@/data/h1";

export function H1FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="h1-faq" className="py-20 md:py-28">
      <div className="section-container">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p
            className="mb-3 text-sm font-semibold uppercase tracking-widest"
            style={{ color: H1_PALETTE.gold }}
          >
            Common Questions
          </p>
          <h2 className="heading-lg text-white">Before You Sign Up</h2>
        </div>

        <div
          className="mx-auto max-w-3xl divide-y overflow-hidden rounded-xl border"
          style={{
            borderColor: H1_PALETTE.line,
            backgroundColor: `${H1_PALETTE.chalk}05`,
          }}
        >
          {h1Faqs.map(({ id, question, answer }, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={id}
                style={{ borderColor: H1_PALETTE.line }}
                className="border-t first:border-t-0"
              >
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    aria-controls={`h1-faq-panel-${index}`}
                    id={`h1-faq-trigger-${index}`}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-white/[0.03] focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2"
                  >
                    <span className="font-semibold text-white">{question}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      style={{ color: H1_PALETTE.gold }}
                      aria-hidden="true"
                    />
                  </button>
                </h3>
                <div
                  id={`h1-faq-panel-${index}`}
                  role="region"
                  aria-labelledby={`h1-faq-trigger-${index}`}
                  hidden={!isOpen}
                  className="px-6 pb-5"
                >
                  <p
                    className="leading-relaxed"
                    style={{ color: H1_PALETTE.muted }}
                  >
                    {answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
