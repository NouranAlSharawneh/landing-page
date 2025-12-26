"use client";
import "./InnovateSection.css";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const InnovateSection = () => {
  useGSAP(() => {
    const section = document.querySelector(".innovate-wrap");
    const layers = document.querySelectorAll(".innovate-inner");

    if (!section || layers.length === 0) return;

    // Animate only the text elements within each layer
    layers.forEach((layer, index) => {
      const texts = layer.querySelectorAll(".innovate-text");

      if (texts.length >= 2) {
        const topText = texts[0];
        const bottomText = texts[1];
        const isMobile = window.innerWidth <= 600;
        const yMovement = index * (isMobile ? 90 : 70); // Bigger movement on mobile

        // TOP text - moves DOWN
        gsap.fromTo(
          topText,
          {
            y: 0,
            scale: 1,
          },
          {
            y: yMovement,
            scale: 0.85 - index * 0.13,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom top",
              scrub: 0.5,
            },
          }
        );

        // BOTTOM text - moves UP
        gsap.fromTo(
          bottomText,
          {
            y: 0,
            scale: 1,
          },
          {
            y: -yMovement,
            scale: 0.85 - index * 0.13,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom top",
              scrub: 0.5,
            },
          }
        );
      }
    });

    // Fade in header elements
    gsap.from(".innovate-eyebrow-wrap, .innovate-heading", {
      opacity: 0,
      y: 30,
      duration: 1,
      stagger: 0.2,
      scrollTrigger: {
        trigger: section,
        start: "top 95%",
        once: true,
      },
    });

    // Fade in first INNOVATE layer only
    const firstLayer = layers[0];
    if (firstLayer) {
      const firstLayerTexts = firstLayer.querySelectorAll(".innovate-text");
      gsap.from(firstLayerTexts, {
        opacity: 0,
        y: 30,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: section,
          start: "top 95%",
          once: true,
        },
      });
    }
  }, []);

  return (
    <section className="innovate-wrap">
      <header className="innovate-header">
        <div className="innovate-eyebrow-wrap">
          <div className="innovate-eyebrow-layout">
            <div className="innovate-mono innovate-richtext">
              <p>What drives us</p>
            </div>
          </div>
        </div>
        <h2 className="innovate-heading">
          At Enigma, we believe in constantly pushing boundaries and
        </h2>
      </header>

      <div className="innovate-content">
        {/* Base layer */}
        <div className="innovate-inner innovate-position-absolute">
          <h2 className="innovate-text">INNOVATE</h2>
          <h2 className="innovate-text">INNOVATE</h2>
        </div>

        {/* Absolutely positioned layers for parallax */}
        <div className="innovate-inner innovate-position-absolute">
          <h2 className="innovate-text">INNOVATE</h2>
          <h2 className="innovate-text">INNOVATE</h2>
        </div>

        <div className="innovate-inner innovate-position-absolute is-2">
          <h2 className="innovate-text">INNOVATE</h2>
          <h2 className="innovate-text">INNOVATE</h2>
        </div>

        <div className="innovate-inner innovate-position-absolute is-3">
          <h2 className="innovate-text">INNOVATE</h2>
          <h2 className="innovate-text">INNOVATE</h2>
        </div>

        <div className="innovate-inner innovate-position-absolute is-4">
          <h2 className="innovate-text">INNOVATE</h2>
          <h2 className="innovate-text">INNOVATE</h2>
        </div>

        <div className="innovate-inner innovate-position-absolute is-5">
          <h2 className="innovate-text">INNOVATE</h2>
          <h2 className="innovate-text">INNOVATE</h2>
        </div>

        <div className="innovate-inner innovate-position-absolute is-6">
          <h2 className="innovate-text">INNOVATE</h2>
          <h2 className="innovate-text">INNOVATE</h2>
        </div>
      </div>
    </section>
  );
};

export default InnovateSection;
