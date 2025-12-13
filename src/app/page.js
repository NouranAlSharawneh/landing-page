"use client";
import "./home.css";
import { useState, useEffect } from "react";

import DynamicBackground from "@/components/DynamicBackground/DynamicBackground";
import Copy from "@/components/Copy/Copy";
import BtnLink from "@/components/BtnLink/BtnLink";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CustomEase from "gsap/CustomEase";
import WhoWeAre from "@/components/WhoWeAre/WhoWeAre";
import ProcessCards from "@/components/ProcessCards/ProcessCards";
import Footer from "@/components/Footer copy/Footer";
import HowWeWork from "@/components/HowWeWork/HowWeWork";

gsap.registerPlugin(ScrollTrigger, CustomEase);
CustomEase.create("hop", "0.9, 0, 0.1, 1");

let isInitialLoad = true;

export default function Home() {
  const [showPreloader, setShowPreloader] = useState(isInitialLoad);

  useEffect(() => {
    return () => {
      isInitialLoad = false;
    };
  }, []);

  useGSAP(() => {
    const heroLink = document.querySelector(".hero-link");
    const animationDelay = showPreloader ? 6.2 : 0.9;

    const missionLinkWrapper = document.querySelector(".mission-link");

    if (showPreloader) {
      const tl = gsap.timeline({
        delay: 0.3,
        defaults: {
          ease: "hop",
        },
      });

      const counts = document.querySelectorAll(".count");
      const progressBar = document.querySelector(".progress-bar");
      const preloaderOverlay = document.querySelector(".preloader-overlay");

      const progressTl = gsap.timeline({
        delay: 0.3,
      });

      counts.forEach((count, index) => {
        const digits = count.querySelectorAll(".digit h1");

        tl.to(
          digits,
          {
            y: "0%",
            duration: 1,
            stagger: 0.075,
          },
          index * 1
        );

        if (index < counts.length) {
          tl.to(
            digits,
            {
              y: "-120%",
              duration: 1,
              stagger: 0.075,
            },
            index * 1 + 1
          );
        }

        progressTl.to(
          progressBar,
          {
            scaleY: (index + 1) / counts.length,
            duration: 1,
            ease: "hop",
          },
          index * 1
        );
      });

      progressTl
        .set(progressBar, {
          transformOrigin: "top",
        })
        .to(progressBar, {
          scaleY: 0,
          duration: 0.75,
          ease: "hop",
        })
        .to(preloaderOverlay, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
          onComplete: () => {
            preloaderOverlay.style.display = "none";
          },
        });
    }

    if (heroLink) {
      gsap.set(heroLink, { y: 30, opacity: 0 });

      gsap.to(heroLink, {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: animationDelay,
        ease: "power4.out",
      });
    }

    if (missionLinkWrapper) {
      gsap.set(missionLinkWrapper, { y: 30, opacity: 0 });

      ScrollTrigger.create({
        trigger: missionLinkWrapper.closest(".mission-intro-copy"),
        start: "top 75%",
        once: true,
        onEnter: () => {
          gsap.to(missionLinkWrapper, {
            y: 0,
            opacity: 1,
            duration: 1.5,
            delay: 1.5,
            ease: "power3.out",
          });
        },
      });
    }
  }, [showPreloader]);

  return (
    <>
      {showPreloader && (
        <div className="preloader-overlay">
          <div className="progress-bar"></div>
          <div className="counter">
            <div className="count">
              <div className="digit">
                <h1>0</h1>
              </div>
              <div className="digit">
                <h1>0</h1>
              </div>
            </div>
            <div className="count">
              <div className="digit">
                <h1>2</h1>
              </div>
              <div className="digit">
                <h1>7</h1>
              </div>
            </div>
            <div className="count">
              <div className="digit">
                <h1>6</h1>
              </div>
              <div className="digit">
                <h1>5</h1>
              </div>
            </div>
            <div className="count">
              <div className="digit">
                <h1>9</h1>
              </div>
              <div className="digit">
                <h1>8</h1>
              </div>
            </div>
            <div className="count">
              <div className="digit">
                <h1>9</h1>
              </div>
              <div className="digit">
                <h1>9</h1>
              </div>
            </div>
          </div>
        </div>
      )}

      <section className="hero">
        <DynamicBackground />

        <div className="hero-content" style={{ pointerEvents: "none" }}>
          <div className="hero-header">
            <div className="hero-header-col-lg"></div>
            <div className="hero-header-col-sm">
              <Copy animateOnScroll={false} delay={showPreloader ? 6.2 : 0.9}>
                <h3>
                  Delivering custom AI and interactive solutions that bring your
                  vision to life with impact.
                </h3>
              </Copy>
            </div>
          </div>

          <div className="hero-footer">
            <div className="hero-footer-col-lg">
              <Copy animateOnScroll={false} delay={showPreloader ? 6.2 : 0.9}>
                <p className="sm caps mono">Enigma</p>
                <p className="sm caps mono">Based in Riyadh, Saudi Arabia</p>
              </Copy>
            </div>
            <div className="hero-footer-col-sm">
              <div className="hero-tags">
                <Copy animateOnScroll={false} delay={showPreloader ? 6.2 : 0.9}>
                  <p className="sm caps mono">AI-Powered Experiences</p>
                  <p className="sm caps mono">Custom Interactive Systems</p>
                  <p className="sm caps mono">Creative Development</p>
                  <p className="sm caps mono">Smart Product Development</p>
                </Copy>
              </div>

              <div className="hero-link">
                <BtnLink
                  // route="/contact"
                  label="contact"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <WhoWeAre />

      <section className="mission-intro">
        <div className="mission-intro-col-sm"></div>
        <div className="mission-intro-col-lg">
          <div className="mission-intro-copy">
            <Copy>
              {/* <h3>
                We are a digital studio dedicated to creating clear and
                purposeful online experiences. Our work is rooted in structure,
                guided by systems, and shaped through close collaboration.
              </h3> */}
              <h3>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                euismod, nunc ut sollicitudin malesuada, nunc nisl aliquam
                mauris, eget aliquam nisl nunc euismod nunc. Lorem ipsum dolor
                sit amet, consectetur adipiscing elit. Sed euismod, nunc ut
              </h3>
              <br />
              {/* <h3>
                With a focus on design and development, we build scalable
                solutions that reflect quiet precision and long-term value.
                Every project is an exercise in restraint, intention, and
                technical care.
              </h3> */}
              <h3>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                euismod, nunc ut sollicitudin malesuada, nunc nisl aliquam
                mauris, eget aliquam nisl nunc euismod nunc. Lorem ipsum dolor
                sit amet, consectetur adipiscing elit. Sed euismod,
              </h3>
            </Copy>

            <div className="mission-link">
              <BtnLink
                // route="/work"
                label="View Work"
                dark
              />
            </div>
          </div>
        </div>
      </section>

      <ProcessCards />

      <section className="how-we-work-container">
        <div className="container">
          <HowWeWork />
        </div>
      </section>

      <Footer />
    </>
  );
}
