/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#10151B",
        slide: "#EFF2EE",
        "slide-dim": "#E3E7E1",
        violet: {
          DEFAULT: "#5B4B8A",
          light: "#8073AD",
          dark: "#413266",
        },
        rose: {
          DEFAULT: "#C65B7C",
          light: "#DA8CA4",
        },
        teal: {
          DEFAULT: "#1F8A82",
          light: "#4FAFA6",
        },
        amber: {
          DEFAULT: "#E08E2A",
        },
      },
      fontFamily: {
        display: ["'Fraunces'", "serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
      },
      boxShadow: {
        panel: "0 1px 2px rgba(16,21,27,0.06), 0 8px 24px rgba(16,21,27,0.06)",
      },
      keyframes: {
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(12px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        pulseRing: {
          "0%": { transform: "scale(0.95)", opacity: 0.7 },
          "70%": { transform: "scale(1.15)", opacity: 0 },
          "100%": { transform: "scale(1.15)", opacity: 0 },
        },
      },
      animation: {
        scan: "scan 2.8s ease-in-out infinite",
        fadeUp: "fadeUp 0.6s ease-out both",
        pulseRing: "pulseRing 2.4s cubic-bezier(0.4,0,0.6,1) infinite",
      },
    },
  },
  plugins: [],
};
