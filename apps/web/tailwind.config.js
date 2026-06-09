/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
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
};

module.exports = config;
