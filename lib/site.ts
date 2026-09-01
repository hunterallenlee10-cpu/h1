/**
 * The one place the site knows its own address.
 *
 * Nothing else may hardcode a domain: `metadataBase`, the canonical URL, and
 * every `@id` in the structured data read `SITE_URL`, so attaching the custom
 * domain is a matter of setting one environment variable.
 *
 * Resolution order:
 * 1. `NEXT_PUBLIC_SITE_URL` — set this once the custom domain is attached, so
 *    canonical links name the domain rather than the *.vercel.app alias.
 * 2. `VERCEL_PROJECT_PRODUCTION_URL` — provided by Vercel on every deployment,
 *    so a fresh import works with no configuration at all.
 * 3. localhost, for `next dev` and `next build` on a laptop.
 */
function resolveSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configured) return configured.replace(/\/+$/, "");

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercel) return `https://${vercel.replace(/\/+$/, "")}`;

  return "http://localhost:3000";
}

export const SITE_URL = resolveSiteUrl();

export const SITE_NAME = "H1 Performance";

export const SITE_TITLE =
  "H1 Performance | Remote Strength & Conditioning for Athletes";

export const SITE_DESCRIPTION =
  "Personalized remote strength and conditioning for athletes of any age and any sport. Custom 4-week training blocks, nutrition and supplement research, and round-the-clock access to your coaches.";

/** The parent company. The footer links back to it and to the policies it publishes. */
export const PARENT_SITE_URL = "https://leeenterprisesunlimited.com";
export const PARENT_NAME = "Lee Enterprises Unlimited";
