import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#8B1538",
          50: "#fef2f4",
          100: "#fde5e8",
          200: "#fbd1d7",
          300: "#f8aab5",
          400: "#f07a8c",
          500: "#e74d6b",
          600: "#8B1538",
          700: "#6b102a",
          800: "#4f0a1d",
          900: "#360613",
          950: "#1a0306",
        },
        accent: {
          DEFAULT: "#D4AF37",
          50: "#fdfbf3",
          100: "#fbf6e6",
          200: "#f7ecd0",
          300: "#f1dba6",
          400: "#e9c26e",
          500: "#D4AF37",
          600: "#b38d2b",
          700: "#8f6f24",
          800: "#72581f",
          900: "#5c4819",
          950: "#30250c",
        },
        neutral: {
          50: "#F5F2E8",
          100: "#ede7d9",
          200: "#d9cdb3",
          300: "#c0ad8c",
          400: "#a38d60",
          500: "#897349",
          600: "#6b5a3a",
          700: "#554730",
          800: "#453a27",
          900: "#3c3222",
          950: "#0A0606",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config