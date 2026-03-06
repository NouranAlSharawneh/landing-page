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
        "An interactive photo experience that transforms guest photos into unique AI-generated artworks inspired by the event theme. Guests capture their photo through the booth and instantly receive a stylized portrait they can share. It creates a fun and memorable moment for attendees.",
    },
    {
      index: "02",
      title: "Sketch to Art",
      image: "/images/ourProducts/sketchToArt.jpeg",
      description:
        "An interactive installation where guests draw simple sketches on a touchscreen and watch them transform into detailed digital artworks. The final illustration keeps the original idea while enhancing it with artistic styles inspired by the event theme.",
    },
    {
      index: "03",
      title: "Mosaic Grid",
      image: "/images/ourProducts/mosaic.jpeg",
      description:
        "A dynamic visual installation where guest photos  taken by the AI photobooth combine to form a large digital mosaic. Hundreds of small images gradually build a bigger artwork representing the event theme or brand identity.",
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
