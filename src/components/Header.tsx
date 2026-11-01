import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Coffee, Menu as MenuIcon, X, ArrowUpRight } from "lucide-react";

const NAV = [
  { label: "Home", href: "#home" },
  { label: "Signatures", href: "#signatures" },
  { label: "Menu", href: "#menu" },
  { label: "About", href: "#about" },
  { label: "Reviews", href: "#reviews" },
];

interface HeaderProps {
  started: boolean;
}

export default function Header({ started }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!started || !barRef.current) return;
    const entrance = gsap.fromTo(
      barRef.current,
      { y: -90, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "expo.out" },
    );
    return () => entrance.kill();
  }, [started]);

  /* Lock scroll when mobile menu open */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div
        ref={barRef}
        className={`fixed inset-x-3 top-3 z-[100] sm:inset-x-5 sm:top-5 ${
          started ? "" : "pointer-events-none invisible"
        }`}
      >
        <header
          className={`mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-[20px] px-4 py-3 transition-all duration-500 sm:px-6 ${
            scrolled ? "glass-porcelain shadow-[0_18px_50px_-12px_rgba(42,30,23,0.28)]" : "glass-porcelain"
          }`}
        >
          {/* Logo */}
          <a href="#home" className="group flex items-center gap-3" aria-label="Barista home">
            <span className="relative grid h-11 w-11 place-items-center rounded-[16px] bg-espresso text-lemon transition-transform duration-500 group-hover:rotate-[-8deg]">
              <Coffee size={22} strokeWidth={2.4} />
              <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-heather ring-2 ring-porcelain" />
            </span>
            <span className="font-display text-xl font-black uppercase tracking-tight text-espresso sm:text-2xl">
              Barista<span className="text-heather">.</span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group relative rounded-[20px] px-4 py-2 font-display text-[13px] font-bold uppercase tracking-widest text-espresso/70 transition-colors hover:text-espresso"
              >
                {item.label}
                <span className="absolute inset-x-4 -bottom-px h-[3px] origin-left scale-x-0 rounded-full bg-lemon transition-transform duration-300 ease-out group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          {/* CTA + burger */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="#menu"
              className="group hidden items-center gap-2 rounded-[20px] bg-espresso px-5 py-3 font-display text-[13px] font-extrabold uppercase tracking-widest text-porcelain transition-all duration-300 hover:bg-heather-deep hover:shadow-[0_10px_30px_-8px_rgba(124,92,191,0.7)] sm:inline-flex"
            >
              Order Now
              <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <button
              onClick={() => setOpen(true)}
              className="grid h-11 w-11 place-items-center rounded-[16px] bg-heather text-porcelain transition-colors hover:bg-heather-deep lg:hidden"
              aria-label="Open menu"
            >
              <MenuIcon size={22} />
            </button>
          </div>
        </header>
      </div>

      {/* Mobile overlay menu */}
      <div
        className={`fixed inset-0 z-[150] flex flex-col bg-espresso transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-6">
          <span className="font-display text-2xl font-black uppercase text-porcelain">
            Barista<span className="text-heather">.</span>
          </span>
          <button
            onClick={() => setOpen(false)}
            className="grid h-11 w-11 place-items-center rounded-[16px] bg-lemon text-espresso"
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>
        <nav className="flex flex-1 flex-col items-start justify-center gap-2 px-8" aria-label="Mobile">
          {NAV.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`font-display text-5xl font-black uppercase tracking-tight text-porcelain transition-all duration-500 hover:text-lemon sm:text-6xl ${
                open ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: open ? `${120 + i * 70}ms` : "0ms" }}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="px-8 pb-10">
          <a
            href="#menu"
            onClick={() => setOpen(false)}
            className="inline-flex items-center gap-2 rounded-[20px] bg-lemon px-7 py-4 font-display text-sm font-extrabold uppercase tracking-widest text-espresso"
          >
            Order Now <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
    </>
  );
}
