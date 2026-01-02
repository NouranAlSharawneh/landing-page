"use client";
import "./Footer.css";

import { useRef } from "react";
import Image from "next/image";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useViewTransition } from "@/hooks/useViewTransition";
import Copy from "../Copy/Copy";

import { IoIosMail, IoLogoLinkedin, IoLogoWhatsapp } from "react-icons/io";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const { navigateWithTransition } = useViewTransition();
  const socialIconsRef = useRef(null);
  const contactIconsRef = useRef(null);
  const textLogoRef = useRef(null);

  useGSAP(
    () => {
      if (!socialIconsRef.current) return;

      const icons = socialIconsRef.current.querySelectorAll(".icon");
      gsap.set(icons, { opacity: 0, x: -40 });

      ScrollTrigger.create({
        trigger: socialIconsRef.current,
        start: "top 90%",
        once: true,
        animation: gsap.to(icons, {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: -0.1,
          ease: "power3.out",
        }),
      });
    },
    { scope: socialIconsRef }
  );

  useGSAP(
    () => {
      if (!contactIconsRef.current) return;

      const icons = contactIconsRef.current.querySelectorAll(".icon");
      gsap.set(icons, { opacity: 0, x: -40 });

      ScrollTrigger.create({
        trigger: contactIconsRef.current,
        start: "top 80%",
        once: true,
        animation: gsap.to(icons, {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
        }),
      });
    },
    { scope: contactIconsRef }
  );

  useGSAP(
    () => {
      if (!textLogoRef.current) return;

      gsap.set(textLogoRef.current, { opacity: 0, y: 80 });

      ScrollTrigger.create({
        trigger: textLogoRef.current,
        start: "top 90%",
        once: true,
        animation: gsap.to(textLogoRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        }),
      });
    },
    { scope: textLogoRef }
  );

  return (
    <div id="contact" className="footer">
      <div className="footer-meta">
        <div className="container footer-meta-header">
          <div className="footer-meta-col">
            <div className="footer-meta-block">
              <div className="footer-meta-logo">
                <Copy delay={0.1}>
                  <h3 className="lg">Let's Connect</h3>
                </Copy>
              </div>
              <Copy delay={0.2}>
                <h2>Ready to Bring Your Vision to Life?</h2>
              </Copy>
              <div className="footer-contact" ref={contactIconsRef}>
                <div className="footer-socials-wrapper">
                  <a
                    href="https://www.linkedin.com/company/enigma-ai-company/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="icon"
                  >
                    <IoLogoLinkedin />
                  </a>
                  <a
                    href="https://wa.me/+966543799104"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="icon"
                  >
                    <IoLogoWhatsapp />
                  </a>
                  <a href="mailto:contact@enigma-ai.co" className="icon">
                    <IoIosMail />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-outro">
          <div className="footer-contact-info">
            <a href="tel:+966543799104" className="contact-item">
              +966 54 379 9104
            </a>
            <a href="mailto:contact@enigma-ai.co" className="contact-item">
              contact@enigma-ai.co
            </a>
          </div>
        </div>
        <div className="container">
          <div className="footer-header" ref={textLogoRef}>
            <Image
              src="/images/logos/textLogo.svg"
              alt="Enigma Logo"
              width={200}
              height={50}
            />
          </div>
          <div className="footer-copyright">
            <p>
              Developed by — <span>enigma</span>
            </p>
            <p>All rights reserverd &copy; 2025</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
