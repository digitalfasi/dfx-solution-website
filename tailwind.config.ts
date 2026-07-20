import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#FFFFFF",
        bg2: "#F3F7FF",
        surface: "#FAF7F7",
        card: "#FFFFFF",
        cardHover: "#F2F3F4",
        primary: "#8777E0",
        secondary: "#60A3E6",
        highlight: "#895ED0",
        glow: "#E8E4FB",
        tx: "#181B31",
        tx2: "#454545",
        muted: "#6E7F99",
        border: "rgba(24,27,49,0.10)",
        green: "#0AC994",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },
      maxWidth: { container: "1440px" },
      spacing: {
        section: "160px",
        "section-tablet": "120px",
        "section-mobile": "80px",
      },
      keyframes: {
        marquee: { to: { transform: "translateX(-50%)" } },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
