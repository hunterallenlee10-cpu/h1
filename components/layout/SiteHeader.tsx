"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, Phone, X } from "lucide-react";
import { H1_PALETTE, H1_PHONE, H1_PHONE_HREF } from "@/data/h1";
import { consultationHref, siteNav } from "@/data/navigation";

/**
 * The header for a one-page site: the mark, an anchor bar for the sections,
 * the phone number, and the one call to action.
 *
 * Section links are plain anchors on purpose. `html` carries `scroll-smooth`
 * and `scroll-padding-top: 80px` in globals.css, so a bare `href="#h1-pricing"`
 * scrolls smoothly and lands under this header without any JavaScript — which
 * also means the nav works before hydration and with scripts off. The only
 * client state here is the scrolled surface and the phone menu.
 *
 * Exactly 80px tall, border included: the bar is `5rem - 1px` under a 1px
 * bottom border. `pt-20` on `<main>`, `scroll-padding-top` in globals.css, and
 * the default offset in lib/scrollUtils.ts all assume 80px; change all four
 * together or the sections land under the bar.
 */
export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        // Return focus to the control that opened the menu, so a keyboard user
        // is not dropped at the top of the document after dismissing it.
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  const solid = isScrolled || menuOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-300 ${
        solid ? "backdrop-blur-md" : "backdrop-blur-sm"
      }`}
      style={{
        // Ink at 95% once scrolled or open, 50% over the hero — the same
        // treatment the parent site's header used, in this palette.
        backgroundColor: solid ? `${H1_PALETTE.ink}F2` : `${H1_PALETTE.ink}80`,
        borderColor: solid ? H1_PALETTE.line : "transparent",
      }}
    >
      <div className="section-container flex h-[calc(5rem-1px)] items-center justify-between gap-6">
        <Link
          href="/"
          onClick={closeMenu}
          className="flex shrink-0 items-center gap-3 rounded-md"
          aria-label="H1 Performance — back to top"
        >
          <Image
            src="/logos/h1-performance-white.png"
            alt=""
            // Portrait mark (1644x2000), on its own ratio at 40px tall.
            width={33}
            height={40}
            priority
            className="h-10 w-auto"
          />
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-white">
            H1 Performance
          </span>
        </Link>

        <nav
          aria-label="Sections"
          className="hidden items-center gap-8 lg:flex"
        >
          {siteNav.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className="h1-nav-link text-sm font-medium"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-5 sm:flex">
          <a
            href={H1_PHONE_HREF}
            className="h1-nav-link inline-flex items-center gap-2 text-sm font-semibold"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {H1_PHONE}
          </a>
          <a
            href={consultationHref}
            className="h1-tap inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-semibold"
            style={{ backgroundColor: H1_PALETTE.gold, color: H1_PALETTE.ink }}
          >
            Book a Free Consultation
          </a>
        </div>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="h1-tap -mr-2 rounded-md p-2 text-white lg:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="site-menu"
        >
          {menuOpen ? (
            <X className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Phone and tablet menu. Always in the DOM so `aria-controls` above
          points at something; `hidden` does the toggling. It lists every
          section plus the two actions the bar shows on wider screens, so
          nothing reachable on desktop is unreachable on a phone.

          Capped at the viewport height below the 80px bar and allowed to
          scroll: on a short viewport (a phone in landscape) the full list is
          taller than the screen, and without this its lower items — the phone
          link and the consultation CTA — would fall off the bottom with no way
          to reach them. `overscroll-contain` keeps that inner scroll from
          chaining to the page behind it. */}
      <div
        id="site-menu"
        hidden={!menuOpen}
        className="max-h-[calc(100dvh-80px)] overflow-y-auto overscroll-contain border-t lg:hidden"
        style={{
          borderColor: H1_PALETTE.line,
          backgroundColor: H1_PALETTE.ink,
        }}
      >
        <nav
          aria-label="Sections"
          className="section-container flex flex-col gap-1 py-4"
        >
          {siteNav.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={closeMenu}
              className="rounded-lg px-4 py-3 text-base font-medium text-white transition-colors hover:bg-white/5"
            >
              {item.label}
            </a>
          ))}
          <a
            href={H1_PHONE_HREF}
            onClick={closeMenu}
            className="inline-flex items-center gap-2 rounded-lg px-4 py-3 text-base font-medium text-white transition-colors hover:bg-white/5 sm:hidden"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            Call {H1_PHONE}
          </a>
          <a
            href={consultationHref}
            onClick={closeMenu}
            className="h1-tap mt-3 inline-flex items-center justify-center rounded-lg px-5 py-3 text-base font-semibold sm:hidden"
            style={{ backgroundColor: H1_PALETTE.gold, color: H1_PALETTE.ink }}
          >
            Book a Free Consultation
          </a>
        </nav>
      </div>
    </header>
  );
}
