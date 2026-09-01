/**
 * The header and footer navigation. One page, so every entry is a fragment link
 * to a section on it.
 *
 * The hrefs are root-anchored (`/#…`, not `#…`) so they resolve from any route,
 * not just the home page: on the 404 page a bare `#h1-pricing` would be inert,
 * while `/#h1-pricing` navigates home and lands on the section. On the home page
 * itself the browser treats a `/#…` click as an in-page fragment navigation —
 * no reload — and `scroll-smooth` plus `scroll-padding-top: 80px` in globals.css
 * carry the scroll, so the same links work smoothly everywhere with no
 * JavaScript. The `/#` prefix is enforced by the type so a bare hash cannot
 * sneak back in.
 *
 * Every id here (the part after `/#`) must exist on a `<section>` in
 * `components/h1/`. The order is the order the sections appear down the page.
 */
export interface SiteNavItem {
  id: string;
  label: string;
  href: `/#${string}`;
}

export const siteNav: readonly SiteNavItem[] = [
  { id: "nav-program", label: "Program", href: "/#h1-program" },
  { id: "nav-coaches", label: "Coaches", href: "/#h1-coaches" },
  { id: "nav-pricing", label: "Pricing", href: "/#h1-pricing" },
  { id: "nav-testimonials", label: "Athletes", href: "/#h1-testimonials" },
  { id: "nav-faq", label: "FAQ", href: "/#h1-faq" },
];

/** Where every "book a consultation" control on the site lands. */
export const consultationHref = "/#h1-consultation-form" as const;
