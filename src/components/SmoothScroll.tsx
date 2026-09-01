import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '../lib/gsap';

interface ScrollContextType {
  lenis: Lenis | null;
  scrollProgress: number; // 0 to 100
  scrollY: number;
  velocity: number;
  direction: number; // 1 = down, -1 = up
  scrollTo: (target: string | HTMLElement | number, options?: any) => void;
}

const ScrollContext = createContext<ScrollContextType>({
  lenis: null,
  scrollProgress: 0,
  scrollY: 0,
  velocity: 0,
  direction: 1,
  scrollTo: () => {},
});

export const useScrollMotion = () => useContext(ScrollContext);

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);
  const [scrollData, setScrollData] = useState({
    scrollProgress: 0,
    scrollY: 0,
    velocity: 0,
    direction: 1,
  });

  const scrollTo = useCallback((target: string | HTMLElement | number, options?: any) => {
    if (lenisInstance) {
      lenisInstance.scrollTo(target, {
        duration: 1.4,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        ...options,
      });
    } else {
      const el = typeof target === 'string' ? document.querySelector(target) : target;
      if (el && typeof el !== 'number') {
        (el as HTMLElement).scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [lenisInstance]);

  useEffect(() => {
    // Initialize Lenis with ultra-smooth editorial momentum configuration
    const lenis = new Lenis({
      duration: 1.35,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.6,
      autoRaf: false,
    });

    setLenisInstance(lenis);

    // Synchronize Lenis with GSAP ScrollTrigger
    lenis.on('scroll', (e: any) => {
      ScrollTrigger.update();

      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalScroll > 0 ? (e.scroll / totalScroll) * 100 : 0;

      setScrollData({
        scrollProgress: Math.min(100, Math.max(0, progress)),
        scrollY: Math.round(e.scroll),
        velocity: Math.round(e.velocity * 100) / 100,
        direction: e.direction,
      });
    });

    // Connect Lenis to GSAP Ticker for buttery smooth 120fps sync
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // Initial ScrollTrigger refresh after DOM stabilizes
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(timer);
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, []);

  return (
    <ScrollContext.Provider
      value={{
        lenis: lenisInstance,
        scrollTo,
        ...scrollData,
      }}
    >
      {children}
    </ScrollContext.Provider>
  );
}
