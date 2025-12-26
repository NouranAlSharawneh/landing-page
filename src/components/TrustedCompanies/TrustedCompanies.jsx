"use client";
import "./TrustedCompanies.css";
import Image from "next/image";
import Copy from "@/components/Copy/Copy";
import { useState } from "react";

const TrustedCompanies = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const companies = [
    {
      name: "Center of Digital Entrepreneurship",
      whiteLogo:
        "/images/companyiesLogos/Center_of_Digital_Entrepreneurship_Logo White.svg",
      coloredLogo:
        "/images/companyiesLogos/Center_of_Digital_Entrepreneurship_Logo Colored.svg",
    },
    {
      name: "Ministry of Communications and Information Technology",
      whiteLogo:
        "/images/companyiesLogos/Ministry_of_Communications_and_Information_Technology_Logo White.svg",
      coloredLogo:
        "/images/companyiesLogos/Ministry_of_Communications_and_Information_Technology_Logo Colored.svg",
    },
    {
      name: "Riyhad Bank",
      whiteLogo: "/images/companyiesLogos/Riyhad_Bank_Logo White.svg",
      coloredLogo: "/images/companyiesLogos/Riyhad_Bank_Logo Colored.svg",
    },
    {
      name: "Saudi Electronic Sports",
      whiteLogo:
        "/images/companyiesLogos/Saudi_Electonic_Sports_Logo White.svg",
      coloredLogo:
        "/images/companyiesLogos/Saudi_Electonic_Sports_Logo Colored.svg",
    },
    {
      name: "Saudi Ministry of Defense",
      whiteLogo:
        "/images/companyiesLogos/Saudi_Ministry_of_Defense_Logo White.svg",
      coloredLogo:
        "/images/companyiesLogos/Saudi_Ministry_of_Defense_Logo Colored.svg",
    },
  ];

  // Duplicate companies for seamless infinite loop
  const duplicatedCompanies = [...companies, ...companies];

  return (
    <section className="trusted-wrap">
      <header className="trusted-header">
        <div className="trusted-eyebrow-wrap">
          <Copy delay={0.1}>
            <p>Trusted by</p>
          </Copy>
        </div>
      </header>

      <div className="marquee-container">
        <div className="marquee-track">
          {duplicatedCompanies.map((company, index) => (
            <div
              key={index}
              className="marquee-item"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Image
                src={
                  hoveredIndex === index
                    ? company.coloredLogo
                    : company.whiteLogo
                }
                alt={company.name}
                width={200}
                height={100}
                loading="lazy"
                className="marquee-logo"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedCompanies;
