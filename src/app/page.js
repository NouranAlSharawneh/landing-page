"use client";
import "./home.css";
import { useState, useEffect } from "react";
import { useLenis } from "lenis/react";

import DynamicBackground from "@/components/DynamicBackground/DynamicBackground";
import Copy from "@/components/Copy/Copy";
import BtnLink from "@/components/BtnLink/BtnLink";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CustomEase from "gsap/CustomEase";
import WhoWeAre from "@/components/WhoWeAre/WhoWeAre";
import ProcessCards from "@/components/ProcessCards/ProcessCards";
import Footer from "@/components/Footer/Footer";
import HowWeWork from "@/components/HowWeWork/HowWeWork";
import PixelTransition from "@/components/PixelTransition/PixelTransition";
import InnovateSection from "@/components/InnovateSection/InnovateSection";
import TrustedCompanies from "@/components/TrustedCompanies/TrustedCompanies";
import ComingSoonReveal from "@/components/ComingSoonReveal/ComingSoonReveal";

gsap.registerPlugin(ScrollTrigger, CustomEase);
CustomEase.create("hop", "0.9, 0, 0.1, 1");

let isInitialLoad = true;

export default function Home() {
  const [showPreloader, setShowPreloader] = useState(isInitialLoad);
  const lenis = useLenis();

  useEffect(() => {
    return () => {
      isInitialLoad = false;
    };
  }, []);

  useEffect(() => {
    if (showPreloader && lenis) {
      lenis.stop();
    } else if (!showPreloader && lenis) {
      lenis.start();
    }
  }, [showPreloader, lenis]);

  useGSAP(() => {
    const heroLink = document.querySelector(".hero-link");
    const animationDelay = showPreloader ? 3.5 : 0.9;

    const missionLinkWrapper = document.querySelector(".mission-link");

    if (showPreloader) {
      const tl = gsap.timeline({
        delay: 0.1,
        defaults: {
          ease: "hop",
        },
      });

      const counts = document.querySelectorAll(".count");
      const progressBar = document.querySelector(".progress-bar");
      const preloaderOverlay = document.querySelector(".preloader-overlay");

      const progressTl = gsap.timeline({
        delay: 0.1,
      });

      counts.forEach((count, index) => {
        const digits = count.querySelectorAll(".digit h1");

        tl.to(
          digits,
          {
            y: "0%",
            duration: 0.25,
            stagger: 0.02,
          },
          index * 0.25
        );

        if (index < counts.length) {
          tl.to(
            digits,
            {
              y: "-120%",
              duration: 0.25,
              stagger: 0.02,
            },
            index * 0.25 + 0.25
          );
        }

        progressTl.to(
          progressBar,
          {
            scaleY: (index + 1) / counts.length,
            duration: 0.25,
            ease: "hop",
          },
          index * 0.25
        );
      });

      progressTl
        .set(progressBar, {
          transformOrigin: "top",
        })
        .to(progressBar, {
          scaleY: 0,
          duration: 0.2,
          ease: "hop",
        })
        .to(preloaderOverlay, {
          opacity: 0,
          duration: 0.1,
          ease: "power2.out",
          onComplete: () => {
            preloaderOverlay.style.display = "none";
            setShowPreloader(false);
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

      <section id="hero" className="hero">
        <DynamicBackground />

        <div className="hero-content" style={{ pointerEvents: "none" }}>
          <div className="hero-header">
            <div className="hero-header-col-lg"></div>
            <div className="hero-header-col-sm">
              <Copy animateOnScroll={false} delay={showPreloader ? 3.0 : 0.9}>
                <h3>
                  Delivering custom AI and interactive solutions that bring your
                  vision to life with impact.
                </h3>
              </Copy>
            </div>
          </div>

          <div className="hero-footer">
            <div className="hero-footer-col-lg">
              <Copy animateOnScroll={false} delay={showPreloader ? 3.5 : 0.9}>
                <p className="sm caps mono">Enigma</p>
                <p className="sm caps mono">Based in Riyadh, Saudi Arabia</p>
              </Copy>
            </div>
            <div className="hero-footer-col-sm">
              <div className="hero-tags">
                <Copy animateOnScroll={false} delay={showPreloader ? 3.5 : 0.9}>
                  <p className="sm caps mono">AI-Powered Experiences</p>
                  <p className="sm caps mono">Custom Interactive Systems</p>
                  <p className="sm caps mono">Creative Development</p>
                </Copy>
              </div>

              <div className="hero-link">
                <BtnLink route="#contact" label="contact" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <TrustedCompanies />

      <InnovateSection />

      <section id="how-we-work" className="how-we-work-container">
        <div className="container">
          <HowWeWork />
        </div>
      </section>

      <div id="who-we-are">
        <WhoWeAre />
      </div>

      <section className="mission-intro">
        <div className="mission-intro-col-sm"></div>
        <div className="mission-intro-col-lg">
          <div className="mission-intro-copy">
            <Copy>
              <h3>
                We build intelligent, scalable products that merge strategy,
                design, and engineering to solve real business challenges.
              </h3>
              <br />
              <h3>
                Featured below: our live, market-tested solutions gaining real
                traction today.
              </h3>
            </Copy>

            <div className="mission-link">
              <BtnLink label="Some of our products" dark disabled arrowDown />
            </div>
          </div>
        </div>
      </section>

      <div id="work">
        <ProcessCards />
      </div>

      <ComingSoonReveal />

      <PixelTransition />

      <Footer />
    </>
  );
}
