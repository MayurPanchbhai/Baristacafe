import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Plus, Sparkles } from "lucide-react";
import { CAROUSEL_ITEMS, type CarouselItem } from "../data/menu";
import { useCart } from "../context/CartContext";

gsap.registerPlugin(ScrollTrigger);

function CoffeeCard({ item, hidden }: { item: CarouselItem; hidden?: boolean }) {
  const { add } = useCart();
  return (
    <article
      aria-hidden={hidden ? "true" : undefined}
      className="group w-[230px] shrink-0 sm:w-[260px]"
    >
      <div className="rounded-[24px] bg-cream p-3 shadow-[0_10px_30px_-12px_rgba(27,18,11,0.35)] ring-1 ring-espresso/5 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-5 group-hover:scale-[1.045] group-hover:shadow-[0_34px_60px_-18px_rgba(27,18,11,0.55)] group-hover:ring-lemon">
        {/* Image */}
        <div className="relative h-[260px] overflow-hidden rounded-[18px] sm:h-[290px]">
          <img
            src={item.img}
            alt={item.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso/35 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <button onClick={() => add({ id: item.id.slice(1), name: item.name, desc: item.note, price: item.price, img: item.img, category: "coffee" })} aria-label={`Add ${item.name} to order`} className="absolute left-3 top-3 grid h-9 w-9 translate-y-2 place-items-center rounded-[12px] bg-lemon text-espresso opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 focus:translate-y-0 focus:opacity-100">
            <Plus size={17} strokeWidth={3} />
          </button>
        </div>

        {/* Reveal name + price below the image on hover */}
        <div className="grid grid-rows-[0fr] opacity-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:grid-rows-[1fr] group-hover:opacity-100">
          <div className="overflow-hidden">
            <div className="flex items-end justify-between gap-2 px-1 pb-1 pt-3">
              <div>
                <h3 className="font-display text-[15px] font-black uppercase leading-tight text-espresso">
                  {item.name}
                </h3>
                <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-heather-deep">
                  {item.note}
                </p>
              </div>
              <span className="shrink-0 rounded-[20px] bg-espresso px-3 py-1.5 font-display text-sm font-black text-lemon">
                ${item.price.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function CoffeeCarousel() {
  const rootRef = useRef<HTMLElement>(null);
  const doubled = [...CAROUSEL_ITEMS, ...CAROUSEL_ITEMS];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".sig-head > *",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power4.out",
          stagger: 0.12,
          scrollTrigger: { trigger: ".sig-head", start: "top 82%" },
        }
      );
      gsap.fromTo(
        ".marquee-wrap",
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: ".marquee-wrap", start: "top 90%" },
        }
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="signatures"
      ref={rootRef}
      className="relative overflow-hidden bg-heather py-24 sm:py-28"
    >
      {/* deco rings + watermark */}
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full border-[26px] border-heather-deep/30" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-52 -left-40 h-[520px] w-[520px] rounded-full border-[30px] border-lemon/15" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-10 select-none text-center font-display text-[13vw] font-black uppercase leading-none text-stroke-cream opacity-25">
        Pour Stars
      </div>

      <div className="relative">
        {/* Heading */}
        <div className="sig-head mx-auto mb-14 max-w-7xl px-5 sm:mb-16 sm:px-8">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-[12px] bg-lemon text-espresso">
              <Sparkles size={17} strokeWidth={2.5} />
            </span>
            <p className="font-display text-xs font-extrabold uppercase tracking-[0.4em] text-espresso/80">
              The Signature Lineup
            </p>
          </div>
          <div className="mt-5 flex flex-wrap items-end justify-between gap-6">
            <h2 className="max-w-2xl font-display text-4xl font-black uppercase leading-[0.95] tracking-tight text-porcelain sm:text-6xl">
              Coffees that
              <br />
              <span className="bg-lemon px-3 text-espresso">steal the show</span>
            </h2>
            <p className="max-w-sm text-sm leading-relaxed text-porcelain/80">
              An endlessly rotating parade of our most-ordered pours. Hover any card to pause the
              reel and meet your next favorite.
            </p>
          </div>
        </div>

        {/* Marquee */}
        <div className="marquee-wrap group/wrap relative">
          {/* edge fades */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-heather to-transparent sm:w-28" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-heather to-transparent sm:w-28" />

          <div className="marquee-track flex gap-5 px-3 py-6 sm:gap-7">
            {doubled.map((item, i) => (
              <CoffeeCard
                key={`${item.id}-${i}`}
                item={item}
                hidden={i >= CAROUSEL_ITEMS.length}
              />
            ))}
          </div>
        </div>

        <p className="mt-8 text-center font-display text-[11px] font-extrabold uppercase tracking-[0.35em] text-porcelain/60">
          Hover to pause · Lift to reveal
        </p>
      </div>
    </section>
  );
}
