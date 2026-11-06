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
import CartPanel from "./components/CartPanel";
import { CartProvider } from "./context/CartContext";
import RateUs from "./components/RateUs";

gsap.registerPlugin(ScrollTrigger);

// Adjust this delay (in milliseconds) between the loader exiting and page reveal.
const PAGE_REVEAL_DELAY_MS = 200;

export default function App() {
  const [started, setStarted] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const handleDone = () => {
    window.setTimeout(() => {
      setStarted(true);
      requestAnimationFrame(() => ScrollTrigger.refresh());
    }, PAGE_REVEAL_DELAY_MS);
  };

  return (
    <CartProvider>
    <div className="grain min-h-svh bg-porcelain font-body text-espresso">
      {!started && <Loader onDone={handleDone} />}
      <Header started={started} onCartOpen={() => setCartOpen(true)} />
      <main
        className={`transition-opacity duration-300 ${started ? "opacity-100" : "invisible opacity-0"}`}>
        <Hero started={started} />
        <CoffeeCarousel />
        <MenuSection />
        <About />
        <Reviews />
      </main>
      <Footer />
      <CartPanel open={cartOpen} onClose={() => setCartOpen(false)} />
      <RateUs />
    </div>
    </CartProvider>
  );
}
