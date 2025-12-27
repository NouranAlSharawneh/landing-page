"use client";

import { useEffect } from "react";

export default function ConsoleEasterEgg() {
  useEffect(() => {
    const asciiArt = `
   ███████╗███╗   ██╗██╗ ██████╗ ███╗   ███╗ █████╗ 
   ██╔════╝████╗  ██║██║██╔════╝ ████╗ ████║██╔══██╗
   █████╗  ██╔██╗ ██║██║██║  ███╗██╔████╔██║███████║
   ██╔══╝  ██║╚██╗██║██║██║   ██║██║╚██╔╝██║██╔══██║
   ███████╗██║ ╚████║██║╚██████╔╝██║ ╚═╝ ██║██║  ██║
   ╚══════╝╚═╝  ╚═══╝╚═╝ ╚═════╝ ╚═╝     ╚═╝╚═╝  ╚═╝
    `;

    console.log(
      "%cPowered by:" + "\n" + asciiArt,
      "color: #8B5CF6; font-family: monospace; font-weight: bold;"
    );
  }, []);

  return null;
}
