import { useState } from "react";
import {
  ArrowUpRight,
  Check,
  Clock,
  Coffee,
  Mail,
  MapPin,
  Phone,
  Send,
  MessageCircle,
} from "lucide-react";

/* ── Inline brand icons (lucide no longer ships brand glyphs) ── */
const iconProps = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const InstagramIcon = () => (
  <svg {...iconProps}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const QUICK_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Signatures", href: "#signatures" },
  { label: "Menu", href: "#menu" },
  { label: "About", href: "#about" },
  { label: "Reviews", href: "#reviews" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
    window.setTimeout(() => setSubscribed(false), 3500);
  };

  return (
    <footer id="contact" className="relative overflow-hidden bg-cocoa text-porcelain">
      {/* top separator ribbon */}
      <div aria-hidden="true" className="h-2 w-full bg-gradient-to-r from-heather via-lemon to-heather" />

      <div className="relative mx-auto max-w-7xl px-5 pb-10 pt-20 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* ── Left: brand + contact ── */}
          <div>
            <a href="#home" className="flex items-center gap-3">
              <span className="relative grid h-12 w-12 place-items-center rounded-[16px] bg-heather text-porcelain">
                <Coffee size={24} strokeWidth={2.4} />
                <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-lemon ring-2 ring-cocoa" />
              </span>
              <span className="font-display text-3xl font-black uppercase tracking-tight">
                Barista<span className="text-heather">.</span>
              </span>
            </a>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-porcelain/65">
              An artisan coffee house obsessed with the details — from soil to sip. Come for the
              pour, stay for the people.
            </p>

            {/* Contact list */}
            <ul className="mt-8 space-y-4">
              <li className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[14px] bg-white/[0.06] text-lemon ring-1 ring-white/10">
                  <MapPin size={19} />
                </span>
                <div>
                  <p className="font-display text-[11px] font-extrabold uppercase tracking-[0.25em] text-porcelain/45">
                    Find Us
                  </p>
                  <p className="mt-1 font-display text-sm font-bold text-porcelain">
                    46 Roast Lane, Old Mill District, Portland
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[14px] bg-white/[0.06] text-lemon ring-1 ring-white/10">
                  <Phone size={19} />
                </span>
                <div>
                  <p className="font-display text-[11px] font-extrabold uppercase tracking-[0.25em] text-porcelain/45">
                    Call Ahead
                  </p>
                  <a href="tel:+15035550194" className="mt-1 block font-display text-sm font-bold text-porcelain transition-colors hover:text-lemon">
                    +1 (503) 555-0194
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[14px] bg-white/[0.06] text-lemon ring-1 ring-white/10">
                  <Mail size={19} />
                </span>
                <div>
                  <p className="font-display text-[11px] font-extrabold uppercase tracking-[0.25em] text-porcelain/45">
                    Write To Us
                  </p>
                  <a href="mailto:hello@barista.cafe" className="mt-1 block font-display text-sm font-bold text-porcelain transition-colors hover:text-lemon">
                    hello@barista.cafe
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[14px] bg-white/[0.06] text-lemon ring-1 ring-white/10">
                  <Clock size={19} />
                </span>
                <div>
                  <p className="font-display text-[11px] font-extrabold uppercase tracking-[0.25em] text-porcelain/45">
                    Open Daily
                  </p>
                  <p className="mt-1 font-display text-sm font-bold text-porcelain">
                    7:00 AM — 10:00 PM <span className="text-heather">·</span> Weekends till midnight
                  </p>
                </div>
              </li>
            </ul>

            {/* Newsletter */}
            <form onSubmit={subscribe} className="mt-9 max-w-md">
              <label htmlFor="newsletter" className="font-display text-[11px] font-extrabold uppercase tracking-[0.25em] text-porcelain/45">
                Fresh drops, first sips
              </label>
              <div className="mt-3 flex gap-2 rounded-[20px] bg-white/[0.06] p-2 ring-1 ring-white/10 focus-within:ring-heather">
                <input
                  id="newsletter"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full min-w-0 flex-1 bg-transparent px-3 text-sm text-porcelain placeholder:text-porcelain/35 focus:outline-none"
                />
                <button
                  type="submit"
                  className={`grid h-11 w-11 shrink-0 place-items-center rounded-[16px] transition-all duration-300 active:scale-90 ${
                    subscribed ? "bg-lemon text-espresso" : "bg-heather text-porcelain hover:bg-heather-deep"
                  }`}
                  aria-label={subscribed ? "Subscribed" : "Subscribe"}
                >
                  {subscribed ? <Check size={19} strokeWidth={3} /> : <Send size={17} strokeWidth={2.5} />}
                </button>
              </div>
              {subscribed && (
                <p className="mt-2 text-xs font-bold uppercase tracking-widest text-lemon">
                  You're on the list — see you at the counter.
                </p>
              )}
            </form>

            {/* Socials + quick links */}
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a href="https://www.instagram.com/symmify" target="_blank" rel="noreferrer" aria-label="Symmify on Instagram" className="grid h-11 w-11 place-items-center rounded-[16px] bg-white/[0.06] text-porcelain/70 ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-1 hover:bg-lemon hover:text-espresso hover:ring-lemon">
                <InstagramIcon />
              </a>
              <a href="https://wa.me/919325646874" target="_blank" rel="noreferrer" aria-label="Chat with Symmify on WhatsApp" className="grid h-11 w-11 place-items-center rounded-[16px] bg-white/[0.06] text-porcelain/70 ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-1 hover:bg-lemon hover:text-espresso hover:ring-lemon">
                <MessageCircle size={18} />
              </a>
              <a href="mailto:symmify@gmail.com" aria-label="Email Symmify" className="grid h-11 w-11 place-items-center rounded-[16px] bg-white/[0.06] text-porcelain/70 ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-1 hover:bg-lemon hover:text-espresso hover:ring-lemon">
                <Mail size={18} />
              </a>
              <span className="mx-1 hidden h-6 w-px bg-white/15 sm:block" />
              {QUICK_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="font-display text-[12px] font-bold uppercase tracking-widest text-porcelain/50 transition-colors hover:text-lemon"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          {/* ── Right: map ── */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between pb-4">
              <p className="font-display text-xs font-extrabold uppercase tracking-[0.4em] text-heather">
                Drop By Anytime
              </p>
              <a
                href="https://www.openstreetmap.org/?mlat=40.6812&mlon=-73.9442#map=16/40.6812/-73.9442"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-1.5 rounded-[20px] bg-heather px-4 py-2.5 font-display text-[11px] font-extrabold uppercase tracking-widest text-porcelain transition-colors hover:bg-heather-deep"
              >
                Directions
                <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
            <div className="relative min-h-[340px] flex-1 overflow-hidden rounded-[24px] ring-1 ring-white/15 shadow-[0_30px_70px_-25px_rgba(0,0,0,0.75)] lg:min-h-[460px]">
              <iframe
                title="Barista cafe location map"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-73.9622%2C40.6732%2C-73.9262%2C40.6892&layer=mapnik&marker=40.6812%2C-73.9442"
                className="map-tint absolute inset-0 h-full w-full border-0"
                loading="lazy"
              />
              {/* floating address card */}
              <div className="pointer-events-none absolute bottom-4 left-4 flex items-center gap-3 rounded-[20px] glass-dark px-5 py-4">
                <span className="grid h-10 w-10 place-items-center rounded-[12px] bg-lemon text-espresso">
                  <MapPin size={18} strokeWidth={2.5} />
                </span>
                <div>
                  <p className="font-display text-sm font-black uppercase text-porcelain">Barista Café</p>
                  <p className="font-display text-[11px] font-bold uppercase tracking-widest text-porcelain/60">
                    46 Roast Lane · Portland
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-7 sm:flex-row">
          <p className="font-display text-[11px] font-bold uppercase tracking-[0.25em] text-porcelain/40">
            © 2026 Barista Coffee House · All rights reserved
          </p>
          <p className="flex items-center gap-2 font-display text-[11px] font-bold uppercase tracking-[0.25em] text-porcelain/40">
            Brewed with <span className="grid h-5 w-5 place-items-center rounded-[6px] bg-lemon text-espresso"><Coffee size={11} strokeWidth={3} /></span> in Portland
          </p>
          <p className="font-display text-[11px] font-bold uppercase tracking-[0.2em] text-porcelain/40">
            Powered by <a href="https://www.instagram.com/symmify" target="_blank" rel="noreferrer" className="text-porcelain/70 transition-colors hover:text-lemon">Symmify</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
