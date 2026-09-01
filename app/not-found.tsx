import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { H1_PALETTE } from "@/data/h1";
import { consultationHref } from "@/data/navigation";

// Overrides the layout's page metadata so a 404 does not advertise the home
// page's title, canonical and og:url or invite indexing. Next serves this route
// with an injected noindex already; this keeps the rest of the head honest.
export const metadata: Metadata = {
  title: "Page not found | H1 Performance",
  robots: { index: false, follow: false },
  alternates: { canonical: null },
  openGraph: { url: null },
};

export default function NotFound() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="flex min-h-screen items-center pt-20"
    >
      <div className="section-container py-20 text-center">
        <p
          className="mb-3 text-sm font-semibold uppercase tracking-widest"
          style={{ color: H1_PALETTE.gold }}
        >
          404
        </p>
        <h1 className="heading-lg mb-4 text-white">That page isn't here.</h1>
        <p
          className="mx-auto mb-10 max-w-xl text-lg"
          style={{ color: H1_PALETTE.muted }}
        >
          Everything about the program — packages, coaches, results, and the
          consultation form — is on the one page.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="h1-tap group inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-semibold"
            style={{ backgroundColor: H1_PALETTE.gold, color: H1_PALETTE.ink }}
          >
            <ArrowLeft
              className="h-5 w-5 transition-transform group-hover:-translate-x-1"
              aria-hidden="true"
            />
            Back to H1 Performance
          </Link>
          <Link
            href={consultationHref}
            className="h1-tap inline-flex items-center justify-center rounded-lg border-2 px-6 py-3 font-semibold"
            style={{ borderColor: H1_PALETTE.chalk, color: H1_PALETTE.chalk }}
          >
            Book a Free Consultation
          </Link>
        </div>
      </div>
    </main>
  );
}
