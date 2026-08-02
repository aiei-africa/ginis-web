import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0E1420",
        surface: "#141B2E",
        card: "#1A2338",
        card2: "#111826",
        border: "rgba(240,165,0,0.14)",
        border2: "rgba(255,255,255,0.06)",
        gold: "#F0A500",
        goldL: "#F5BC3D",
        goldD: "#C98600",
        ivory: "#F2E6C9",
        ivoryS: "#F7F1E3",
        muted: "#8A93A6",
        muted2: "#C3CAD8",
        ndc: "#1B6B3A",
        npp: "#003082",
        swing: "#C45E08",
        green: "#2ECC71",
        red: "#E74C3C",
        blue: "#3498DB",
        teal: "#1ABC9C",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      fontSize: {
        "fluid-xs": "clamp(0.7rem, 0.6rem + 0.3vw, 0.8rem)",
        "fluid-sm": "clamp(0.8rem, 0.7rem + 0.35vw, 0.95rem)",
        "fluid-base": "clamp(0.95rem, 0.85rem + 0.4vw, 1.1rem)",
        "fluid-lg": "clamp(1.1rem, 0.95rem + 0.6vw, 1.4rem)",
        "fluid-xl": "clamp(1.4rem, 1.1rem + 1.2vw, 2rem)",
        "fluid-2xl": "clamp(1.8rem, 1.3rem + 2vw, 2.8rem)",
      },
    },
  },
  plugins: [],
};
export default config;
