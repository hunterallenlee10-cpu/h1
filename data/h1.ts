import {
  H1Coach,
  H1Faq,
  H1Package,
  H1ProcessStep,
  H1ProgramFeature,
  H1ProofPoint,
  H1Testimonial,
} from "@/types";

/**
 * The site palette. Every component reads from here, and app/layout.tsx sets
 * each value as a `--h1c-*` custom property on `<html>` for the stylesheet.
 *
 * `gold` matches `VENTURE_COLORS.h1` in the Lee Enterprises Unlimited repo,
 * which styles the H1 card on the parent homepage — gold-on-black, near enough
 * to the LEU parent gold and to Lee Marketing Mastery's amber that the family
 * of sites reads as one brand. If either side ever changes, change the other.
 *
 * H1's own mark is white on black, so this palette leads with chalk white and
 * keeps gold as an accent. That inverts LMM's amber-dominant look while staying
 * true to the logo.
 */
export const H1_PALETTE = {
  /** Page background. */
  ink: "#08090A",
  /** Raised surfaces — cards, panels. */
  steel: "#12141A",
  /** Primary type and primary buttons. Always with `ink` text on top. */
  chalk: "#F5F7FA",
  /** Accent: badges, stat figures, icon strokes. Matches VENTURE_COLORS.h1. */
  gold: "#FFD700",
  /** Hovers and gradient ends. */
  goldDeep: "#E0AC00",
  /** Hairlines and card borders. */
  line: "#23262E",
  /** Secondary type. */
  muted: "#8C93A1",
} as const;

/** Public phone number, taken from the H1 flyer. */
export const H1_PHONE = "240-925-2609";
export const H1_PHONE_HREF = "tel:+12409252609";

/**
 * Every measured result this page claims, in one array. The hero readout
 * rotates them and the results strip lists them, both from here — two arrays
 * carrying the same public claims is one edit away from the two sections
 * disagreeing about what an athlete achieved.
 *
 * Sources:
 * - 40-yard dash and powerlifting PR are quoted from H1's own Strength &
 *   Conditioning document — see docs/H1.md §3. That document does not say which
 *   sport the 40-yard athlete plays; the owner supplied "football player" on
 *   2026-08-04.
 * - 60-yard dash, bench press, batted-ball distance and exit velocity were all
 *   supplied by the owner on 2026-08-04.
 *
 * Do not round these, do not restate them as typical, and do not add to them
 * without a source. `5.1 → 4.5` is the published figure; it is not
 * `5.10 → 4.50`, and padding a decimal place to make a counter look smoother
 * would be inventing precision the client never claimed.
 *
 * Exit velocity and batted-ball distance are hitting metrics, which docs/H1.md
 * §2 previously kept off this page. The owner asked for both on 2026-08-04 —
 * see the dated note in that section.
 */
export const h1ProofPoints: H1ProofPoint[] = [
  {
    id: "h1-proof-forty",
    kind: "pair",
    label: "40-yard dash",
    from: 5.1,
    to: 4.5,
    precision: 1,
    scope: "individual",
    subject: "football player",
    period: "two months",
  },
  {
    id: "h1-proof-sixty",
    kind: "pair",
    label: "60-yard dash",
    from: 7.2,
    to: 6.6,
    precision: 1,
    scope: "individual",
    subject: "baseball player",
  },
  {
    id: "h1-proof-bench",
    kind: "pair",
    label: "Bench press",
    from: 120,
    to: 235,
    precision: 0,
    // The owner's figures came without a unit — "bench went from 120 to 235".
    // Confirmed as pounds by the owner on 2026-08-04.
    unit: "lb",
    scope: "individual",
    subject: "member",
    period: "six months",
  },
  {
    id: "h1-proof-pr",
    kind: "delta",
    label: "Powerlifting PR",
    figure: "+30%",
    scope: "individual",
    subject: "athlete",
    period: "one month",
  },
  {
    id: "h1-proof-distance",
    kind: "delta",
    label: "Batted-ball distance",
    figure: "+37%",
    scope: "average",
    subject: "baseball players",
  },
  {
    id: "h1-proof-exit-velo",
    kind: "delta",
    label: "Exit velocity",
    figure: "+20%",
    scope: "average",
    subject: "baseball players",
  },
];

/**
 * A proof point's figure as static text — `5.1 → 4.5`, `120 → 235 lb`, `+30%`.
 * The hero readout counts its figures up and so builds its own string
 * mid-animation, but it settles on exactly this, and everywhere else renders it
 * directly. One formatter means the strip and the hero cannot end up showing
 * the same result to different precision.
 */
export function proofFigure(point: H1ProofPoint): string {
  if (point.kind === "delta") {
    return point.figure;
  }
  const from = point.from.toFixed(point.precision);
  const to = point.to.toFixed(point.precision);
  return `${from} → ${to}${point.unit ? ` ${point.unit}` : ""}`;
}

/**
 * The one place the individual/average distinction turns into words. Everything
 * that displays a proof point calls this, so a figure cannot appear anywhere on
 * the site without saying whose result it is.
 */
export function proofAttribution(point: H1ProofPoint): string {
  // Averages name the program. "Average across baseball players" on its own can
  // be read as an industry-wide figure, which claims far more than the source.
  const who =
    point.scope === "average"
      ? `Average across H1 ${point.subject}`
      : `One ${point.subject}`;
  // `period` is composed in both branches. No average carries one today, but an
  // attribution that silently dropped a stated timeframe would leave the claim
  // less bounded than the thing it was sourced from.
  return point.period ? `${who} · ${point.period}` : who;
}

/**
 * Not a result — a program attribute, and deliberately not in `h1ProofPoints`
 * for that reason. It sat in the old results strip, so it keeps its place on
 * the page beside the rotating figures rather than being quietly dropped.
 * `h1ProgramFeatures` carries the same fact in full further down the page.
 */
export const h1BlockNote = {
  title: "4-week training blocks",
  detail: "Each one built on the last, never repeated blindly.",
} as const;

export const h1ProgramFeatures: H1ProgramFeature[] = [
  {
    id: "h1-feature-personalized",
    title: "A Plan Built Around You",
    description:
      "Your program is written for your sport, your training age, and the equipment you actually have access to. We set the plan to whatever your current setup is — a full weight room, a garage, or a single set of dumbbells.",
  },
  {
    id: "h1-feature-blocks",
    title: "Progressive 4-Week Blocks",
    description:
      "Each block is designed to build on the last, stacking real strength, speed, and durability that shows up on the field. No random workouts, no repeating the same month forever.",
  },
  {
    id: "h1-feature-access",
    title: "Round-the-Clock Coach Access",
    description:
      "Direct access to your coaches, not a chatbot and not a queue. Ask unlimited questions and get answers when you need them, whether that's before a lift or after a game.",
  },
  {
    id: "h1-feature-resources",
    title: "Resources Updated Daily",
    description:
      "The resource library is updated daily, with new material posted every month. Every day there is something new to learn and apply.",
  },
  {
    id: "h1-feature-research",
    title: "Supplement & Diet Research",
    description:
      "Large, continuously improving research documents covering supplements, nutrition, and recovery — written so an athlete can actually use them, and expanded as the research changes.",
  },
  {
    id: "h1-feature-community",
    title: "A Locked-In Training Group",
    description:
      "Access to every other athlete in the program, all grinding for the same thing. On the days you don't have it, the group does — everyone shows up with something to give.",
  },
];

/**
 * The group, in the owner's own words.
 *
 * `lead` is the owner's sentence, supplied 2026-08-04, edited only for
 * punctuation and for one word: they wrote "young men". The hero two sections
 * above promises "all ages, all sports", and docs/H1.md §2 is explicit that
 * content narrowing the audience makes that promise false — so it reads
 * "athletes". Everything else is theirs, including the cadence.
 *
 * The two points below are not new claims. Both are drawn from
 * `h1ProgramFeatures`, said in this section's register.
 */
export const h1CultureContent = {
  eyebrow: "The group",
  title: "You Don't Do This Alone",
  lead: "Join a group of dedicated athletes grinding every day to be their best selves. Even on your worst days, the group keeps you accountable — everyone wakes up with something to give and motivation to share.",
  points: [
    {
      id: "h1-culture-standard",
      title: "The standard is set by the group",
      detail:
        "You train alongside every other athlete in the program, all chasing the same thing. Showing up stops being a decision you make on your own.",
    },
    {
      id: "h1-culture-coaches",
      title: "Your coaches are in it with you",
      detail:
        "Round-the-clock access, not a chatbot and not a queue. Ask before a lift or after a game and get a real answer.",
    },
  ],
} as const;

/**
 * `price` is a display string, or null to render "Pricing on request".
 * The Committed tier is deliberately null — see docs/H1.md §1. Set it here and
 * nowhere else once the figure is confirmed.
 */
export const h1Packages: H1Package[] = [
  {
    id: "h1-basic",
    name: "Basic Strength Package",
    price: "$50",
    period: "per month",
    summary:
      "Everything you need to start training with a real plan and work up to a full professional lifting schedule.",
    features: [
      "Fully custom training plan built for your goals",
      "Programming matched to your current equipment and schedule",
      "Progressive 4-week blocks that build on each other",
      "Direct access to your coaches for questions",
      "Daily-updated resource library",
      "Access to the H1 athlete training group",
    ],
    highlighted: false,
    ctaLabel: "Start With Basic",
  },
  {
    id: "h1-committed",
    name: "Committed Strength Package",
    price: "$99",
    period: "per month",
    summary:
      "Everything in Basic, plus the full library of supplemental resources — nutrition, recovery, and the mental side of competing.",
    features: [
      "Everything in the Basic Strength Package",
      "Supplement research PDF, updated monthly",
      "Personalized diet plan built for your body and sport",
      "In-depth recovery and mobility guidance",
      "Goal setting and competitive mentality coaching",
      "Every supplemental resource H1 produces",
    ],
    highlighted: true,
    ctaLabel: "Go Committed",
  },
];

export const h1ProcessSteps: H1ProcessStep[] = [
  {
    id: "h1-step-1",
    step: 1,
    title: "Tell Us Where You're At",
    description:
      "Send a request with your sport, your goals, and what you're training with right now. There is no cost and no obligation to find out whether this is a fit.",
  },
  {
    id: "h1-step-2",
    step: 2,
    title: "We Build Your Plan",
    description:
      "Your coaches write a program around your setup — your equipment, your season, and your training experience. Nothing is copied off a template.",
  },
  {
    id: "h1-step-3",
    step: 3,
    title: "Train Your First Block",
    description:
      "You start a four-week block with a clear plan for every session, plus the full resource library and the athlete group from day one.",
  },
  {
    id: "h1-step-4",
    step: 4,
    title: "Adjust and Stack",
    description:
      "Ask questions any time and we adjust as you go. When the block ends, the next one is built on what you just did — not reset to zero.",
  },
];

/**
 * Credentials transcribed from the H1 flyer. Every line is the client's own
 * claim about their own record — do not add accolades that aren't on the flyer.
 *
 * Photo assignment confirmed by the client: Hunter in the Leonardtown uniform,
 * Aaron in the St. Mary's Seahawks uniform.
 */
export const h1Coaches: H1Coach[] = [
  {
    id: "h1-coach-hunter",
    name: "Hunter Lee",
    role: "Founder",
    photo: "/h1/hunter-lee.jpg",
    photoAlt: "Hunter Lee at bat in a Leonardtown High School uniform",
    credentials: [
      "2024 4A State Champion",
      "1st Team All-SMAC (Leonardtown)",
      "Leonardtown single-season and career home run leader",
      "Several additional offensive and defensive records at LHS",
      "Played at a top-5 JUCO in the nation, transferring to St. Mary's College of Maryland",
      "2024 Leonardtown High School alumnus",
    ],
  },
  {
    id: "h1-coach-aaron",
    name: "Aaron Wathen",
    role: "Co-Founder",
    photo: "/h1/aaron-wathen.jpg",
    photoAlt:
      "Aaron Wathen on the field in a St. Mary's College of Maryland uniform",
    credentials: [
      "2021 American Legion World Series",
      "1st Team All-United East (St. Mary's)",
      "Current active St. Mary's hits, RBI, and batting average leader",
      "Career at St. Mary's — .360 AVG, .934 OPS",
      "Current infielder at St. Mary's College of Maryland",
      "2023 Leonardtown High School alumnus",
    ],
  },
];

/**
 * Owner-supplied quotes, published verbatim — see docs/H1.md §3. The
 * placeholder state in `H1TestimonialsSection` still exists: empty this array
 * and it returns, inventing nothing.
 *
 * Rules for adding an entry:
 * - The quote goes in exactly as the athlete sent it, punctuation and all.
 *   The placeholder promised "posted the way they send them"; the grid keeps
 *   that promise.
 * - Results inside a quote are the athlete's claim in the athlete's words.
 *   They do not graduate into `h1ProofPoints` — that array is owner-published
 *   figures with their own sourcing rules.
 * - `photo` is optional. The file lives in `public/h1/testimonials/`,
 *   pre-cropped to the card's 4:3 header so `object-cover` needs no
 *   per-photo position tuning. Cards without one render with no gap.
 * - Most H1 athletes are minors. The owner was reminded on 2026-08-05 that a
 *   minor's name, photo, and words need a parent or guardian's okay before
 *   publication; an entry arriving here means the owner has that handled.
 */
export const h1Testimonials: H1Testimonial[] = [
  {
    id: "h1-testimonial-mike-bittle",
    // Supplied by the owner on 2026-08-05, verbatim.
    quote:
      "I’ve been training with H1 performance for over a year and can say that it has made me a better player mentally and physically. Training with H1 has helped me understand not only how to hit for power but do it consistently. My EV jumped from 82-97 mph in just under a year of training. I’ve definitely had my ups and downs in sports & wanted to even quit training at one time, but Hunter and I had an open & honest phone call about my doubts which was a massive turning point. I ended up hitting my first home run later that same week. The challenges in the group chat pushed me to my best including some great prizes, (Cat X Bat, Custom Glove, free lessons, and more).",
    name: "Mike Bittle",
    detail: "Baseball, Class of 2027",
    photo: {
      src: "/h1/testimonials/mike-bittle.jpg",
      alt: "Mike Bittle at the plate at night in a black L-Town uniform, bat in hand",
    },
  },
  {
    id: "h1-testimonial-colt-keen",
    // Supplied by the owner on 2026-08-05, verbatim.
    quote:
      "Joining H1 performance group has been one of the best decisions I’ve made. It pushed me to get stronger and stay disciplined even on the days I didn’t feel motivated. What makes Hunter and H1 performance so great is more than just training, it helped me become a better person by teaching me the value of hard work, consistency, and accountability. Hunter is an outstanding leader who genuinely cares about everyone in the group and always pushes us to be our best. I owe a lot of my success in athletics to Hunter and H1 performance, this investment is a game-changer.",
    name: "Colt Keen",
    detail: "Baseball, Class of 2028",
    photo: {
      src: "/h1/testimonials/colt-keen.jpg",
      alt: "Colt Keen celebrating in an L-Town uniform after crossing the plate",
    },
  },
  {
    id: "h1-testimonial-noah-earhart",
    // Supplied by the owner on 2026-08-06, verbatim.
    quote:
      "Before I started training with H1 I was batting bottom of my team’s line up and maxing out at 55 EV. After starting with H1 I improved immediately, the games after my first session I went 2 for 4 with a game tying single. To finish off my season I had more success, going 2 for 3 in the championship game. The mentality shift this training provides is game changing. My exit velocity has had a huge jump from 55 to now 70mph in just one month of training. Training with H1 has been the best decision I’ve made athletically.",
    name: "Noah Earhart",
    detail: "Baseball, Class of 2029",
    photo: {
      src: "/h1/testimonials/noah-earhart.jpg",
      alt: "Noah Earhart mid-delivery on the mound during a night game, glove raised and front leg driven up",
    },
  },
  {
    id: "h1-testimonial-nick-hevner",
    // Supplied by the owner on 2026-08-06, verbatim.
    quote:
      "I have only been part of the program for less than a month, but H1 Performance has already provided me a lot of insight and knowledge that has improved me as an athlete. In 19 years of life I never have been able to properly load and use the lower half in my swing until I came here. They taught me things that will help me succeed at the next level of baseball and they helped me build insight by digging deep into the science and the fundamentals of training which helped bring awareness to how I should be producing power & consistency, connecting the training to baseball. The topics are perfectly explained, and gone over multiple times. They always incorporate videos and help answer any questions immediately. I enjoy the guys I work with and grind to get 1% better everyday, the group aspect of it all is truly the best part.",
    name: "Nick Hevner",
    detail: "Baseball, College Class of 2029",
    photo: {
      src: "/h1/testimonials/nick-hevner.jpg",
      alt: "Nick Hevner shouting in celebration in a white and gold Hornets uniform, dust hanging in the air behind him",
    },
  },
  {
    id: "h1-testimonial-alex-vasquez",
    // Supplied by the owner on 2026-08-07, verbatim.
    quote:
      "I personally think the H1 staff runs their program very well. I have learned so much since I joined. They treat everyone with respect, care, and try their hardest to make everyone the best they can be. They value both the physical and mental side of the game with their available resources such as a work out plan but also communicate very often in a group chat where they talk about the mental side of baseball and life as well. They provide drills, videos, direct feedback, motivation, personal preferences, and work hard to make sure everyone gets what they need in order to succeed. You must apply yourself both at home and at the training sessions so you can improve at light speed.",
    name: "Alex Vasquez",
    detail: "Baseball, Class of 2029",
    photo: {
      src: "/h1/testimonials/alex-vasquez.jpg",
      alt: "Alex Vasquez at the plate in a white Senators uniform, bat cocked in his stance with the catcher set behind him",
    },
  },
];

export const h1Faqs: H1Faq[] = [
  {
    id: "h1-faq-remote",
    question: "Is this in-person or online?",
    answer:
      "The strength and conditioning program is fully remote. Your programming, resources, and coach access are all delivered online, so it works whether you train at school, at a commercial gym, or at home.",
  },
  {
    id: "h1-faq-who",
    question: "Who is this program for?",
    answer:
      "Athletes of any age and any sport. The program has been used by baseball players, sprinters, and powerlifters alike, because the plan is written around your sport and your goals rather than a single template.",
  },
  {
    id: "h1-faq-equipment",
    question: "What equipment do I need?",
    answer:
      "Whatever you already have. We set the plan to your current setup — a full weight room, a home gym, or limited equipment. Tell us what you have access to on your request and the program is built around it.",
  },
  {
    id: "h1-faq-access",
    question: "How much access do I get to a coach?",
    answer:
      "Round-the-clock direct access. You can ask an unlimited number of questions and get real answers from your coaches, not automated replies.",
  },
  {
    id: "h1-faq-updates",
    question: "How often is the program updated?",
    answer:
      "Resources inside the program are updated daily, and new resources are posted every month. Your training itself runs in four-week blocks, each one built on the block before it.",
  },
  {
    id: "h1-faq-included",
    question: "What's the difference between the two packages?",
    answer:
      "Basic covers your fully custom training plan and coach access. Committed includes all of that plus the supplemental library: the monthly supplement research PDF, a personalized diet plan, and in-depth guidance on recovery, mobility, goal setting, and mentality.",
  },
  {
    id: "h1-faq-start",
    question: "How do I start?",
    answer:
      "Send a consultation request from this page. It's free, it takes a couple of minutes, and we'll follow up to confirm your goals and set up your first block. Spots are limited so every athlete gets coached properly.",
  },
  {
    id: "h1-faq-parents",
    question: "I'm a parent signing up my athlete. Can I fill this out?",
    answer:
      "Yes. The request form has space for a parent or guardian to submit on an athlete's behalf — just enter your own contact details and your athlete's information in the fields provided.",
  },
];

/** Shown beneath the nutrition and supplement content. */
export const H1_NUTRITION_DISCLAIMER =
  "H1 Performance nutrition and supplement resources are educational and are not medical advice. Athletes should consult a physician before starting any training, diet, or supplement program — especially athletes under 18, who should have a parent or guardian involved in that decision.";
