import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{html,js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{html,js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{html,js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      aspectRatio: {
        slider: "2.12",
        imgCardProjet: "1.25",
      },
      rotate: { "negative-3": "-3deg" },
      backgroundImage: {
        "linear-custom":
          "linear-gradient(to top, transparent, hsl(var(--section-bg)) 15%, hsl(var(--section-bg)) 70%, transparent)",
        "image-svg": "url('/Hexagon.svg')",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        transition: "hsl(var(--transition-bg))",
        section: "hsl(var(--section-bg))",
        border: "hsl(var(--border))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          popover: "hsl(var(--popover-foreground))",
        },
      },
    },
  },
  plugins: [
    plugin(function ({ addBase, addComponents, addUtilities }) {
      addBase({});
      addComponents({
        ".section": {
          "@apply relative w-full h-full flex py-14 px-6 md:px-20": {},
        },
        ".container": {
          "@apply w-full h-full flex flex-col items-center justify-center max-w-[1440px] w-full h-full md:gap-24 gap-12":
            {},
        },
        ".content": {
          "@apply flex flex-col items-center justify-center md:px-6 md:gap-20 gap-8":
            {},
        },
        ".h1": {
          "@apply w-full gradiant-title text-center size-title lg:text-[5rem]":
            {},
        },
        ".h2": {
          "@apply w-full gradiant-title text-center size-title": {},
        },
        ".h2-legal": {
          "@apply text-xl text-primary font-semibold mb-2": {},
        },
        ".p": {
          "@apply md:px-10 px-0 leading-loose text-center font-medium lg:text-[2rem] md:text-[1.75rem] sm:text-[1.5rem] text-[1.25rem]":
            {},
        },
        input: {
          "@apply w-full h-full p-2 bg-white/80 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 ease-in-out":
            {},
        },
        textarea: {
          "@apply w-full h-full p-2 bg-white/80 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 ease-in-out":
            {},
        },
        ".button": {
          "@apply flex items-center justify-center gap-2 rounded-lg shadow-md transition-all duration-300 ease-in-out":
            {},
        },
        ".badge": {
          "@apply flex items-center justify-center text-[0.75rem] gap-2 px-2 py-1 rounded-md shadow-md transition-all duration-300 ease-in-out":
            {},
        },
        ".card": {
          "@apply w-full flex flex-col items-center justify-center p-6 gap-6 rounded-lg transition-all duration-300 ease-in-out":
            {},
        },
        ".gradiant-title": {
          "@apply bg-gradient-to-l from-primary from-20% to-foreground bg-clip-text text-transparent font-extrabold":
            {},
        },
        ".size-title": {
          "@apply md:text-[4rem] sm:text-[3rem] text-[2.5rem]": {},
        },
        ".banner": {
          "@apply bg-card py-6 w-full shadow-custom overflow-hidden": {},
        },
        ".shadow-custom": {
          "@apply shadow-lg dark:shadow-md dark:shadow-primary/40": {},
        },
      });

      addUtilities({
        ".clip-triangle": {
          clipPath: "polygon(20% 0%, 0% 0%, 0% 50%)",
        },
      });
    }),
  ],
} satisfies Config;
