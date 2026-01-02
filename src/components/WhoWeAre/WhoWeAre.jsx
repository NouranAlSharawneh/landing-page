"use client";
import "./WhoWeAre.css";

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
    const targetProgress = 1;
    const maxTranslateAtTarget = maxTranslateX / targetProgress;

    // Adjust scroll distances for mobile
    const clipPathScrollMultiplier = isMobile ? 1 : 2;
    const pinScrollMultiplier = isMobile ? 3 : 6;

    ScrollTrigger.create({
      trigger: ".whoweare",
      start: "top bottom",
      end: `bottom+=${window.innerHeight * clipPathScrollMultiplier} top`,
      scrub: 1.5,
      invalidateOnRefresh: false,
      onUpdate: (self) => {
        const progress = self.progress;
        const clipPathValue = Math.min(progress * 100, 100);

        gsap.set(".whoweare-container", {
          clipPath: `circle(${clipPathValue}% at 50% 50%)`,
        });
      },
      onComplete: () => {
        gsap.set(".whoweare-container", {
          clipPath: `circle(100% at 50% 50%)`,
        });
      },
    });

    ScrollTrigger.create({
      trigger: ".whoweare",
      start: "top top",
      end: `+=${window.innerHeight * pinScrollMultiplier}`,
      pin: true,
      pinSpacing: true,
      scrub: 1.5,
      anticipatePin: 0.5,
      invalidateOnRefresh: false,
      onUpdate: (self) => {
        const progress = self.progress;

        let opacity, scale, translateX;

        if (progress <= 0.3) {
          const fadeProgress = progress / 0.3;
          opacity = fadeProgress;
          scale = 0.85 + 0.15 * fadeProgress;
          translateX = 0;
        } else {
          opacity = 1;
          scale = 1;
          const adjustedProgress = (progress - 0.3) / (1 - 0.3);
          translateX = -Math.min(
            adjustedProgress * maxTranslateAtTarget,
            maxTranslateX
          );
        }

        gsap.set(whoweareScroll, {
          opacity: opacity,
          scale: scale,
          x: translateX,
        });
      },
    });
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

export default WhoWeAre;
