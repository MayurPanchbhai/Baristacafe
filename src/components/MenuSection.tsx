import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Plus, UtensilsCrossed } from "lucide-react";
import { FILTERS, MENU_ITEMS, type MenuItem } from "../data/menu";

gsap.registerPlugin(ScrollTrigger);

function MenuCard({ item }: { item: MenuItem }) {
  return (
    <article className="menu-card group relative flex flex-col rounded-[24px] bg-cream p-3 shadow-[0_8px_28px_-14px_rgba(42,30,23,0.3)] ring-1 ring-espresso/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_28px_50px_-18px_rgba(124,92,191,0.45)] hover:ring-heather/40">
      <div className="relative h-48 overflow-hidden rounded-[18px] sm:h-52">
        <img
          src={item.img}
          alt={item.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
        />
        {item.badge && (
          <span className="absolute left-3 top-3 rounded-[20px] bg-lemon px-3 py-1.5 font-display text-[10px] font-black uppercase tracking-[0.15em] text-espresso shadow">
            {item.badge}
          </span>
        )}
        <span className="absolute right-3 top-3 rounded-[20px] glass-porcelain px-3 py-1.5 font-display text-sm font-black text-espresso">
          ${item.price.toFixed(2)}
        </span>
      </div>

      <div className="flex flex-1 flex-col px-1.5 pb-1.5 pt-4">
        <h3 className="font-display text-lg font-black uppercase leading-tight tracking-tight text-espresso">
          {item.name}
        </h3>
        <p className="mt-1.5 flex-1 text-[13px] leading-relaxed text-mocha">{item.desc}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="font-display text-[10px] font-extrabold uppercase tracking-[0.25em] text-heather-deep">
            {item.category === "cold" ? "Cold Brew" : item.category}
          </span>
          <button
            className="grid h-10 w-10 place-items-center rounded-[16px] bg-espresso text-lemon transition-all duration-300 hover:rotate-90 hover:bg-heather-deep active:scale-90"
            aria-label={`Add ${item.name} to order`}
          >
            <Plus size={18} strokeWidth={2.75} />
          </button>
        </div>
      </div>
    </article>
  );
}

export default function MenuSection() {
  const rootRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<(typeof FILTERS)[number]["id"]>("all");

  const items = useMemo(
    () => (active === "all" ? MENU_ITEMS : MENU_ITEMS.filter((m) => m.category === active)),
    [active]
  );

  /* Heading reveal */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".menu-head > *",
        { y: 48, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power4.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".menu-head", start: "top 82%" },
        }
      );
      gsap.fromTo(
        ".filter-pill",
        { y: 22, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.06,
          scrollTrigger: { trigger: ".filter-row", start: "top 88%" },
        }
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  /* Animate grid: scroll-triggered on first visit, instant on filter change */
  const firstRun = useRef(true);
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const cards = grid.querySelectorAll(".menu-card");
    if (firstRun.current) {
      firstRun.current = false;
      const tween = gsap.fromTo(
        cards,
        { y: 44, opacity: 0, scale: 0.97 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.06,
          scrollTrigger: { trigger: grid, start: "top 86%" },
        }
      );
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    }
    gsap.fromTo(
      cards,
      { y: 34, opacity: 0, scale: 0.96 },
      { y: 0, opacity: 1, scale: 1, duration: 0.65, ease: "power3.out", stagger: 0.045 }
    );
    ScrollTrigger.refresh();
  }, [active]);

  return (
    <section id="menu" ref={rootRef} className="relative bg-porcelain py-24 sm:py-32">
      {/* deco */}
      <div aria-hidden="true" className="pointer-events-none absolute left-0 top-40 h-64 w-64 rounded-full bg-heather/15 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {/* Heading */}
        <div className="menu-head mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-[12px] bg-espresso text-lemon">
                <UtensilsCrossed size={16} strokeWidth={2.5} />
              </span>
              <p className="font-display text-xs font-extrabold uppercase tracking-[0.4em] text-heather-deep">
                The Full Spread
              </p>
            </div>
            <h2 className="mt-5 font-display text-4xl font-black uppercase leading-[0.95] tracking-tight text-espresso sm:text-6xl">
              Made fresh.
              <br />
              <span className="text-stroke-heather">All day long.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-mocha">
            From dawn-pulled espresso to midnight fudge cake — filter the board and build your
            perfect tray.
          </p>
        </div>

        {/* Filters */}
        <div className="filter-row mb-10 flex flex-wrap gap-2.5 sm:gap-3">
          {FILTERS.map((f) => {
            const isActive = active === f.id;
            const count = f.id === "all" ? MENU_ITEMS.length : MENU_ITEMS.filter((m) => m.category === f.id).length;
            return (
              <button
                key={f.id}
                onClick={() => setActive(f.id)}
                className={`filter-pill group inline-flex items-center gap-2 rounded-[20px] px-5 py-3 font-display text-xs font-extrabold uppercase tracking-widest transition-all duration-300 ${
                  isActive
                    ? "bg-heather-deep text-porcelain shadow-[0_12px_30px_-8px_rgba(124,92,191,0.7)]"
                    : "bg-cream text-espresso ring-1 ring-espresso/10 hover:-translate-y-0.5 hover:bg-lemon hover:ring-lemon"
                }`}
                aria-pressed={isActive}
              >
                {f.label}
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-black ${
                    isActive ? "bg-lemon text-espresso" : "bg-espresso/8 text-espresso/60 group-hover:bg-espresso group-hover:text-lemon"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div ref={gridRef} className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
