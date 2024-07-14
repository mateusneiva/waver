import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "../../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: "var(--font-inter)",
        mulish: "var(--font-mulish)",
        lexendDeca: "var(--font-lexend_deca)",
      },
      backgroundImage: {
        wavePattern: "url('/images/patterns/WavePattern.svg')",
        memphisPattern: "url('/images/patterns/MemphisPattern.svg')",
        visiwigDots: "url('/images/patterns/VisiwigDots.svg')",
        herringbonePattern: "url('/images/patterns/HerringbonePattern.svg')",
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        dark: {
          colors: {
            primary: "#a3e635",
          },
        },
      },
    }),
  ],
};

export default config;
