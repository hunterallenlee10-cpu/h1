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
  const [activeId, setActiveId] = useState<string | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Scroll spy: which section is under the reading line, a band a little
  // below the header. The links work without it; this only adds the gold
  // "you are here" state, marked with `aria-current` so it is announced too.
  // Sections missing from the page (the 404) are simply never observed.
  useEffect(() => {
    const ids = siteNav.map((item) => item.href.slice(2));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        // The last section in page order that is on the line wins, so
        // a short section is not shadowed by the tall one before it.
        const current = [...ids].reverse().find((id) => visible.has(id));
        setActiveId(current ?? null);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

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
            preload
            className="h-10 w-auto"
          />
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-white">
            H1 Performance
          </span>
        </Link>

        <nav
          aria-label="Sections"
          className="hidden items-center gap-6 lg:flex xl:gap-8"
        >
          {siteNav.map((item) => (
            <a
              key={item.id}
              href={item.href}
              aria-current={activeId === item.href.slice(2) ? "true" : undefined}
              className="h1-nav-link font-mono text-xs font-medium uppercase tracking-[0.14em]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-5 sm:flex">
          {/* The number moves into the menu below `xl`: six section links,
              the mark and the CTA already fill the bar at `lg`. */}
          <a
            href={H1_PHONE_HREF}
            className="h1-nav-link hidden items-center gap-2 text-sm font-semibold xl:inline-flex"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {H1_PHONE}
          </a>
          {/* Shortened between `lg` and `xl`, where the full label beside six
              section links would wrap onto two lines. */}
          <a
            href={consultationHref}
            className="h1-tap h1-btn-gold inline-flex items-center justify-center whitespace-nowrap rounded-lg px-5 py-2.5 text-sm font-semibold"
          >
            <span className="lg:hidden xl:inline">Book a Free Consultation</span>
            <span className="hidden lg:inline xl:hidden">Free Consultation</span>
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

      {/* Reading progress, on the header's bottom edge. CSS-only; see
          `.h1-progress` in globals.css. */}
      <div
        className="h1-progress pointer-events-none absolute inset-x-0 bottom-[-1px] h-[2px]"
        style={{
          background: `linear-gradient(90deg, ${H1_PALETTE.goldDeep}, ${H1_PALETTE.gold})`,
        }}
        aria-hidden="true"
      />

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
              aria-current={activeId === item.href.slice(2) ? "true" : undefined}
              className="h1-display rounded-lg px-4 py-3 text-3xl text-white transition-colors hover:bg-white/5 aria-[current=true]:text-[var(--h1c-gold)]"
            >
              {item.label}
            </a>
          ))}
          <a
            href={H1_PHONE_HREF}
            onClick={closeMenu}
            className="inline-flex items-center gap-2 rounded-lg px-4 py-3 text-base font-medium text-white transition-colors hover:bg-white/5"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            Call {H1_PHONE}
          </a>
          <a
            href={consultationHref}
            onClick={closeMenu}
            className="h1-tap h1-btn-gold mt-3 inline-flex items-center justify-center rounded-lg px-5 py-3 text-base font-semibold sm:hidden"
          >
            Book a Free Consultation
          </a>
        </nav>
      </div>
    </header>
  );
}
