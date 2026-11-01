import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award, Clock, Coffee, Leaf, MapPin } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  {
    icon: Coffee,
    title: "Roasted in-house",
    text: "Green beans arrive weekly and leave our drum roaster within the hour you drink them.",
  },
  {
    icon: Leaf,
    title: "Direct trade",
    text: "We pay 2–3× commodity price straight to 14 farming families we visit every year.",
  },
  {
    icon: Clock,
    title: "7AM — 10PM, daily",
    text: "First pour at sunrise, last call under Edison bulbs. Weekends run later.",
  },
  {
    icon: Award,
    title: "Awarded crew",
    text: "Three regional latte-art champions and a national brewers-cup finalist behind the bar.",
  },
];

const STATS = [
  { value: 14, suffix: "", label: "Years pouring" },
  { value: 48, suffix: "", label: "Cozy seats" },
  { value: 25, suffix: "k", label: "Happy regulars" },
  { value: 92, suffix: "", label: "Avg. roast score" },
];

function StatCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const numRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = numRef.current;
    if (!el) return;
    const obj = { v: 0 };
    const tween = gsap.to(obj, {
      v: value,
      duration: 2,
      ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 88%" },
      onUpdate: () => {
        el.textContent = `${Math.round(obj.v)}${suffix}`;
      },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [value, suffix]);

  return (
    <div className="about-stat rounded-[20px] bg-white/[0.06] p-5 ring-1 ring-white/10 backdrop-blur-sm">
      <p className="font-display text-3xl font-black leading-none text-lemon sm:text-4xl">
        <span ref={numRef}>0{suffix}</span>
        <span className="text-heather">+</span>
      </p>
      <p className="mt-2 font-display text-[11px] font-bold uppercase tracking-[0.22em] text-porcelain/60">
        {label}
      </p>
    </div>
  );
}

export default function About() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-img-main",
        { clipPath: "inset(0 0 100% 0)", y: 60 },
        {
          clipPath: "inset(0 0 0% 0)",
          y: 0,
          duration: 1.3,
          ease: "expo.out",
          scrollTrigger: { trigger: ".about-media", start: "top 78%" },
        }
      );
      gsap.fromTo(
        ".about-img-small",
        { y: 70, opacity: 0, rotate: 6 },
        {
          y: 0,
          opacity: 1,
          rotate: 0,
          duration: 1,
          ease: "power3.out",
          delay: 0.25,
          scrollTrigger: { trigger: ".about-media", start: "top 78%" },
        }
      );
      gsap.fromTo(
        ".about-copy > *",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".about-copy", start: "top 80%" },
        }
      );
      gsap.fromTo(
        ".about-feat",
        { x: -28, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.09,
          scrollTrigger: { trigger: ".about-feats", start: "top 85%" },
        }
      );
      gsap.fromTo(
        ".about-stat",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: ".about-stats", start: "top 90%" },
        }
      );
      /* subtle drift on images */
      gsap.to(".about-img-main img", {
        yPercent: 10,
        ease: "none",
        scrollTrigger: { trigger: ".about-media", start: "top bottom", end: "bottom top", scrub: true },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={rootRef} className="relative overflow-hidden bg-cocoa py-24 text-porcelain sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-1/3 h-[420px] w-[420px] rounded-full bg-heather/15 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        {/* ── Media collage ── */}
        <div className="about-media relative">
          <div className="about-img-main relative overflow-hidden rounded-[28px] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)] ring-1 ring-white/10">
            <img
              src="/images/about/about-1.jpg"
              alt="Inside Barista — warm wooden cafe interior with bookshelves"
              className="h-[420px] w-full scale-110 object-cover sm:h-[540px]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-cocoa/50 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 flex items-center gap-2 rounded-[20px] glass-dark px-4 py-2.5">
              <MapPin size={15} className="text-lemon" />
              <span className="font-display text-[11px] font-extrabold uppercase tracking-[0.2em] text-porcelain">
                46 Roast Lane · Old Mill District
              </span>
            </div>
          </div>

          {/* overlapping small image */}
          <div className="about-img-small absolute -bottom-10 -right-3 w-44 overflow-hidden rounded-[24px] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)] ring-4 ring-lemon sm:-right-8 sm:w-60">
            <img
              src="/images/about/about-2.jpg"
              alt="Barista pulling a fresh espresso shot"
              className="h-40 w-full object-cover sm:h-52"
              loading="lazy"
            />
          </div>

          {/* rotating badge */}
          <div className="absolute -top-8 -left-4 grid h-28 w-28 place-items-center sm:-left-8 sm:h-36 sm:w-36">
            <svg
              viewBox="0 0 100 100"
              className="absolute inset-0 h-full w-full animate-spin-slow"
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
            >
              <defs>
                <path id="badge-circle" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
              </defs>
              <circle cx="50" cy="50" r="50" fill="#e4ff3b" />
              <text className="font-display" fontSize="9.5" fontWeight="800" letterSpacing="2.5" fill="#2a1e17">
                <textPath href="#badge-circle">FRESH ROAST · SMALL BATCH · FRESH ROAST ·</textPath>
              </text>
            </svg>
            <Coffee className="relative text-espresso" size={30} strokeWidth={2.25} />
          </div>
        </div>

        {/* ── Copy ── */}
        <div className="about-copy lg:pl-2">
          <p className="font-display text-xs font-extrabold uppercase tracking-[0.4em] text-heather">
            The House Behind The Cup
          </p>
          <h2 className="mt-5 font-display text-4xl font-black uppercase leading-[0.95] tracking-tight sm:text-6xl">
            Fourteen years of
            <span className="text-lemon"> stubborn craft</span>
          </h2>
          <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-porcelain/75 sm:text-base">
            Barista started as a two-seat espresso cart in 2012. Today it's a full roastery and
            cafe — but the rule never changed: <strong className="font-bold text-porcelain">no shot leaves
            the counter unless it's perfect.</strong> We weigh every dose, time every pour, and bake
            every croissant while the city still sleeps.
          </p>

          <div className="about-feats mt-9 grid gap-x-8 gap-y-7 sm:grid-cols-2">
            {FEATURES.map((f) => (
              <div key={f.title} className="about-feat flex gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-[16px] bg-heather/20 text-heather ring-1 ring-heather/30">
                  <f.icon size={21} strokeWidth={2.25} />
                </span>
                <div>
                  <h3 className="font-display text-sm font-extrabold uppercase tracking-wider text-porcelain">
                    {f.title}
                  </h3>
                  <p className="mt-1 text-[13px] leading-relaxed text-porcelain/60">{f.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="about-stats mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {STATS.map((s) => (
              <StatCounter key={s.label} {...s} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
