/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Rajdhani'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      colors: {
        void: {
          950: "#080b0f",
          900: "#0d1117",
          800: "#131a24",
          700: "#1b2534",
          600: "#243046",
        },
        lotus: {
          DEFAULT: "#00d4c8",
          dim: "#00a89e",
          dark: "#007a72",
          glow: "rgba(0,212,200,0.15)",
        },
        prime: {
          DEFAULT: "#c8a84b",
          dim: "#a08535",
          glow: "rgba(200,168,75,0.15)",
        },
      },
      boxShadow: {
        lotus: "0 0 20px rgba(0,212,200,0.2), 0 0 40px rgba(0,212,200,0.05)",
        prime: "0 0 20px rgba(200,168,75,0.2), 0 0 40px rgba(200,168,75,0.05)",
      },
      animation: {
        "fade-in": "fadeIn 0.15s ease-out",
        "slide-down": "slideDown 0.2s ease-out",
        spin: "spin 0.7s linear infinite",
      },
      keyframes: {
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        slideDown: { from: { opacity: 0, transform: "translateY(-6px)" }, to: { opacity: 1, transform: "translateY(0)" } },
      },
    },
  },
  plugins: [],
};
