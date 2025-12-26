"use client";
import "./PixelTransition.css";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PixelTransition() {
  const containerRef = useRef(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const pixels = containerRef.current.querySelectorAll(".pixel-item");

    // Create array of indices and shuffle them for random order
    const indices = Array.from({ length: pixels.length }, (_, i) => i);

    // Fisher-Yates shuffle algorithm
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }

    // Create timeline with ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });

    // Animate each pixel in random order
    indices.forEach((index, position) => {
      const progress = position / indices.length;

      tl.to(
        pixels[index],
        {
          backgroundColor: "#783293",
          duration: 0.3,
          ease: "none",
        },
        progress * 0.8 // Spread animations across 80% of timeline
      );
    });
  }, []);

  // Generate 90 pixel items (10 columns x 9 rows)
  const pixelCount = 90;
  const pixels = Array.from({ length: pixelCount }, (_, i) => i);

  return (
    <section className="pixel-transition-section">
      <div ref={containerRef} className="pixel-transition">
        {pixels.map((index) => (
          <div key={index} className="pixel-item" />
        ))}
      </div>
    </section>
  );
}
