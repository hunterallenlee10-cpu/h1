"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Phone } from "lucide-react";
import { goToConsultation } from "@/lib/consultation";
import { H1_PALETTE, H1_PHONE, H1_PHONE_HREF } from "@/data/h1";

/**
 * The phone-only booking bar. On a long page read on a phone, the header's
 * button is gone below `sm` and the next call to action can be several
 * screens away; this keeps one within a thumb's reach.
 *
 * It stays out of the way of the three places that already carry the
 * action — the hero, the form and the closing band, each marked
 * `data-sticky-cta="hide"` — so it never stacks a second button on top of
 * the first or covers the form a visitor is filling in.
 *
 * Hidden it is `inert` as well as off-screen, so it never leaves an
 * invisible pair of tab stops behind. The footer carries matching bottom
 * padding below `md` so the bar cannot cover the last line of the page.
 */
export function H1StickyCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const zones = Array.from(
      document.querySelectorAll<HTMLElement>('[data-sticky-cta="hide"]'),
    );
    if (zones.length === 0) return;

    const onScreen = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) onScreen.add(entry.target);
        else onScreen.delete(entry.target);
      }
      setShow(onScreen.size === 0);
    });
    zones.forEach((zone) => observer.observe(zone));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md transition-transform duration-300 md:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
      style={{
        borderColor: H1_PALETTE.line,
        backgroundColor: `${H1_PALETTE.ink}EB`,
      }}
      inert={!show || undefined}
      aria-hidden={!show || undefined}
    >
      <div className="flex gap-2.5">
        <button
          type="button"
          onClick={() => goToConsultation()}
          className="h1-tap h1-btn-gold inline-flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3.5 text-sm font-semibold"
        >
          Book a Free Consultation
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
        <a
          href={H1_PHONE_HREF}
          className="h1-tap inline-flex w-14 items-center justify-center rounded-xl border"
          style={{ borderColor: `${H1_PALETTE.chalk}33`, color: H1_PALETTE.chalk }}
          aria-label={`Call ${H1_PHONE}`}
        >
          <Phone className="h-5 w-5" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
