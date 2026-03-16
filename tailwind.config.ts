import type { Config } from "tailwindcss";

/**
 * Portfolio Tailwind config — aligned with docs/DESIGN_DOCUMENT.md
 * Spacing scale: 4/8/16/24/32/48. Min touch target 44px. Semantic colors.
 */
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          primary: "var(--color-bg-primary)",
          secondary: "var(--color-bg-secondary)",
        },
        foreground: {
          primary: "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)",
        },
        accent: "var(--color-accent)",
        border: "var(--color-border)",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
      },
      fontSize: {
        "body": ["1rem", { lineHeight: "1.5" }],
        "caption": ["0.875rem", { lineHeight: "1.4" }],
        "h3": ["1.25rem", { lineHeight: "1.3" }],
        "h2": ["1.5rem", { lineHeight: "1.25" }],
        "h1": ["2rem", { lineHeight: "1.2" }],
        "hero": ["clamp(2rem,5vw,3.5rem)", { lineHeight: "1.15" }],
      },
      spacing: {
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "32px",
        "2xl": "48px",
        "3xl": "64px",
        "touch": "44px",
      },
      minHeight: {
        touch: "44px",
      },
      minWidth: {
        touch: "44px",
      },
      maxWidth: {
        content: "720px",
        "content-wide": "960px",
      },
      transitionDuration: {
        DEFAULT: "200ms",
        fast: "150ms",
        slow: "400ms",
      },
    },
  },
  plugins: [],
};

export default config;
