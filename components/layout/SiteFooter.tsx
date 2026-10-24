import Image from "next/image";
import { Phone } from "lucide-react";
import { H1_PALETTE, H1_PHONE, H1_PHONE_HREF } from "@/data/h1";
import { consultationHref, siteNav } from "@/data/navigation";
import { PARENT_NAME, PARENT_SITE_URL, SITE_NAME } from "@/lib/site";

/**
 * H1 is a Lee Enterprises Unlimited venture, and the consultation form
 * delivers to LEU's inbox, so the policies that apply are the ones LEU
 * publishes. They are linked rather than copied: one set of terms, maintained
 * in one place. Thread T-Shirts sells H1's own apparel, which is why it is the
 * one sibling venture named here.
 */
const parentLinks = [
  { label: PARENT_NAME, href: PARENT_SITE_URL },
  { label: "H1 apparel at Thread T-Shirts", href: `${PARENT_SITE_URL}/thread-t-shirts` },
  { label: "Privacy Policy", href: `${PARENT_SITE_URL}/#privacy` },
  { label: "Terms of Service", href: `${PARENT_SITE_URL}/#terms` },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t"
      style={{ borderColor: H1_PALETTE.line, backgroundColor: H1_PALETTE.ink }}
    >
      {/* Bottom padding below `md` clears the sticky consultation bar. */}
      <div className="section-container pb-28 pt-12 md:py-16">
        <div className="mb-12 grid grid-cols-1 gap-10 md:grid-cols-3">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <Image
                src="/logos/h1-performance-white.png"
                alt=""
                width={40}
                height={48}
                loading="lazy"
                className="h-12 w-auto"
              />
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-white">
                {SITE_NAME}
              </p>
            </div>
            <p className="max-w-xs text-sm leading-relaxed" style={{ color: H1_PALETTE.muted }}>
              Remote strength and conditioning for athletes of any age and any
              sport. Custom four-week blocks, built around the equipment you
              already have.
            </p>
            <a
              href={H1_PHONE_HREF}
              className="h1-muted-link mt-5 inline-flex items-center gap-2 text-sm font-semibold"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {H1_PHONE}
            </a>
          </div>

          {/* Labelled differently from the header's "Sections" nav so a
              screen reader's landmark list tells the two apart. */}
          <nav aria-label="On this page">
            <h2 className="h1-eyebrow mb-4 text-white">
              On this page
            </h2>
            <ul className="space-y-2">
              {siteNav.map((item) => (
                <li key={item.id}>
                  <a href={item.href} className="h1-muted-link text-sm">
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a href={consultationHref} className="h1-muted-link text-sm">
                  Book a Free Consultation
                </a>
              </li>
            </ul>
          </nav>

          <nav aria-label={PARENT_NAME}>
            <h2 className="h1-eyebrow mb-4 text-white">
              {PARENT_NAME}
            </h2>
            <ul className="space-y-2">
              {parentLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="h1-muted-link text-sm">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* The sign-off: the name across the full width, outlined, sitting
            on the copyright line like a wordmark painted on an outfield wall.
            Decorative — the name is already the footer's first text. */}
        {/* Sized to its container, not the viewport: the line is 6.12em
            wide in Barlow Condensed 800, so 16cqi sets it at 98% of the
            column at every width with no overflow to clip. */}
        <div className="[container-type:inline-size]">
          <p
            className="h1-display h1-outline-text pointer-events-none mb-6 select-none whitespace-nowrap text-center text-[16cqi] leading-[0.8]"
            aria-hidden="true"
          >
            H1 Performance
          </p>
        </div>

        <div
          className="flex flex-col items-center justify-between gap-2 border-t pt-8 text-center text-sm md:flex-row md:text-left"
          style={{ borderColor: H1_PALETTE.line, color: H1_PALETTE.muted }}
        >
          <p>
            © {year} {SITE_NAME}. All rights reserved.
          </p>
          <p>
            A{" "}
            <a href={PARENT_SITE_URL} className="h1-muted-link font-semibold">
              {PARENT_NAME}
            </a>{" "}
            venture.
          </p>
        </div>
      </div>
    </footer>
  );
}
