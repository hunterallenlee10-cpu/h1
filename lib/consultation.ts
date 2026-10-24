import { smoothScrollToElement } from "@/lib/scrollUtils";

/**
 * Fired when a control on the page asks for the consultation form with a
 * package already chosen — the pricing cards do this. `H1ConsultationForm`
 * listens and fills its package question with `detail`, which must be one of
 * the form's own package options (an `H1Package.name`). Anything else is
 * ignored by the form rather than written into the select.
 */
export const CHOOSE_PACKAGE_EVENT = "h1:choose-package";

export type ChoosePackageEvent = CustomEvent<string>;

/**
 * Scroll to the consultation form and move focus there, optionally choosing a
 * package on the way. Every "book a consultation" button on the page that is
 * a button rather than a link calls this, so they all land identically.
 */
export function goToConsultation(packageName?: string): void {
  if (typeof window === "undefined") return;
  if (packageName) {
    window.dispatchEvent(
      new CustomEvent(CHOOSE_PACKAGE_EVENT, { detail: packageName }),
    );
  }
  smoothScrollToElement("h1-consultation-form", { focus: true });
}
