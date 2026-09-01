/**
 * Smooth scroll to an element and optionally focus on it.
 *
 * The header is 80px tall and fixed, which is what the default offset clears.
 * `html` also carries `scroll-padding-top: 80px` in globals.css so that plain
 * `href="#section"` anchors land in the same place without this helper.
 */
export function smoothScrollToElement(
  elementId: string,
  options?: { focus?: boolean; offset?: number }
): void {
  if (typeof window === "undefined") return;

  const element = document.getElementById(elementId);
  if (!element) return;

  const offset = options?.offset || 80;
  const elementPosition =
    element.getBoundingClientRect().top + window.scrollY - offset;

  window.scrollTo({
    top: elementPosition,
    behavior: "smooth",
  });

  // Focus on element for accessibility
  if (options?.focus) {
    setTimeout(() => {
      element.focus({ preventScroll: true });
    }, 100);
  }
}
