"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { smoothScrollToElement } from "@/lib/scrollUtils";
import { H1_PALETTE, h1Testimonials } from "@/data/h1";

/**
 * Two states, one section. While `h1Testimonials` is empty the placeholder
 * below holds the space with copy that reads as deliberate; the moment a real
 * quote is added to `data/h1.ts` the carousel replaces it with no other change.
 *
 * The placeholder invents nothing — no sample quote, no fake name, no star
 * rating. It says the testimonies are coming and points current athletes at the
 * form, which is true and costs the page no credibility.
 *
 * Cards carry an optional athlete photo, masked with the same bottom fade as
 * the coach photography so the page's two photo treatments read as one. A card
 * without a photo starts at the quote glyph — no gap, no placeholder art.
 */

/**
 * The coach-card fade, with shorter stops for a shorter header — see
 * H1CoachesSection for why the fade is a mask on the photo rather than a
 * gradient painted over it (the card surface below is a tint, not ink, so an
 * ink-matched overlay would band at the seam).
 */
const PHOTO_FADE_MASK =
  "linear-gradient(to bottom, black calc(100% - 4rem), rgba(0, 0, 0, 0.25) calc(100% - 2rem), rgba(0, 0, 0, 0.08) calc(100% - 1rem), transparent calc(100% - 0.25rem))";

const TESTIMONY_COUNT = h1Testimonials.length;

/**
 * Card widths — unchanged from the flush-edged version, and that is the point.
 *
 * A flex item's percentage width resolves against the flex container's *content*
 * box, and the track now carries a `--peek` gutter as horizontal padding. So
 * these same three classes, which used to make the cards meet the track's edges
 * exactly, now make them fill the box *inside* the gutters exactly — leaving a
 * slice of the previous and next card showing in the gutters instead. Three
 * whole cards at `lg`, two from `md`, one below, all still true.
 *
 * The invariant that matters: visible slice = peek − gap. Below `md` the gap
 * drops to 1rem for exactly that reason — against a 2rem peek a 1.5rem gap
 * would leave an 8px sliver, which reads as a rendering artifact rather than as
 * a card continuing off-screen. Change either value and the other has to move
 * with it.
 */
const CARD_WIDTHS =
  "w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]";

/**
 * `sizes` has to describe the card, not the viewport, or next/image ships a
 * file sized for the wrong box. Under the gutter geometry a card is ~85vw on a
 * phone, ~45vw at `md` (two up), and settles around 400px at `lg` (three up in
 * a 1216px container).
 */
const CARD_SIZES = "(max-width: 768px) 85vw, (max-width: 1024px) 45vw, 400px";

/**
 * The edge fades are painted *over* the track, not masked out of it.
 *
 * H1CoachesSection argues the opposite for its photo headers, and that argument
 * genuinely does not transfer: there the surface under the fade is a chalk tint
 * composited over ink, so an ink-matched overlay bottoms out darker than the
 * card and bands at the seam. Here the surface under the fade is flat `steel` —
 * the section's own background — so an overlay painted in `steel` and a mask
 * that reveals `steel` are the same pixels.
 *
 * What is not the same is the focus ring. The track is focusable, and a
 * `mask-image` on it erases its `:focus-visible` outline outright — measured at
 * zero surviving ring pixels against 2864 on an unmasked control. Overlays
 * leave the ring alone.
 *
 * Full steel at the outer edge, gone by 65% of the strip: the slice underneath
 * is usually a dark night-game photograph, and holding a heavy scrim across the
 * whole strip turns it into a smudge rather than a card you can tell is there.
 */
const edgeFade = (side: "left" | "right") =>
  `linear-gradient(to ${side === "left" ? "right" : "left"}, ${
    H1_PALETTE.steel
  } 0%, ${H1_PALETTE.steel}8C 25%, transparent 65%)`;

/** Middle copy is the real one; `a` and `c` are the loop's clones. */
const LOOPED_COPIES = ["a", "b", "c"] as const;
const SINGLE_COPY = ["b"] as const;

export function H1TestimonialsSection() {
  const hasTestimonials = TESTIMONY_COUNT > 0;
  const trackRef = useRef<HTMLDivElement>(null);

  /**
   * Whether the track actually overflows. It is a function of the viewport and
   * the number of testimonies, so it is measured rather than assumed: three
   * quotes on a desktop fit with nothing to page to, and arrows that scroll
   * nothing are worse than no arrows.
   *
   * It starts `true` — assume scrollable — and the measurement below only ever
   * turns it off. Starting `false` renders the centred branch for one frame,
   * and centring a track that does overflow puts its first cards behind the
   * scroll origin where nothing can reach them: on a phone the section opened
   * on the third testimony with the first two stranded to the left. The
   * opposite mistake costs a frame of left alignment on a list too short to
   * scroll, which is invisible and harmless.
   *
   * The arrows are always in the layout, transparent rather than absent, so
   * the section does not change height when the measurement lands.
   */
  const [canScroll, setCanScroll] = useState(true);

  /**
   * Whether the loop clones are mounted. Deliberately the *opposite* default to
   * `canScroll`, for the opposite reason: a first frame with no clones is
   * exactly the frame this section shipped with, so nothing is mispositioned
   * while we wait for the measurement. It also keeps the server HTML at five
   * testimonies rather than fifteen — crawlers and no-JS readers get the real
   * list once, and the loop is purely an enhancement on top.
   *
   * Do not merge the two flags. They answer different questions and their safe
   * defaults point in different directions.
   */
  const [looping, setLooping] = useState(false);

  /**
   * The same answer readable synchronously. `page()` and the scroll listener
   * both need it during an event, before React has re-rendered, so it is
   * written at every site that calls `setLooping`.
   */
  const loopingRef = useRef(false);

  /**
   * Slide the scroll position into the middle copy without anyone seeing it.
   *
   * The trick is that x and x ± L show identical pixels, because card i and
   * card i + count are the same card and the gap between copies is the same gap
   * as everywhere else. So a jump of exactly one period is invisible.
   *
   * L is measured from the DOM on every call — never `scrollWidth / 3`. Fifteen
   * cards have fourteen gaps, not fifteen, and `scrollWidth` also carries the
   * two gutters, so that shortcut comes out one whole gap long: 2314px against
   * a true 2290px at `lg`. Snapping quietly absorbs the 24px error, which is
   * exactly what makes it dangerous — the loop still "works" while every seam
   * re-settles visibly. Taking the difference between the same card in adjacent
   * copies cancels the padding and counts the gaps correctly.
   *
   * `scrollTo({ behavior: "instant" })` rather than assigning `scrollLeft`: a
   * bare assignment animates if the element's computed `scroll-behavior` is
   * smooth, and this codebase applies `scroll-smooth` to `html` already. The
   * whole illusion rests on these particular jumps never animating.
   *
   * The modulo form handles any distance in one write, which matters because a
   * breakpoint change can strand the position several periods out of band.
   */
  const normalize = useCallback(() => {
    const track = trackRef.current;
    if (!track || !loopingRef.current) return;

    const cards = track.children as HTMLCollectionOf<HTMLElement>;
    if (cards.length < 2 * TESTIMONY_COUNT) return; // clones not committed yet

    const period =
      cards[TESTIMONY_COUNT].offsetLeft - cards[0].offsetLeft;
    if (period <= 0) return;

    const x = track.scrollLeft;
    if (x < period || x >= 2 * period) {
      track.scrollTo({ left: period + (x % period), behavior: "instant" });
    }
  }, []);

  /**
   * Decide both flags off one measurement.
   *
   * Looping is gated on the real list overflowing by at least a full card, not
   * merely overflowing at all. Below that threshold a card and its own clone
   * can be on screen at the same time — the same athlete's face at both edges,
   * which reads as a bug rather than as a loop. When the gate says no, the
   * arrows fall back to the long-scroll wrap they had before, which is worse
   * than looping but far better than a dead control.
   *
   * Measured off the first `TESTIMONY_COUNT` children, so the answer does not
   * change once the clones mount. The ResizeObserver will not fire on that
   * mount anyway — the track's own content box is unchanged by content growing
   * inside a scroller — and it does not need to.
   */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measure = () => {
      const cards = track.children as HTMLCollectionOf<HTMLElement>;
      if (cards.length === 0) return;

      const stride =
        cards.length > 1 ? cards[1].offsetLeft - cards[0].offsetLeft : 0;
      const lastReal = cards[Math.min(TESTIMONY_COUNT, cards.length) - 1];
      const realListWidth =
        lastReal.offsetLeft - cards[0].offsetLeft + lastReal.offsetWidth;

      setCanScroll(realListWidth - track.clientWidth > 1);

      const shouldLoop =
        stride > 0 && realListWidth - track.clientWidth >= stride - 1;
      loopingRef.current = shouldLoop; // before normalize, or the flip lands late
      setLooping(shouldLoop);
      normalize();
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    return () => observer.disconnect();
  }, [normalize]);

  /**
   * Seat the scroller in the middle copy in the same commit that inserts the
   * clones, before the browser paints. `useEffect` would paint one frame of the
   * first copy — identical cards, but with an empty left gutter where the peek
   * belongs, so the fade would blink.
   *
   * It re-bands the current position rather than jumping to a fixed address:
   * that keeps a position the reader had already swiped to, needs no knowledge
   * of the gutter, is its own fixed point under StrictMode's double invocation,
   * and absorbs whatever scroll anchoring did about the clones appearing to the
   * left.
   */
  useLayoutEffect(() => {
    if (!looping) return;
    normalize();
  }, [looping, normalize]);

  /**
   * Re-band after the reader's own scrolling settles, and catch a fling before
   * it runs out of track.
   *
   * Re-banding may only happen when nothing is animating. A write to
   * `scrollLeft` during a smooth scroll cancels that scroll — measured: a
   * deliberately no-op write mid-animation stopped it 382px short of its
   * target. So the settle path waits for `scrollend`, or for 150ms of silence
   * where `scrollend` does not exist (Safari before 26). 150ms cannot elapse
   * mid-animation, because a live scroll emits an event every frame.
   *
   * The safety band is for a hard trackpad fling, which from a resting position
   * has only about three cards of runway before it hits the end of the last
   * copy. Wheel scrolling is relative, so teleporting a period mid-flight is
   * invisible. Touch is excluded and left to the settle path: iOS momentum is
   * owned by the compositor and a jump underneath it kills the fling. The
   * residue is that a very hard swipe on iOS can reach the true end and stop
   * there for one gesture before settling back — named here so nobody reads it
   * as an unknown bug.
   */
  useEffect(() => {
    const track = trackRef.current;
    if (!track || !looping) return;

    const hasScrollEnd = "onscrollend" in track;
    let timer = 0;
    let touching = false;
    let touchInertia = false;

    const settle = () => {
      touchInertia = false;
      normalize();
    };

    const onScroll = () => {
      if (!touchInertia) {
        const cards = track.children as HTMLCollectionOf<HTMLElement>;
        if (cards.length >= 2 * TESTIMONY_COUNT) {
          const period =
            cards[TESTIMONY_COUNT].offsetLeft - cards[0].offsetLeft;
          const stride = cards[1].offsetLeft - cards[0].offsetLeft;
          const x = track.scrollLeft;
          if (x < period - 1.5 * stride || x > 2 * period + 1.5 * stride) {
            normalize();
          }
        }
      }

      if (!hasScrollEnd && !touching) {
        window.clearTimeout(timer);
        timer = window.setTimeout(settle, 150);
      }
    };

    // A finger held still mid-drag stops scroll events without ending the
    // gesture, and re-banding under an active pan fights the reader's thumb.
    // `scrollend` needs no such guard — it is withheld until the gesture ends.
    const onTouchStart = () => {
      touching = true;
      touchInertia = true;
      window.clearTimeout(timer);
    };
    const onTouchEnd = () => {
      touching = false;
      if (!hasScrollEnd) {
        window.clearTimeout(timer);
        timer = window.setTimeout(settle, 150);
      }
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    track.addEventListener("touchstart", onTouchStart, { passive: true });
    track.addEventListener("touchend", onTouchEnd, { passive: true });
    if (hasScrollEnd) track.addEventListener("scrollend", settle);

    return () => {
      window.clearTimeout(timer);
      track.removeEventListener("scroll", onScroll);
      track.removeEventListener("touchstart", onTouchStart);
      track.removeEventListener("touchend", onTouchEnd);
      if (hasScrollEnd) track.removeEventListener("scrollend", settle);
    };
  }, [looping, normalize]);

  /**
   * Page by one card.
   *
   * Re-band first, in the same tick. The instant write does cancel any scroll
   * still in flight, but the `scrollTo` two lines down replaces it immediately,
   * so the pair behaves as one move — verified landing exactly on target. What
   * this does not promise is a perfectly smooth press *during* an animation:
   * Chromium coerces an instant write to the nearest snap position, so a press
   * that arrives mid-flight can shift by up to half a card. It is bounded, it
   * is rare (a press from rest re-bands to nothing at all), and the loop never
   * breaks.
   *
   * Rest positions are `offsetLeft − gutter`, not `offsetLeft`: the track is its
   * own offset parent, so a card's `offsetLeft` includes the peek padding, while
   * `scroll-padding` has already moved the snap rest inward by the same amount.
   * The gutter is read from computed style so the breakpoints stay a CSS
   * concern and JS never learns their values.
   *
   * While looping, the two wrap branches are unreachable — the position never
   * leaves the middle band at rest. They are kept for the gated-off case, where
   * they are the only thing standing between the reader and a dead arrow.
   */
  const page = useCallback(
    (direction: 1 | -1) => {
      const track = trackRef.current;
      if (!track) return;

      const cards = Array.from(track.children) as HTMLElement[];
      if (cards.length === 0) return;

      if (loopingRef.current) normalize();

      const maxScroll = track.scrollWidth - track.clientWidth;
      const { scrollLeft } = track;
      const gutter = parseFloat(getComputedStyle(track).paddingLeft) || 0;

      let left: number;
      if (!loopingRef.current && direction === 1 && scrollLeft >= maxScroll - 1) {
        left = 0;
      } else if (!loopingRef.current && direction === -1 && scrollLeft <= 1) {
        left = maxScroll;
      } else {
        // The card nearest the track's left edge is the one currently leading
        // the visible run; page relative to that.
        let nearest = 0;
        let smallest = Infinity;
        cards.forEach((card, index) => {
          const distance = Math.abs(card.offsetLeft - gutter - scrollLeft);
          if (distance < smallest) {
            smallest = distance;
            nearest = index;
          }
        });

        const target = Math.min(
          Math.max(nearest + direction, 0),
          cards.length - 1,
        );
        left = cards[target].offsetLeft - gutter;
      }

      // Read at call time rather than in state: the site-wide reduced-motion
      // rules collapse CSS transitions, but a programmatic smooth scroll is not
      // a transition and would animate straight through them.
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      track.scrollTo({
        left,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    },
    [normalize],
  );

  const copies = looping ? LOOPED_COPIES : SINGLE_COPY;

  return (
    <section
      id="h1-testimonials"
      className="border-y py-20 md:py-28"
      style={{
        borderColor: H1_PALETTE.line,
        backgroundColor: H1_PALETTE.steel,
      }}
    >
      <div className="section-container">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <span
            className="text-sm font-semibold tracking-widest"
            style={{ color: H1_PALETTE.gold }}
          >
            PLAYER TESTIMONIES
          </span>
          <h2 className="heading-lg mt-3 text-white">
            Athlete Results, In Their Words
          </h2>
        </div>

        {hasTestimonials ? (
          <div
            role="group"
            aria-roledescription="carousel"
            aria-label="Athlete testimonies"
          >
            {/* The wrapper owns `--peek`, so the gutter, the snap inset and the
                width of the fades are one number in one place. */}
            <div className="relative [--peek:2rem] md:[--peek:3rem]">
              {/* The scroller. `snap-mandatory` keeps it landing on card edges
                  whether it was moved by an arrow, a trackpad, or a thumb, so
                  touch users get the same carousel without needing the arrows.

                  `px-(--peek)` opens the gutters the neighbouring cards peek
                  through, and `scroll-px-(--peek)` moves the snap rest inward
                  by the same amount so a snapped card still lands flush with
                  the content box rather than under the fade.

                  `tabIndex` is not decoration: a scrollable region that cannot
                  take focus cannot be scrolled from the keyboard at all, and the
                  cards hold no focusable content of their own to get you in.

                  The vertical padding is headroom for the `h1-live` hover rise —
                  `overflow-x: auto` forces `overflow-y` to compute to `auto`
                  too, so a card lifting 2px at the edge of a track with no
                  padding would be clipped, or worse, raise a second scrollbar.

                  Left-aligned while it overflows, centred when it does not: a
                  short list should sit in the middle of the section the way the
                  old grid did, but `justify-content: center` on a scroller that
                  overflows pushes content past the scroll origin where it cannot
                  be reached — see the `canScroll` note above for why that
                  decides the default rather than the other way round. */}
              <div
                ref={trackRef}
                id="h1-testimonials-track"
                tabIndex={0}
                aria-label="Athlete testimonies, scrollable"
                className={`relative flex snap-x snap-mandatory gap-4 overflow-x-auto px-(--peek) py-2 scroll-px-(--peek) md:gap-6 [overscroll-behavior-x:contain] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
                  canScroll ? "" : "justify-center"
                }`}
              >
                {copies.flatMap((copy) =>
                  h1Testimonials.map((testimonial, index) => {
                    /* Copies `a` and `c` exist only to give the loop somewhere
                       to go. They are hidden from assistive technology so a
                       screen reader still hears five testimonies, and `inert`
                       keeps them out of the tab order — the cards hold nothing
                       focusable today, but H1.md floats a read-more expander,
                       and ten hidden tab stops would be a nasty surprise. Any
                       id ever added inside a card has to be copy-prefixed. */
                    const clone = copy !== "b";
                    return (
                      <figure
                        key={`${copy}:${testimonial.id}`}
                        aria-hidden={clone || undefined}
                        inert={clone || undefined}
                        aria-roledescription={clone ? undefined : "slide"}
                        aria-label={
                          clone
                            ? undefined
                            : `${index + 1} of ${TESTIMONY_COUNT}`
                        }
                        className={`h1-live flex shrink-0 snap-start flex-col overflow-hidden rounded-xl border ${CARD_WIDTHS}`}
                        style={{
                          borderColor: H1_PALETTE.line,
                          backgroundColor: `${H1_PALETTE.chalk}05`,
                        }}
                      >
                        {testimonial.photo && (
                          <div
                            className="relative aspect-[4/3] w-full overflow-hidden"
                            style={{
                              maskImage: PHOTO_FADE_MASK,
                              WebkitMaskImage: PHOTO_FADE_MASK,
                            }}
                          >
                            <Image
                              src={testimonial.photo.src}
                              alt={testimonial.photo.alt}
                              fill
                              sizes={CARD_SIZES}
                              className="h1-zoom object-cover"
                            />
                          </div>
                        )}
                        <div
                          className={
                            testimonial.photo
                              ? "flex flex-1 flex-col p-8 pt-4"
                              : "flex flex-1 flex-col p-8"
                          }
                        >
                          <Quote
                            className="mb-4 h-7 w-7"
                            style={{ color: H1_PALETTE.gold }}
                            aria-hidden="true"
                          />
                          <blockquote
                            className="mb-6 flex-1 text-sm leading-relaxed"
                            style={{ color: H1_PALETTE.muted }}
                          >
                            {testimonial.quote}
                          </blockquote>
                          <figcaption>
                            <div className="font-semibold text-white">
                              {testimonial.name}
                            </div>
                            <div
                              className="text-xs"
                              style={{ color: H1_PALETTE.muted }}
                            >
                              {testimonial.detail}
                            </div>
                          </figcaption>
                        </div>
                      </figure>
                    );
                  }),
                )}
              </div>

              {/* Painted over the track rather than masked out of it — see
                  `edgeFade`. `z-10` clears the `h1-live` ring, which sits at
                  `z-index: 2` in this same stacking context. They gate on
                  `canScroll`, not on `looping`: a list that overflows without
                  looping still has more to show, and a list that fits has
                  nothing to fade. Absolutely positioned, so fading them out
                  costs no layout. */}
              {(["left", "right"] as const).map((side) => (
                <div
                  key={side}
                  aria-hidden="true"
                  className={`pointer-events-none absolute inset-y-0 z-10 w-(--peek) transition-opacity ${
                    side === "left" ? "left-0" : "right-0"
                  } ${canScroll ? "" : "opacity-0"}`}
                  style={{ background: edgeFade(side) }}
                />
              ))}
            </div>

            {/* Below the track and centred, because the section header above is
                centred too and arrows overlaid on the cards would sit on the
                athletes' faces. Kept in the layout when there is nothing to
                page through so the section's height does not change once the
                measurement lands. */}
            <div
              className={`mt-10 flex items-center justify-center gap-4 transition-opacity ${
                canScroll ? "" : "pointer-events-none opacity-0"
              }`}
              aria-hidden={canScroll ? undefined : true}
            >
              {(
                [
                  ["Previous testimonies", -1, ChevronLeft],
                  ["Next testimonies", 1, ChevronRight],
                ] as const
              ).map(([label, direction, Icon]) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => page(direction)}
                  aria-label={label}
                  aria-controls="h1-testimonials-track"
                  tabIndex={canScroll ? undefined : -1}
                  className="h1-tap flex h-12 w-12 items-center justify-center rounded-full border"
                  style={{
                    borderColor: `${H1_PALETTE.gold}4D`,
                    color: H1_PALETTE.gold,
                    backgroundColor: `${H1_PALETTE.chalk}08`,
                  }}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div
            className="relative mx-auto max-w-3xl overflow-hidden rounded-2xl border px-8 py-14 text-center md:px-14"
            style={{
              borderColor: `${H1_PALETTE.gold}33`,
              backgroundColor: `${H1_PALETTE.chalk}05`,
            }}
          >
            <div
              className="absolute -top-24 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full blur-3xl"
              style={{ backgroundColor: `${H1_PALETTE.gold}1A` }}
              aria-hidden="true"
            />

            <div className="relative">
              <div
                className="mx-auto mb-7 flex h-14 w-14 items-center justify-center rounded-full"
                style={{ backgroundColor: `${H1_PALETTE.gold}1F` }}
              >
                <Quote
                  className="h-6 w-6"
                  style={{ color: H1_PALETTE.gold }}
                  aria-hidden="true"
                />
              </div>

              <h3 className="mb-4 text-2xl font-bold text-white">
                The First Testimonies Are On The Way
              </h3>
              <p
                className="mx-auto mb-8 max-w-xl leading-relaxed"
                style={{ color: H1_PALETTE.muted }}
              >
                Our athletes are working through their training blocks right
                now. As their numbers come in, their words go here — posted the
                way they send them.
              </p>

              <div
                className="mx-auto mb-8 h-px w-24"
                style={{ backgroundColor: `${H1_PALETTE.gold}4D` }}
                aria-hidden="true"
              />

              <p className="text-sm" style={{ color: H1_PALETTE.muted }}>
                Already training with H1?{" "}
                <button
                  type="button"
                  onClick={() =>
                    smoothScrollToElement("h1-consultation-form", {
                      focus: true,
                    })
                  }
                  className="font-semibold underline-offset-4 transition-colors hover:underline"
                  style={{ color: H1_PALETTE.gold }}
                >
                  Send us your results
                </button>
                .
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
