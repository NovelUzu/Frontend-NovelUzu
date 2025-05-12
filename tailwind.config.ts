import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
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
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Colores personalizados para géneros
        fantasy: {
          DEFAULT: "#8b5cf6", // Púrpura
          light: "#c4b5fd",
          dark: "#6d28d9",
        },
        action: {
          DEFAULT: "#ef4444", // Rojo
          light: "#fca5a5",
          dark: "#b91c1c",
        },
        romance: {
          DEFAULT: "#ec4899", // Rosa
          light: "#f9a8d4",
          dark: "#be185d",
        },
        scifi: {
          DEFAULT: "#06b6d4", // Cian
          light: "#67e8f9",
          dark: "#0e7490",
        },
        adventure: {
          DEFAULT: "#10b981", // Esmeralda
          light: "#6ee7b7",
          dark: "#047857",
        },
        mystery: {
          DEFAULT: "#7c3aed", // Violeta
          light: "#c4b5fd",
          dark: "#5b21b6",
        },
        drama: {
          DEFAULT: "#f59e0b", // Ámbar
          light: "#fcd34d",
          dark: "#b45309",
        },
        horror: {
          DEFAULT: "#1e293b", // Slate oscuro
          light: "#64748b",
          dark: "#0f172a",
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
