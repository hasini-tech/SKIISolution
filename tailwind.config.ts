import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#0B1F3A",
        "navy-light": "#14304F",
        "navy-line": "#2A4566",
        paper: "#F5F7FA",
        ink: "#0E1B30",
        slate: "#5C6B80",
        line: "#E1E6ED",
        accent: "#2e6be6",
        "accent-deep": "#2e6be6",
        status: "#22C55E",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        sans: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      maxWidth: {
        content: "1240px",
      },
    },
  },
  plugins: [],
};

export default config;
