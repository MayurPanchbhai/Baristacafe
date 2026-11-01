import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Quote, Star, MessageSquareHeart } from "lucide-react";
import { REVIEWS, type Review } from "../data/reviews";

gsap.registerPlugin(ScrollTrigger);

function Stars({ n }: { n: number }) {
  return (
    <span className="flex items-center gap-1" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < n ? "text-lemon" : "text-espresso/15"}
          fill="currentColor"
          strokeWidth={0}
        />
      ))}
    </span>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="review-card group relative flex h-full flex-col rounded-[24px] bg-cream p-6 shadow-[0_10px_34px_-16px_rgba(42,30,23,0.3)] ring-1 ring-espresso/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_55px_-20px_rgba(124,92,191,0.5)] hover:ring-heather/40 sm:p-7">
      <Quote
        size={64}
        className="absolute right-5 top-5 text-heather/15 transition-colors duration-500 group-hover:text-heather/30"
        fill="currentColor"
        strokeWidth={0}
        aria-hidden="true"
      />
      <div className="flex items-center gap-4">
        <img
          src={review.img}
          alt={`Portrait of ${review.name}`}
          loading="lazy"
          className="h-14 w-14 rounded-full object-cover ring-[3px] ring-heather ring-offset-2 ring-offset-cream sm:h-16 sm:w-16"
        />
        <div>
          <figcaption className="font-display text-base font-black uppercase tracking-tight text-espresso">
            {review.name}
          </figcaption>
          <p className="mt-0.5 text-[11px] font-bold uppercase tracking-[0.14em] text-heather-deep">
            {review.role}
          </p>
        </div>
      </div>
      <div className="mt-4">
        <Stars n={review.stars} />
      </div>
      <blockquote className="mt-3 flex-1 text-[14px] leading-relaxed text-mocha">
        "{review.quote}"
      </blockquote>
      <p className="mt-4 inline-flex w-fit rounded-[20px] bg-espresso/5 px-3 py-1.5 font-display text-[10px] font-extrabold uppercase tracking-[0.2em] text-espresso/70">
        {review.tag}
      </p>
    </figure>
  );
}

export default function Reviews() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".rev-head > *",
        { y: 46, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power4.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".rev-head", start: "top 82%" },
        }
      );
      gsap.fromTo(
        ".rev-score",
        { scale: 0.7, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.1,
          ease: "back.out(1.6)",
          scrollTrigger: { trigger: ".rev-score", start: "top 85%" },
        }
      );
      gsap.fromTo(
        ".review-card",
        { y: 56, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.95,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".rev-grid", start: "top 84%" },
        }
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="reviews"
      ref={rootRef}
      className="relative overflow-hidden bg-sand/60 py-24 sm:py-32"
    >
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 top-16 h-96 w-96 rounded-full bg-heather/20 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-24 bottom-10 h-72 w-72 rounded-full bg-lemon/25 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="rev-head mb-12 flex flex-wrap items-end justify-between gap-8">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-[12px] bg-heather-deep text-porcelain">
                <MessageSquareHeart size={16} strokeWidth={2.5} />
              </span>
              <p className="font-display text-xs font-extrabold uppercase tracking-[0.4em] text-heather-deep">
                Word on the Street
              </p>
            </div>
            <h2 className="mt-5 font-display text-4xl font-black uppercase leading-[0.95] tracking-tight text-espresso sm:text-6xl">
              Loved by
              <span className="bg-lemon px-3"> real people</span>
            </h2>
          </div>

          {/* Aggregate score */}
          <div className="rev-score flex items-center gap-5 rounded-[24px] bg-espresso px-7 py-5 shadow-[0_24px_50px_-20px_rgba(42,30,23,0.7)]">
            <div className="font-display text-5xl font-black leading-none text-lemon sm:text-6xl">4.9</div>
            <div>
              <Stars n={5} />
              <p className="mt-1.5 font-display text-[11px] font-bold uppercase tracking-[0.18em] text-porcelain/70">
                2,400+ verified reviews
              </p>
            </div>
          </div>
        </div>

        <div className="rev-grid grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {REVIEWS.map((r) => (
            <ReviewCard key={r.id} review={r} />
          ))}
        </div>
      </div>
    </section>
  );
}
