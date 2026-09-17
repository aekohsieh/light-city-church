import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: "#FAF6EE",
          deep: "#F2EADA"
        },
        ink: {
          DEFAULT: "#17223B",
          soft: "#3C4A66"
        },
        navy: {
          DEFAULT: "#101A30",
          deep: "#0B1322"
        },
        sky: {
          50: "#EEF6FB",
          100: "#D7EAF5",
          300: "#9AC7DF",
          500: "#4C86AE",
          600: "#3B6D91"
        },
        gold: {
          100: "#F8E6C0",
          300: "#F0CD87",
          DEFAULT: "#E4A94A",
          600: "#C98A2C"
        }
      },
      fontFamily: {
        display: ["var(--font-manrope)", "var(--font-noto)", "sans-serif"],
        sans: ["var(--font-noto)", "var(--font-inter)", "sans-serif"],
        body: ["var(--font-inter)", "var(--font-noto)", "sans-serif"]
      },
      letterSpacing: {
        tightest: "-0.04em"
      },
      maxWidth: {
        "8xl": "90rem"
      },
      boxShadow: {
        soft: "0 20px 60px -25px rgba(16, 26, 48, 0.25)",
        card: "0 10px 30px -12px rgba(16, 26, 48, 0.18)"
      },
      backgroundImage: {
        "light-beam":
          "radial-gradient(120% 120% at 50% 0%, rgba(228,169,74,0.35) 0%, rgba(228,169,74,0) 60%)",
        "navy-fade":
          "linear-gradient(180deg, rgba(16,26,48,0) 0%, rgba(16,26,48,0.85) 100%)"
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        }
      },
      animation: {
        "fade-up": "fade-up 0.7s ease-out forwards",
        "fade-in": "fade-in 0.9s ease-out forwards"
      }
    }
  },
  plugins: []
};

export default config;
