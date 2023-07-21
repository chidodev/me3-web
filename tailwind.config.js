/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xm: "480px",
      },
      colors: {
        "main-background": "rgb(var(--main-background) / <alpha-value>)",
        "main-border": "rgb(var(--main-border) / <alpha-value>)",
        "main-text": "rgb(var(--main-text) / <alpha-value>)",
        "main-search-background": "rgb(var(--main-search-background) / <alpha-value>)",
        "main-sidebar-background": "rgb(var(--main-sidebar-background) / <alpha-value>)",
        "main-accent": "rgb(var(--main-accent) / <alpha-value>)",
        "accent-yellow": "rgb(var(--accent-yellow) / <alpha-value>)",
        "accent-blue": "rgb(var(--accent-blue) / <alpha-value>)",
        "accent-pink": "rgb(var(--accent-pink) / <alpha-value>)",
        "accent-purple": "rgb(var(--accent-purple) / <alpha-value>)",
        "accent-orange": "rgb(var(--accent-orange) / <alpha-value>)",
        "accent-green": "rgb(var(--accent-green) / <alpha-value>)",
        "accent-red": "#F4212E",
        "dark-primary": "#E7E9EA",
        "dark-secondary": "#71767B",
        "light-primary": "#0F1419",
        "light-secondary": "#536471",
        "dark-border": "#2F3336",
        "light-border": "#EFF3F4",
        "dark-line-reply": "#333639",
        "light-line-reply": "#CFD9DE",

        "neutral-black": "rgb(var(--neutral-black) / <alpha-value>)",
        "neutral-80": "rgb(var(--neutral-80) / <alpha-value>)",
        "neutral-70": "rgb(var(--neutral-70) / <alpha-value>)",
        "neutral-60": "rgb(var(--neutral-60) / <alpha-value>)",
        "neutral-50": "rgb(var(--neutral-50) / <alpha-value>)",
        "neutral-30": "rgb(var(--neutral-30) / <alpha-value>)",
        "neutral-40": "rgb(var(--neutral-40) / <alpha-value>)",
        "neutral-20": "rgb(var(--neutral-20) / <alpha-value>)",
        "neutral-10": "rgb(var(--neutral-10) / <alpha-value>)",
        "neutral-white": "rgb(var(--neutral-white) / <alpha-value>)",

        "primary-80": "rgb(var(--primary-80) / <alpha-value>)",
        "primary-60": "rgb(var(--primary-60) / <alpha-value>)",
        "primary-40": "rgb(var(--primary-40) / <alpha-value>)",
        "primary-20": "rgb(var(--primary-20) / <alpha-value>)",
        "primary-10": "rgb(var(--primary-10) / <alpha-value>)",

        "secondary-80": "rgb(var(--secondary-80) / <alpha-value>)",
        "secondary-60": "rgb(var(--secondary-60) / <alpha-value>)",
        "secondary-40": "rgb(var(--secondary-40) / <alpha-value>)",
        "secondary-20": "rgb(var(--secondary-20) / <alpha-value>)",

        "success-100": "rgb(var(--success-100) / <alpha-value>)",
        "success-50": "rgb(var(--success-50) / <alpha-value>)",
        "success-40": "rgb(var(--success-40) / <alpha-value>)",
        "success-20": "rgb(var(--success-20) / <alpha-value>)",

        "danger-100": "rgb(var(--danger-100) / <alpha-value>)",
        "danger-50": "rgb(var(--danger-50) / <alpha-value>)",
        "danger-40": "rgb(var(--danger-40) / <alpha-value>)",
      },
      backgroundImage: {
        "light-gradient": "linear-gradient(152deg, hsl(231, 35%, 83%) 0%, hsl(200, 95%, 71%) 100%)",
        "dark-gradient": "linear-gradient(152deg, hsl(235, 54%, 49%) 0%, hsl(194, 15%, 28%) 100%)",
        "main-gradient-background":
          "linear-gradient(180deg, rgb(var(--main-background-start-rgb)) 0%, rgb(var(--main-background-end-rgb)) 50%)",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-in": "fadeIn 1s",
        "pulse-fast": "pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
    fontFamily: {
      default: ["Titillium Web", "sans-serif"],
    },
    fontSize: {
      "display-large": ["var(--font-size-display-large)", "var(--line-height-display-large)"],
      "display-medium": ["var(--font-size-display-medium)", "var(--line-height-display-medium)"],
      "display-small": ["var(--font-size-display-small)", "var(--line-height-display-small)"],
      "heading-large": ["var(--font-size-heading-large)", "var(--line-height-heading-large)"],
      "heading-medium": ["var(--font-size-heading-medium)", "var(--line-height-heading-medium)"],
      "heading-small": ["var(--font-size-heading-small)", "var(--line-height-heading-small)"],
      "base-large": ["var(--font-size-base-large)", "var(--line-height-base-large)"],
      "base-medium": ["var(--font-size-base-medium)", "var(--line-height-base-medium)"],
      "base-small": ["var(--font-size-base-small)", "var(--line-height-base-small)"],
      "caption-big": ["var(--font-size-caption-big)", "var(--line-height-caption-big)"],
      "caption-small": ["var(--font-size-caption-small)", "var(--line-height-caption-small)"],
    },
    boxShadow: {
      /* offset-x | offset-y | blur-radius | spread-radius | color */
      standard: "0 0 9px 3px rgb(var(--main-text)/0.05)",
      "standard-offset-top-right": "2px -4px 9px rgb(var(--main-text)/0.05)",
      "standard-offset-top-left": "-2px -4px 9px rgb(var(--main-text)/0.05)",
      "standard-offset-btm-left": "-2px 4px 9px rgb(var(--main-text)/0.05)",
      "standard-offset-btm-right": "2px 4px 9px rgb(var(--main-text)/0.05)",
      solid: "0 0 1.5px 2px rgb(var(--main-text)/1)",
    },
  },
};
