"use client";
import "./Copy.css";
import React, { useRef, useState, useEffect } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

// Manual line splitting function (replaces GSAP SplitText)
const splitIntoLines = (element) => {
  const originalText = element.textContent;
  const originalHTML = element.innerHTML;

  // Temporarily set to get measurements
  element.style.visibility = 'hidden';
  element.style.display = 'block';

  const words = originalText.split(/\s+/);
  const lines = [];
  let currentLine = '';

  // Create a temporary span to measure word widths
  const tempSpan = document.createElement('span');
  tempSpan.style.visibility = 'hidden';
  tempSpan.style.position = 'absolute';
  tempSpan.style.whiteSpace = 'nowrap';

  // Copy computed styles
  const computedStyle = window.getComputedStyle(element);
  tempSpan.style.font = computedStyle.font;
  tempSpan.style.fontSize = computedStyle.fontSize;
  tempSpan.style.fontFamily = computedStyle.fontFamily;
  tempSpan.style.fontWeight = computedStyle.fontWeight;
  tempSpan.style.letterSpacing = computedStyle.letterSpacing;

  document.body.appendChild(tempSpan);

  const maxWidth = element.offsetWidth;

  words.forEach((word, index) => {
    const testLine = currentLine + (currentLine ? ' ' : '') + word;
    tempSpan.textContent = testLine;

    if (tempSpan.offsetWidth > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }

    if (index === words.length - 1 && currentLine) {
      lines.push(currentLine);
    }
  });

  document.body.removeChild(tempSpan);
  element.style.visibility = '';
  element.style.display = '';

  return lines.length > 0 ? lines : [originalText];
};

function Copy({ children, animateOnScroll = true, delay = 0 }) {
  const containerRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const linesRef = useRef([]);

  const waitForFonts = async () => {
    try {
      await document.fonts.ready;

      const customFonts = ["nm", "DM Mono"];
      const fontCheckPromises = customFonts.map((fontFamily) => {
        return document.fonts.check(`16px ${fontFamily}`);
      });

      await Promise.all(fontCheckPromises);
      await new Promise((resolve) => setTimeout(resolve, 100));

      return true;
    } catch (error) {
      console.warn("Font loading check failed, proceeding anyway:", error);
      await new Promise((resolve) => setTimeout(resolve, 200));
      return true;
    }
  };

  useEffect(() => {
    const initializeSplit = async () => {
      if (!containerRef.current) return;

      await waitForFonts();

      let elements = [];
      if (containerRef.current.hasAttribute("data-copy-wrapper")) {
        elements = Array.from(containerRef.current.children).filter(
          el => !el.hasAttribute('data-line-wrapper')
        );
      } else {
        elements = [containerRef.current];
      }

      elements.forEach((element) => {
        const lines = splitIntoLines(element);
        const computedStyle = window.getComputedStyle(element);
        const textIndent = computedStyle.textIndent;

        // Create line structure
        const linesHTML = lines.map((lineText, index) => {
          const paddingStyle = (index === 0 && textIndent && textIndent !== '0px')
            ? ` style="padding-left: ${textIndent}"`
            : '';
          return `<div class="line-wrapper" style="overflow: hidden;"><div class="line"${paddingStyle}>${lineText}</div></div>`;
        }).join('');

        element.innerHTML = linesHTML;
        element.setAttribute('data-line-wrapper', 'true');

        if (textIndent && textIndent !== '0px') {
          element.style.textIndent = '0';
        }
      });

      setIsReady(true);
    };

    initializeSplit();
  }, []);

  useGSAP(
    () => {
      if (!containerRef.current || !isReady) return;

      const lineElements = containerRef.current.querySelectorAll('.line');
      linesRef.current = Array.from(lineElements);

      gsap.set(linesRef.current, { y: "100%" });

      const animationProps = {
        y: "0%",
        duration: 1,
        stagger: 0.1,
        ease: "power4.out",
        delay: delay,
      };

      if (animateOnScroll) {
        gsap.to(linesRef.current, {
          ...animationProps,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            once: true,
          },
        });
      } else {
        gsap.to(linesRef.current, animationProps);
      }
    },
    { scope: containerRef, dependencies: [animateOnScroll, delay, isReady] }
  );

  if (React.Children.count(children) === 1) {
    return React.cloneElement(children, { ref: containerRef });
  }

  return (
    <div ref={containerRef} data-copy-wrapper="true">
      {children}
    </div>
  );
}

export default React.memo(Copy);
