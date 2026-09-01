import { H1_PHONE, h1Coaches, h1Faqs, h1Packages } from "@/data/h1";
import {
  PARENT_NAME,
  PARENT_SITE_URL,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site";
import { H1HeroSection } from "@/components/h1/H1HeroSection";
import { H1ResultsStrip } from "@/components/h1/H1ResultsStrip";
import { H1ProblemSection } from "@/components/h1/H1ProblemSection";
import { H1ProgramSection } from "@/components/h1/H1ProgramSection";
import { H1CultureSection } from "@/components/h1/H1CultureSection";
import { H1CoachesSection } from "@/components/h1/H1CoachesSection";
import { H1ProcessSection } from "@/components/h1/H1ProcessSection";
import { H1PricingSection } from "@/components/h1/H1PricingSection";
import { H1TestimonialsSection } from "@/components/h1/H1TestimonialsSection";
import { H1FAQSection } from "@/components/h1/H1FAQSection";
import { H1ConsultationForm } from "@/components/h1/H1ConsultationForm";
import { H1CTASection } from "@/components/h1/H1CTASection";

/**
 * Structured data covers only what the site can substantiate: who provides the
 * service, the two packages priced on the page, the coaches, and the FAQ
 * rendered below. No ratings and no review counts — the testimonials on the
 * page are quotes, not star ratings, and the structured data must not imply an
 * aggregate that was never given. docs/H1.md §3.
 *
 * A package with a null price carries no `price` on its Offer: an Offer with no
 * price is worse than no Offer at all.
 *
 * Every `@id` and `url` is built from SITE_URL, so attaching the custom domain
 * is one environment variable and nothing here.
 */
const organizationId = `${SITE_URL}/#organization`;

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": organizationId,
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/logos/h1-performance-white.png`,
      telephone: H1_PHONE,
      parentOrganization: {
        "@type": "Organization",
        name: PARENT_NAME,
        url: PARENT_SITE_URL,
      },
      employee: h1Coaches.map(({ name, role }) => ({
        "@type": "Person",
        name,
        jobTitle: role,
      })),
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      publisher: { "@id": organizationId },
    },
    {
      "@type": "Service",
      "@id": `${SITE_URL}/#service`,
      name: "H1 Performance Strength & Conditioning",
      description: SITE_DESCRIPTION,
      serviceType: "Remote athletic strength and conditioning coaching",
      url: SITE_URL,
      // The phone number lives on the Organization node above (a schema.org
      // Service has no `telephone` property); the provider reference points a
      // consumer there.
      areaServed: "US",
      provider: { "@id": organizationId },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Training Packages",
        itemListElement: h1Packages.map((pkg) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: pkg.name },
          ...(pkg.price
            ? {
                price: pkg.price.replace(/[^0-9.]/g, ""),
                priceCurrency: "USD",
              }
            : {}),
        })),
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: h1Faqs.map(({ question, answer }) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* pt-20 clears the fixed 80px header. `id`/`tabIndex` make it the skip
          link's target (app/layout.tsx). */}
      <main id="main-content" tabIndex={-1} className="pt-20">
        <H1HeroSection />
        <H1ResultsStrip />
        <H1ProblemSection />
        <H1ProgramSection />
        <H1CultureSection />
        <H1CoachesSection />
        <H1ProcessSection />
        <H1PricingSection />
        <H1TestimonialsSection />
        <H1FAQSection />
        <H1ConsultationForm />
        <H1CTASection />
      </main>
    </>
  );
}
