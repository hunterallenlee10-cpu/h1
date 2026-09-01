/**
 * Security headers for a site with no third-party embeds.
 *
 * Nothing here loads from another origin: next/font self-hosts Geist, Vercel
 * Analytics is served from /_vercel on the same origin, and the consultation
 * form posts to /api on this site. So the policy is 'self' everywhere, plus the
 * two allowances Next.js itself needs: 'unsafe-inline' in script-src for the
 * hydration bootstrap, and in style-src for the inline style attributes the
 * components use to carry the palette. To drop the script-src allowance,
 * generate a per-request nonce in middleware and emit the CSP from there.
 *
 * If a third-party script or frame is ever added (a booking widget, a payment
 * form), it needs its origin listed here first or it will be blocked silently.
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "frame-src 'none'",
  "form-action 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Carried over from the parent site as-is. The photos are pre-cropped to
    // the sizes the cards request, so they ship unchanged rather than through
    // the optimizer; turning this off is a deliberate change, not a cleanup.
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      // The page lived at leeenterprisesunlimited.com/h1-performance before it
      // had its own domain. The parent site redirects that path here; this
      // catches anyone who kept the old path but swapped in the new host.
      {
        source: "/h1-performance",
        destination: "/",
        permanent: true,
      },
      {
        source: "/h1-performance/:path*",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
