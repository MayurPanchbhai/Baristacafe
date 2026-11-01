/** @format */

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, ArrowUpRight, Star } from "lucide-react";
import TornadoCanvas from "./TornadoCanvas";

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  started: boolean;
}

export default function Hero({ started }: HeroProps) {
  const rootRef = useRef<HTMLElement>(null);

  /* Run the hero entrance once, after the loader has completed its exit. */
  useEffect(() => {
    if (!started) return;
    const ctx = gsap.context(() => {
      const entrance = gsap.timeline({ defaults: { ease: "power4.out" } });
      entrance
        .fromTo(
          ".hero-stamp",
          { scale: 0, rotate: -30, opacity: 0 },
          {
            scale: 1,
            rotate: 0,
            opacity: 1,
            duration: 0.9,
            ease: "back.out(1.8)",
          },
          0.15,
        )
        .fromTo(
          ".hero-line",
          { yPercent: 115 },
          {
            yPercent: 0,
            duration: 1.15,
            stagger: 0.12,
          },
          0.25,
        )
        .fromTo(
          ".hero-sub",
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
          },
          0.85,
        )
        .fromTo(
          ".hero-cta",
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
          },
          0.95,
        )
        .fromTo(
          ".hero-stat",
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.08,
          },
          1.1,
        )
        .fromTo(
          ".hero-tornado",
          { opacity: 0, scale: 0.82 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.5,
            ease: "expo.out",
          },
          0.4,
        )
        .fromTo(
          ".hero-chip",
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
          },
          1.2,
        )
        .fromTo(
          ".hero-watermark",
          { opacity: 0, yPercent: 40 },
          {
            opacity: 1,
            yPercent: 0,
            duration: 1.4,
            ease: "expo.out",
          },
          0.3,
        );

      /* Gentle parallax on scroll */
      gsap.to(".hero-watermark", {
        yPercent: 55,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to(".hero-tornado", {
        yPercent: 10,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, rootRef);
    return () => ctx.revert();
  }, [started]);

  return (
    <section
      id="home"
      ref={rootRef}
      className="relative flex min-h-svh flex-col overflow-hidden pb-16 pt-28 sm:pt-32 lg:pb-0 lg:pt-10">
      {/* Giant watermark */}
      <div
        aria-hidden="true"
        className="hero-watermark pointer-events-none absolute -bottom-6 left-1/2 z-0 -translate-x-1/2 select-none font-display text-[22vw] font-black uppercase leading-none text-stroke-faint lg:-bottom-16">
        BARISTA
      </div>

      {/* Decorative blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-24 h-72 w-72 rounded-full bg-heather/25 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-16 h-80 w-80 rounded-full bg-lemon/30 blur-3xl"
      />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl flex-1 items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-4">
        {/* ── Left: copy ─────────────────────────────── */}
        <div className="pt-6 lg:pt-20">
          <div className="hero-stamp mb-6 inline-flex items-center gap-2.5 rounded-[20px] glass-porcelain px-4 py-2.5 shadow-sm">
            <span className="flex items-center gap-0.5 text-heather-deep">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={13} fill="currentColor" strokeWidth={0} />
              ))}
            </span>
            <span className="font-display text-[11px] font-extrabold uppercase tracking-[0.28em] text-espresso">
              Est. 2012 · Small-batch roastery
            </span>
          </div>

          <h1 className="font-display font-black uppercase leading-[0.92] tracking-tight text-espresso">
            <span className="mask-line text-[clamp(3rem,9vw,6.8rem)]">
              <span className="hero-line inline-block">Brewed</span>
            </span>
            <br />
            <span className="mask-line text-[clamp(3rem,9vw,6.8rem)]">
              <span className="hero-line inline-block text-stroke-heather">
                Beyond
              </span>
            </span>
            <br />
            <span className="mask-line text-[clamp(3rem,9vw,6.8rem)]">
              <span className="hero-line inline-block">
                The
                <span className="relative mx-2 inline-block bg-lemon px-3 pb-1 sm:mx-3 sm:px-4">
                  Cup
                </span>
              </span>
            </span>
          </h1>

          <p className="hero-sub mt-7 max-w-md text-[15px] leading-relaxed text-mocha sm:text-base">
            Single-origin beans roasted in-house every dawn, pulled on a vintage
            lever machine and finished with obsessive latte art.{" "}
            <strong className="font-bold text-espresso">
              This is coffee, dialed to eleven.
            </strong>
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#menu"
              className="hero-cta group inline-flex items-center gap-2.5 rounded-[20px] bg-espresso px-7 py-4 font-display text-sm font-extrabold uppercase tracking-widest text-porcelain transition-all duration-300 hover:-translate-y-0.5 hover:bg-heather-deep hover:shadow-[0_16px_40px_-10px_rgba(124,92,191,0.65)]">
              Explore Menu
              <ArrowUpRight
                size={18}
                className="text-lemon transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
            <a
              href="#about"
              className="hero-cta group inline-flex items-center gap-2.5 rounded-[20px] border-2 border-espresso/15 bg-cream/60 px-7 py-[14px] font-display text-sm font-extrabold uppercase tracking-widest text-espresso transition-all duration-300 hover:-translate-y-0.5 hover:border-heather hover:bg-porcelain">
              Our Story
            </a>
          </div>

          {/* Stats */}
          <div className="mt-12 flex flex-wrap gap-x-10 gap-y-5">
            {[
              { n: "14", l: "Bean origins" },
              { n: "92", l: "Roast score" },
              { n: "25k", l: "Regulars" },
            ].map((s) => (
              <div key={s.l} className="hero-stat">
                <p className="font-display text-3xl font-black leading-none text-heather-deep sm:text-4xl">
                  {s.n}
                  <span className="text-lemon drop-shadow-[0_1px_0_rgba(42,30,23,0.35)]">
                    +
                  </span>
                </p>
                <p className="mt-1.5 font-display text-[11px] font-bold uppercase tracking-[0.25em] text-mocha">
                  {s.l}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: tornado ─────────────────────────── */}
        <div className="relative">
          {/* glow behind canvas */}
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 h-[115%] w-[115%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(155,126,214,0.35)_0%,rgba(228,255,59,0.12)_45%,transparent_68%)]"
          />
          <div className="hero-tornado relative h-[440px] sm:h-[520px] lg:h-[640px]">
            <TornadoCanvas />
          </div>

          {/* Floating glass chips */}
          <div className="hero-chip absolute -left-1 top-8 hidden rounded-[20px] glass-porcelain px-4 py-3 shadow-lg sm:block">
            <p className="font-display text-[10px] font-extrabold uppercase tracking-[0.25em] text-heather-ink">
              Single Origin
            </p>
            <p className="font-display text-sm font-black uppercase text-espresso">
              Ethiopia · Yirgacheffe
            </p>
          </div>
          <div className="hero-chip absolute -right-1 bottom-10 rounded-[20px] glass-porcelain px-4 py-3 shadow-lg sm:right-4">
            <p className="font-display text-[10px] font-extrabold uppercase tracking-[0.25em] text-heather-ink">
              Today's Pour
            </p>
            <p className="font-display text-sm font-black uppercase text-espresso">
              Heather Latte · $5.20
            </p>
          </div>
        </div>
      </div>

      {/* scroll hint */}
      <a
        href="#signatures"
        className="hero-cta absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 items-center gap-2 font-display text-[11px] font-extrabold uppercase tracking-[0.3em] text-espresso/50 transition-colors hover:text-espresso lg:flex"
        aria-label="Scroll to signatures">
        Scroll
        <ArrowDown size={14} className="animate-bounce" />
      </a>
    </section>
  );
}
