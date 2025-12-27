import "./globals.css";

import ClientLayout from "@/client-layout";
import ConsoleEasterEgg from "@/components/ConsoleEasterEgg";

import { ViewTransitions } from "next-view-transitions";
import { DM_Mono } from "next/font/google";
import localFont from "next/font/local";

const dmMono = DM_Mono({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-mono",
});

const nm = localFont({
  src: "../../public/fonts/nm/nm-medium.otf",
  weight: "500",
  display: "swap",
  variable: "--font-nm",
});

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "https://enigma-ai.co"
  ),
  title:
    "Enigma | AI-Powered Interactive Solutions & Custom Development in Riyadh",
  description:
    "Enigma creates custom AI-powered interactive experiences and smart products in Riyadh, Saudi Arabia. From AI photobooths to sketch-to-art installations, we deliver intelligent solutions for events and businesses.",
  keywords: [
    // English Keywords
    "AI solutions Saudi Arabia",
    "interactive experiences Riyadh",
    "AI photobooth",
    "custom AI development",
    "event technology",
    "AI installations",
    "sketch to art AI",
    "digital mosaic",
    "smart product development",
    "AI company Riyadh",
    "interactive technology",
    "event activations",
    "Riyadh AI company",
    "Saudi Arabia interactive technology",
    "Riyadh event technology",
    "technology solutions Riyadh",
    "innovation Riyadh",
    "AI events Saudi Arabia",
    "interactive installations Riyadh",
    "digital experiences Riyadh",
    "event tech Riyadh",
    "creative technology Saudi Arabia",
    "experiential technology Riyadh",
    "AI-powered events",
    "digital innovation Riyadh",
    "tech studio Riyadh",
    "smart installations",
    "AI art installations",
    "interactive event solutions",

    // Arabic Keywords
    "حلول الذكاء الاصطناعي",
    "تجارب تفاعلية",
    "الرياض",
    "السعودية",
    "تقنية الذكاء الاصطناعي",
    "تطوير تطبيقات ذكية",
    "فعاليات تفاعلية",
    "تكنولوجيا الفعاليات",
    "استوديو رقمي",
    "ابتكار رقمي",
    "تحويل الرسم إلى فن",
    "فوتوبوث ذكي",
    "موزاييك رقمي",
    "منتجات ذكية",
    "شركة ذكاء اصطناعي الرياض",
    "حلول تفاعلية الرياض",
    "تقنية الفعاليات الرياض",
    "ذكاء اصطناعي السعودية",
    "تجارب رقمية",
    "تطوير منتجات ذكية",
    "تركيبات تفاعلية",
    "فن رقمي",
    "تكنولوجيا إبداعية",
    "أنظمة تفاعلية مخصصة",
  ],
  authors: [{ name: "Enigma" }],
  creator: "Enigma",
  publisher: "Enigma",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://enigma-ai.co",
    siteName: "Enigma",
    title:
      "Enigma | AI-Powered Interactive Solutions & Custom Development in Riyadh",
    description:
      "Enigma creates custom AI-powered interactive experiences and smart products in Riyadh, Saudi Arabia. From AI photobooths to sketch-to-art installations, we deliver intelligent solutions for events and businesses.",
    images: [
      {
        url: "/images/seo.jpg",
        width: 824,
        height: 489,
        alt: "Enigma - AI-Powered Interactive Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Enigma | AI-Powered Interactive Solutions & Custom Development in Riyadh",
    description:
      "Enigma creates custom AI-powered interactive experiences and smart products in Riyadh, Saudi Arabia. From AI photobooths to sketch-to-art installations, we deliver intelligent solutions for events and businesses.",
    images: ["/images/seo.jpg"],
  },
  manifest: "/manifest.json",
  themeColor: "#000000",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
};

export default function RootLayout({ children }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://enigma-ai.co/#organization",
        name: "Enigma",
        url: "https://enigma-ai.co",
        logo: {
          "@type": "ImageObject",
          url: "https://enigma-ai.co/images/logos/whiteFavicon.png",
        },
        contactPoint: {
          "@type": "ContactPoint",
          email: "contact@enigma-ai.co",
          contactType: "customer service",
          availableLanguage: ["en", "ar"],
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Riyadh",
          addressCountry: "SA",
        },
        sameAs: ["https://www.linkedin.com/company/enigma-ai-company/"],
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://enigma-ai.co/#localbusiness",
        name: "Enigma",
        description:
          "Enigma creates custom AI-powered interactive experiences and smart products in Riyadh, Saudi Arabia. From AI photobooths to sketch-to-art installations, we deliver intelligent solutions for events and businesses.",
        url: "https://enigma-ai.co",
        telephone: "+966543799104",
        email: "contact@enigma-ai.co",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Riyadh",
          addressCountry: "SA",
        },
        geo: {
          "@type": "GeoCoordinates",
          addressCountry: "SA",
        },
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          opens: "09:00",
          closes: "18:00",
        },
        priceRange: "$",
      },
      {
        "@type": "Service",
        "@id": "https://enigma-ai.co/#services",
        serviceType: "AI-Powered Interactive Solutions",
        provider: {
          "@id": "https://enigma-ai.co/#organization",
        },
        areaServed: {
          "@type": "Country",
          name: "Saudi Arabia",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "AI Interactive Solutions",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "AI Photobooth",
                description:
                  "AI-enhanced photography with instant delivery for events",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Sketch to Art",
                description:
                  "Interactive system transforming sketches into AI-generated art",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Mosaic Grid",
                description: "Event engagement system creating digital mosaics",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Custom AI Development",
                description:
                  "Custom interactive systems and smart product development",
              },
            },
          ],
        },
      },
    ],
  };

  return (
    <html lang="en" className={`${dmMono.variable} ${nm.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>
        <ConsoleEasterEgg />
        <ViewTransitions>
          <ClientLayout>{children}</ClientLayout>
        </ViewTransitions>
      </body>
    </html>
  );
}
