import "./globals.css";

import ClientLayout from "@/client-layout";

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
  title: "Enigma",
  // description: "Creative Studio MWT Website Template — Codegrid",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${dmMono.variable} ${nm.variable}`}>
      <body>
        <ViewTransitions>
          <ClientLayout>{children}</ClientLayout>
        </ViewTransitions>
      </body>
    </html>
  );
}
