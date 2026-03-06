"use client";
import { useState, useEffect } from "react";

import Menu from "@/components/Menu/Menu";

import { ReactLenis, useLenis } from "lenis/react";
import { gsap } from "gsap";
import { debounce } from "@/utils/debounce";

function LenisGSAPSync() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    gsap.ticker.lagSmoothing(0);

    const tickerCallback = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);

    return () => {
      gsap.ticker.remove(tickerCallback);
    };
  }, [lenis]);

  return null;
}

export default function ClientLayout({ children }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1000);
    };

    checkMobile();

    const debouncedCheckMobile = debounce(checkMobile, 200);
    window.addEventListener("resize", debouncedCheckMobile);

    return () => {
      window.removeEventListener("resize", debouncedCheckMobile);
    };
  }, []);

  const scrollSettings = isMobile
    ? {
        duration: 1.0,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        wheelMultiplier: 1,
        smoothWheel: true,
        syncTouch: true,
        syncTouchLerp: 0.075,
        touchMultiplier: 0.8,
        autoRaf: false,
      }
    : {
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        wheelMultiplier: 1,
        smoothWheel: true,
        autoRaf: false,
      };

  return (
    <ReactLenis root options={scrollSettings}>
      <LenisGSAPSync />
      <>
        <Menu />
      </>
      {children}
    </ReactLenis>
  );
}
