/** @format */

import { useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Loader from "./components/Loader";
import Header from "./components/Header";
import Hero from "./components/Hero";
import CoffeeCarousel from "./components/CoffeeCarousel";
import MenuSection from "./components/MenuSection";
import About from "./components/About";
import Reviews from "./components/Reviews";
import Footer from "./components/Footer";

gsap.registerPlugin(ScrollTrigger);

// Adjust this delay (in milliseconds) between the loader exiting and page reveal.
const PAGE_REVEAL_DELAY_MS = 200;

export default function App() {
  const [started, setStarted] = useState(false);

  const handleDone = () => {
    window.setTimeout(() => {
      setStarted(true);
      requestAnimationFrame(() => ScrollTrigger.refresh());
    }, PAGE_REVEAL_DELAY_MS);
  };

  return (
    <div className="grain min-h-svh bg-porcelain font-body text-espresso">
      {!started && <Loader onDone={handleDone} />}
      <Header started={started} />
      <main
        className={`transition-opacity duration-300 ${started ? "opacity-100" : "invisible opacity-0"}`}>
        <Hero started={started} />
        <CoffeeCarousel />
        <MenuSection />
        <About />
        <Reviews />
      </main>
      <Footer />
    </div>
  );
}
