"use client";
import "./WhoWeAre.css";

import React from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WhoWeAre = () => {
  useGSAP(() => {
    const whoweareScroll = document.querySelector(".whoweare-scroll");
    const containerWidth = whoweareScroll.offsetWidth;
    const viewportWidth = window.innerWidth;
    const isMobile = window.innerWidth <= 768;

    const maxTranslateX = containerWidth - viewportWidth;

    // Adjust scroll distances for mobile
    const clipPathScrollMultiplier = isMobile ? 1 : 1.5;
    const pinScrollMultiplier = isMobile ? 2 : 4;

    gsap.fromTo(
      ".whoweare-container",
      { clipPath: "circle(0% at 50% 50%)" },
      {
        clipPath: "circle(100% at 50% 50%)",
        ease: "none",
        scrollTrigger: {
          trigger: ".whoweare",
          start: "top bottom",
          end: `bottom+=${window.innerHeight * clipPathScrollMultiplier} top`,
          scrub: 1.5,
        },
      }
    );

    const horizontalTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".whoweare",
        start: "top top",
        end: `+=${window.innerHeight * pinScrollMultiplier}`,
        pin: true,
        pinSpacing: true,
        scrub: 1.5,
        anticipatePin: 0.5,
      },
    });

    // Phase 1: fade in + scale up (0% to 30% of timeline)
    horizontalTl.fromTo(
      whoweareScroll,
      { opacity: 0, scale: 0.85 },
      { opacity: 1, scale: 1, ease: "none", duration: 0.3 },
      0
    );

    // Phase 2: horizontal scroll (30% to 100% of timeline)
    horizontalTl.fromTo(
      whoweareScroll,
      { x: 0 },
      { x: -maxTranslateX, ease: "none", duration: 0.7 },
      0.3
    );
  }, []);

  return (
    <section className="whoweare">
      <div className="whoweare-container">
        <div className="whoweare-scroll">
          <div className="whoweare-header">
            <h1>Our Products</h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(WhoWeAre);
