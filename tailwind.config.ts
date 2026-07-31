import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#060D16",
        surface: "#0A1628",
        card: "#0E1E36",
        card2: "#091524",
        border: "rgba(198,167,78,0.14)",
        border2: "rgba(255,255,255,0.06)",
        gold: "#C6A74E",
        goldL: "#E0C97A",
        goldD: "#B9932F",
        ivory: "#F2E6C9",
        ivoryS: "#F7F1E3",
        muted: "#8A7F6E",
        muted2: "#C8BFA8",
        ndc: "#1B6B1B",
        npp: "#163488",
        swing: "#C45E08",
        ndcBg: "rgba(27,107,27,0.14)",
        nppBg: "rgba(22,52,136,0.14)",
        swingBg: "rgba(196,94,8,0.14)",
        green: "#2ECC71",
        red: "#E74C3C",
        blue: "#3498DB",
        teal: "#1ABC9C",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "serif"],
        body: ["var(--font-outfit)", "sans-serif"],
        serif2: ["var(--font-cormorant)", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
