/** @format */

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Coffee } from "lucide-react";
import loaderVideo from "../videos/loader.mp4";

interface LoaderProps {
  onDone: () => void;
}

const BRAND = "BARISTA".split("");

export default function Loader({ onDone }: LoaderProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef(false);
  const [progress, setProgress] = useState(0);

  /* Lock page scroll while loading */
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  /* Ensure muted autoplay works across browsers */
  useEffect(() => {
    const v = videoRef.current;
    if (v) {
      v.muted = true;
      v.defaultMuted = true;
    }
  }, []);

  /* Brand letters entrance & 9.5s Linear Progress Animation */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".loader-letter",
        { yPercent: 120, rotate: 6 },
        {
          yPercent: 0,
          rotate: 0,
          duration: 1,
          ease: "power4.out",
          stagger: 0.07,
          delay: 0.25,
        },
      );
      gsap.fromTo(
        ".loader-fade",
        { opacity: 0, y: 14 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.12,
          delay: 0.7,
        },
      );

      // Smoothly animate the progress counter and bar linearly over exactly 9.5 seconds
      const obj = { val: 0 };
      gsap.to(obj, {
        val: 100,
        duration: 9.5,
        ease: "none", // Perfectly steady linear speed (approx ~10.5% every second)
        onUpdate: () => {
          const p = obj.val / 100;
          setProgress(p);
          if (barRef.current) {
            barRef.current.style.transform = `scaleX(${p})`;
          }
        },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const exit = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    const root = rootRef.current;
    if (!root) {
      onDone();
      return;
    }

    // Force progress to 100% on exit
    setProgress(1);
    if (barRef.current) barRef.current.style.transform = `scaleX(1)`;

    const tl = gsap.timeline({ onComplete: onDone });
    tl.to(".loader-letter", {
      yPercent: -120,
      duration: 0.55,
      ease: "power3.in",
      stagger: 0.04,
    })
      .to(
        ".loader-fade, .loader-ui",
        { opacity: 0, y: -16, duration: 0.4, ease: "power2.in" },
        "<0.1",
      )
      .to(
        videoRef.current,
        { scale: 1.12, duration: 1.1, ease: "power3.inOut" },
        "<",
      )
      .to(root, { yPercent: -100, duration: 1, ease: "expo.inOut" }, "-=0.75");
  }, [onDone]);

  /* Safety net / max duration timer: exit automatically at 9.5s */
  useEffect(() => {
    const t = window.setTimeout(() => exit(), 9500);
    return () => window.clearTimeout(t);
  }, [exit]);

  return (
    <div
      ref={rootRef}
      onClick={exit}
      className="fixed inset-0 z-[200] cursor-pointer overflow-hidden bg-cocoa"
      role="presentation"
      aria-label="Loading Barista website">
      {/* Fullscreen video */}
      <video
        ref={videoRef}
        src={loaderVideo}
        muted
        playsInline
        autoPlay
        preload="auto"
        onEnded={exit}
        onError={exit}
        onCanPlay={(e) => {
          e.currentTarget.playbackRate = 1.35;
          e.currentTarget.play().catch(() => {});
        }}
        className="absolute inset-0 h-full w-full object-cover opacity-70"
      />
      {/* Cinematic washes */}
      <div className="absolute inset-0 bg-gradient-to-t from-cocoa via-cocoa/25 to-cocoa/60" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(27,18,11,0.75)_100%)]" />

      {/* Center brand */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <div className="loader-fade mb-5 flex items-center gap-3 text-lemon">
          <span className="grid h-10 w-10 place-items-center rounded-[14px] bg-lemon text-espresso">
            <Coffee size={20} strokeWidth={2.5} />
          </span>
          <span className="font-display text-xs font-bold uppercase tracking-[0.45em] sm:text-sm">
            Artisan Coffee House
          </span>
        </div>

        <h1
          className="font-display text-[clamp(3.2rem,14vw,9.5rem)] font-black uppercase leading-none tracking-tight text-porcelain"
          aria-label="Barista">
          {BRAND.map((ch, i) => (
            <span key={i} className="mask-line">
              <span className="loader-letter inline-block">{ch}</span>
            </span>
          ))}
        </h1>

        <p className="loader-fade mt-5 font-display text-[11px] font-bold uppercase tracking-[0.5em] text-porcelain/60 sm:text-xs">
          Brewing your experience
        </p>
      </div>

      {/* Bottom UI: progress + percent + skip */}
      <div className="loader-ui absolute inset-x-0 bottom-0 z-10 px-6 pb-7 sm:px-10 sm:pb-9">
        <div className="mb-4 flex items-end justify-between">
          <span className="font-display text-4xl font-black tabular-nums leading-none text-porcelain sm:text-5xl">
            {Math.round(progress * 100)}
            <span className="text-lemon">%</span>
          </span>
          <span className="font-display text-[10px] font-bold uppercase tracking-[0.35em] text-porcelain/50 sm:text-xs">
            Click anywhere to skip
          </span>
        </div>
        <div className="h-[3px] w-full overflow-hidden rounded-full bg-porcelain/15">
          <div
            ref={barRef}
            className="h-full w-full origin-left rounded-full bg-lemon"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      </div>
    </div>
  );
}
