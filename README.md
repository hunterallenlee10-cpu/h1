# H1 Performance

The website for H1 Performance — remote strength and conditioning for athletes
of any age and any sport. A
[Lee Enterprises Unlimited](https://leeenterprisesunlimited.com) venture.

> The site's own domain is not attached yet. Once it is, set
> `NEXT_PUBLIC_SITE_URL` to it (see below) and link it here.

One page, one API route. The page sells the program and books consultations;
it does not take payment.

The site was built as `/h1-performance` inside the
[Lee Enterprises Unlimited repo](https://github.com/hunterallenlee10-cpu/leu)
and moved here on 2026-09-01 to run on its own domain. `docs/H1.md` is the
build spec: every figure, testimonial, and credential on the page has a source
recorded there. Read it before changing any of them.

## Stack

- [Next.js](https://nextjs.org) 16 (App Router), React 19, TypeScript
- Tailwind CSS 4
- [Resend](https://resend.com) for the consultation form
- Vercel Analytics (production only)

## Getting started

```bash
pnpm install
cp .env.example .env.local   # then fill in RESEND_API_KEY to test the form
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

Before pushing:

```bash
pnpm lint
pnpm typecheck
pnpm build
```

## Where things live

| Path | What |
| --- | --- |
| `data/h1.ts` | Every word and number on the page: palette, proof points, packages, coaches, testimonials, FAQ |
| `types/index.ts` | The shapes of the above. The proof-point union is what stops a figure shipping without its attribution |
| `components/h1/` | The sections, top to bottom, plus the shared heading, ticker, result charts, rotator and mobile booking bar |
| `components/layout/` | Header and footer |
| `app/page.tsx` | The page and its structured data |
| `app/api/h1-consultation/route.ts` | The consultation form handler |
| `app/icon.tsx`, `app/apple-icon.tsx`, `app/opengraph-image.tsx` | Favicon, home-screen icon, and link preview, generated at build time from the mark |
| `lib/site.ts` | The site's own URL and name. Nothing else hardcodes a domain |
| `lib/consultation.ts` | `goToConsultation()` — scroll to the form, optionally pre-selecting a package |
| `lib/og.ts`, `assets/og/` | The link preview's own font files (SIL OFL, licence beside them) and athlete PNG. Not served to visitors |
| `public/h1/` | Coach and athlete photos; `cutouts/` holds the background-removed coach photos used in the hero and on the coach cards |
| `docs/H1.md` | The build spec and content rules. §9 covers the 2026-10 redesign: the design system, the motion rules, and why each new display stays within the sourcing rules |

## Environment variables

See `.env.example` for the full list with notes. In short:

| Variable | Required | Purpose |
| --- | --- | --- |
| `RESEND_API_KEY` | In production | Sends the consultation form |
| `CONTACT_FROM_EMAIL` | No | Sender address. Defaults to `noreply@leeenterprisesunlimited.com`; set it to an address on a Resend-verified domain so delivery is not refused |
| `CONTACT_TO_EMAIL` | No | Recipient. Defaults to the Lee Enterprises inbox |
| `H1_TO_EMAIL` | No | Overrides the recipient for H1 leads only |
| `NEXT_PUBLIC_SITE_URL` | Once the domain is attached | Canonical origin for metadata and structured data |

## Deploying

The site is a standard Next.js app and deploys to Vercel with no extra
configuration:

1. In Vercel, **Add New → Project** and import this repository. The defaults
   (framework: Next.js, build: `next build`) are correct.
2. Add `RESEND_API_KEY` and `CONTACT_FROM_EMAIL` as sensitive environment
   variables. The form fails with `email_not_configured` until the key is set.
3. Deploy. The `*.vercel.app` URL works immediately; `lib/site.ts` picks it up
   from Vercel's own `VERCEL_PROJECT_PRODUCTION_URL`.
4. Open the project's **Analytics** tab and click **Enable** (Web Analytics).
   `<Analytics />` runs in production; until this is on, `/_vercel/insights/script.js`
   returns 404 and no pageviews are recorded.
5. Attach the custom domain, then set `NEXT_PUBLIC_SITE_URL` to it and
   redeploy, so canonical links and the structured data name the domain.
6. In the **Lee Enterprises Unlimited** Vercel project, set
   `NEXT_PUBLIC_H1_SITE_URL` to this site's confirmed URL and redeploy it. That
   one variable drives the parent site's redirect from
   `leeenterprisesunlimited.com/h1-performance`, its Ventures menu entry, and
   its portfolio link. Do this **before** deploying the parent's split branch:
   its `/h1-performance` redirect becomes a permanent (308) redirect once the
   variable is set, so this URL must already answer.

Every merge to `main` deploys once the project is connected.

## Relationship to the parent site

- `leeenterprisesunlimited.com/h1-performance` redirects here permanently.
- The parent's Ventures menu, footer, and "own sites" portfolio link here.
- The consultation form delivers to the same inbox as the parent site's forms,
  with its own subject line. Set `H1_TO_EMAIL` to route it elsewhere.
- Invoicing still runs through the parent's Stripe integration, where H1 is
  the `h1` venture. This site takes no payment.
- Thread T-Shirts, on the parent site, sells the H1 apparel line. The footer
  links to it.
