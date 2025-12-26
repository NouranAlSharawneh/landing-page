"use client";
import "./HowWeWork.css";

import { useEffect, useRef, useState } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import Copy from "../Copy/Copy";

gsap.registerPlugin(ScrollTrigger);

const HowWeWork = () => {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef(null);
  const stepsRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const scrollTriggersRef = useRef([]);

  const steps = [
    {
      title: "Discovery / Insight",
      image: "images/howWeWork/howWeWork2.png",
      description:
        "We start by understanding your vision, users, and business context. Through workshops, research, and data analysis, we uncover opportunities and define clear objectives for a solution built around your needs.",
    },
    {
      title: "Strategy / Architecture",
      image: "images/howWeWork/howWeWork3.png",
      description:
        "We translate insights into a clear strategy and technical direction. User flows, system architecture, and AI opportunities are mapped to ensure scalability, performance, and long-term value.",
    },
    {
      title: "Design / Development",
      image: "images/howWeWork/howWeWork1.png",
      description:
        "Our teams design intuitive interfaces and build robust systems in parallel. Prototypes are tested, refined, and engineered using technologies chosen specifically for your solution.",
    },
    {
      title: "Launch / Optimization",
      image: "images/howWeWork/howWeWork4.png",
      description:
        "We deploy with confidence and monitor performance closely. Continuous optimization, iteration, and support ensure your solution evolves with your users and business goals.",
    },
  ];

  const checkMobile = () => {
    setIsMobile(window.innerWidth <= 1000);
  };

  useEffect(() => {
    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  useGSAP(
    () => {
      if (!stepsRef.current) return;

      const steps = stepsRef.current.querySelectorAll(".how-we-work-step");
      gsap.set(steps, { opacity: 0, x: -40 });

      ScrollTrigger.create({
        trigger: stepsRef.current,
        start: "top 75%",
        once: true,
        animation: gsap.to(steps, {
          opacity: 1,
          x: 0,
          duration: 0.3,
          stagger: -0.1,
          ease: "none",
        }),
      });
    },
    { scope: stepsRef }
  );

  useEffect(() => {
    const container = containerRef.current;
    const header = headerRef.current;
    const cards = cardsRef.current;

    if (!container || !header || !cards) return;

    if (!isMobile) {
      const mainTrigger = ScrollTrigger.create({
        trigger: container,
        start: "top top",
        endTrigger: cards,
        end: "bottom bottom",
        pin: header,
        pinSpacing: false,
      });
      scrollTriggersRef.current.push(mainTrigger);

      const cardElements = cards.querySelectorAll(".how-we-work-card");

      cardElements.forEach((card, index) => {
        const cardTrigger = ScrollTrigger.create({
          trigger: card,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveStep(index),
          onEnterBack: () => setActiveStep(index),
          onLeave: () => {
            if (index < cardElements.length - 1) {
              setActiveStep(index + 1);
            }
          },
          onLeaveBack: () => {
            if (index > 0) {
              setActiveStep(index - 1);
            }
          },
        });
        scrollTriggersRef.current.push(cardTrigger);
      });
    }

    return () => {
      scrollTriggersRef.current.forEach((trigger) => trigger.kill());
      scrollTriggersRef.current = [];
    };
  }, [isMobile]);

  return (
    <div className="how-we-work" ref={containerRef}>
      <div className="how-we-work-col how-we-work-header" ref={headerRef}>
        <div className="container">
          <div className="how-we-work-header-content">
            <div className="how-we-work-header-callout">
              <Copy delay={0.1}>
                <p>Our tailored solutions</p>
              </Copy>
            </div>
            <Copy delay={0.15}>
              <h3>
                We create custom AI solutions designed to engage audiences,
                elevate events, and fit seamlessly into your vision from concept
                to live activation.
              </h3>
            </Copy>
            <div className="how-we-work-steps" ref={stepsRef}>
              <div
                className={`how-we-work-step ${
                  activeStep === 0 ? "active" : ""
                }`}
              >
                <p className="how-we-work-step-label">Step</p>
                <p className="how-we-work-step-index">1</p>
              </div>
              <div
                className={`how-we-work-step ${
                  activeStep === 1 ? "active" : ""
                }`}
              >
                <p className="how-we-work-step-label">Step</p>
                <p className="how-we-work-step-index">2</p>
              </div>
              <div
                className={`how-we-work-step ${
                  activeStep === 2 ? "active" : ""
                }`}
              >
                <p className="how-we-work-step-label">Step</p>
                <p className="how-we-work-step-index">3</p>
              </div>
              <div
                className={`how-we-work-step ${
                  activeStep === 3 ? "active" : ""
                }`}
              >
                <p className="how-we-work-step-label">Step</p>
                <p className="how-we-work-step-index">4</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="how-we-work-col how-we-work-cards" ref={cardsRef}>
        {steps.map((step, index) => (
          <div className="how-we-work-card" key={index}>
            <div className="how-we-work-card-img">
              <img src={step.image} alt="" />
            </div>
            <div className="how-we-work-card-copy">
              <div className="how-we-work-card-index-label">
                <h3>{step.title}</h3>
              </div>
              <p className="md">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowWeWork;
