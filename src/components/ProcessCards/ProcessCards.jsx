"use client";
import "./ProcessCards.css";
import React from "react";
import Image from "next/image";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ProcessCards = () => {
  const processCardsData = [
    {
      index: "01",
      title: "Photobooth",
      image: "/images/ourProducts/photobooth.jpeg",
      description:
        "Blending real photography with AI creativity — photos delivered instantly to the user.",
    },
    {
      index: "02",
      title: "Sketch to Art",
      image: "/images/ourProducts/sketchToArt.jpeg",
      description:
        "We created an interactive system where users can draw a simple sketch, and our AI instantly transforms it into a stunning digital artwork. It’s an immersive installation that turns pure imagination into visual art—inviting users to create, explore, and be inspired by the power of AI-driven creativity.",
    },
    {
      index: "03",
      title: "Mosaic Grid",
      image: "/images/ourProducts/mosaic.jpeg",
      description:
        "Our Mosaic Grid system transforms event engagement into a meaningful, memorable experience. It allows attendees to capture photos during the event and instantly place them within a beautifully designed digital mosaic grid displayed above your brand or event logo.",
    },
  ];

  useGSAP(() => {
    const processCards = document.querySelectorAll(".process-card");

    processCards.forEach((card, index) => {
      if (index < processCards.length - 1) {
        ScrollTrigger.create({
          trigger: card,
          start: "top top",
          endTrigger: processCards[processCards.length - 1],
          end: "top top",
          pin: true,
          pinSpacing: false,
          id: `card-pin-${index}`,
        });
      }

      if (index < processCards.length - 1) {
        // Create a timeline for smooth, scrubbed animation
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: processCards[index + 1],
            start: "top bottom",
            end: "top top",
            scrub: 0.5, // Smooth scrubbing with slight delay for polish
            id: `card-animate-${index}`,
          },
        });

        // Animate from initial state to final state
        const rotation = index % 2 === 0 ? 5 : -5;
        tl.to(card, {
          scale: 0.75, // 1 - 0.25
          rotation: rotation,
          "--after-opacity": 1,
          ease: "none", // Linear easing for scrubbed animations
        });
      }
    });
  }, []);

  return (
    <div className="process-cards">
      {processCardsData.map((cardData, index) => (
        <div key={index} className="process-card">
          <div className="process-card-index">
            <h1>{cardData.index}</h1>
          </div>
          <div className="process-card-content">
            <div className="process-card-content-wrapper">
              <h1 className="process-card-header">{cardData.title}</h1>

              <div className="process-card-img">
                <Image
                  src={cardData.image}
                  alt={cardData.title}
                  width={1920}
                  height={1152}
                  quality={85}
                  loading="lazy"
                  sizes="(max-width: 1000px) 100vw, 75vw"
                />
              </div>

              <div className="process-card-copy">
                <div className="process-card-copy-title">
                  <p className="caps">(About the product)</p>
                </div>
                <div className="process-card-copy-description">
                  <p>{cardData.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default React.memo(ProcessCards);
