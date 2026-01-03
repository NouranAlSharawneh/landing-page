"use client";
import "./ComingSoonReveal.css";
import React from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ComingSoonReveal = () => {
  useGSAP(() => {
    const section = document.querySelector(".coming-soon-reveal");
    const textLeft = document.querySelector(".coming-soon-text-left");
    const textRight = document.querySelector(".coming-soon-text-right");
    const imageWrapper = document.querySelector(".coming-soon-image");

    if (!section || !textLeft || !textRight || !imageWrapper) return;

    // Create timeline with ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=200%",
        scrub: 1.5,
        pin: true,
        pinSpacing: true,
      },
    });

    // Animate text splitting apart and fading out, then image revealing
    tl.to(
      textLeft,
      {
        x: "-250%",
        opacity: 0,
        duration: 1,
        ease: "power2.inOut",
      },
      0
    )
      .to(
        textRight,
        {
          x: "250%",
          opacity: 0,
          duration: 1,
          ease: "power2.inOut",
        },
        0
      )
      .fromTo(
        imageWrapper,
        {
          scale: 0,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 2.5,
          ease: "power2.out",
        },
        0.3
      );
  }, []);

  return (
    <>
      <section className="coming-soon-reveal">
        <div className="coming-soon-content">
          <h1 className="coming-soon-text-left">Many</h1>
          <h1 className="coming-soon-text-right">More</h1>
          <div className="coming-soon-image">
            <Image
              src="/images/enigmaPhotobooth.jpeg"
              alt="Enigma Photobooth"
              fill
              quality={90}
              priority
              sizes="100vw"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </section>
      <div className="divider"></div>
    </>
  );
};

export default React.memo(ComingSoonReveal);
