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
          DEFAULT: "#c084fc", // Lavanda mágica
          light: "#e9d5ff",   // Lila claro
          dark: "#7e22ce",    // Púrpura profundo
        },
        action: {
          DEFAULT: "#fb7185", // Rojo coral activo
          light: "#fecdd3",   // Rosa suave
          dark: "#be123c",    // Rojo carmesí
        },
        romance: {
          DEFAULT: "#f472b6", // Rosa romántico
          light: "#fbcfe8",   // Rosa pastel
          dark: "#9d174d",    // Rosa vino
        },
        scifi: {
          DEFAULT: "#38bdf8", // Azul galáctico
          light: "#bae6fd",   // Celeste neón
          dark: "#0c4a6e",    // Azul espacial
        },
        adventure: {
          DEFAULT: "#34d399", // Verde jungla vibrante
          light: "#a7f3d0",   // Verde selva claro
          dark: "#065f46",    // Verde profundo
        },
        mystery: {
          DEFAULT: "#a78bfa", // Violeta enigmático
          light: "#ddd6fe",   // Lavanda brumosa
          dark: "#4c1d95",    // Índigo oscuro
        },
        drama: {
          DEFAULT: "#fbbf24", // Ámbar expresivo
          light: "#fef08a",   // Amarillo suave
          dark: "#b45309",    // Mostaza intensa
        },
        horror: {
          DEFAULT: "#475569", // Gris neblinoso
          light: "#cbd5e1",   // Humo pálido
          dark: "#1e293b",    // Azul sombra
        },
        historical: {
          DEFAULT: "#f97316", // Naranja cobre
          light: "#fdba74",   // Durazno claro
          dark: "#7c2d12",    // Tierra seca
        },
        comedy: {
          DEFAULT: "#facc15", // Amarillo vivo
          light: "#fde047",   // Amarillo pastel
          dark: "#a16207",    // Mostaza intenso
        },
        supernatural: {
          DEFAULT: "#818cf8", // Azul-violeta etéreo
          light: "#c7d2fe",   // Lavanda luminosa
          dark: "#3730a3",    // Azul místico
        },
        martialarts: {
          DEFAULT: "#fb923c", // Naranja tangerina
          light: "#fed7aa",   // Naranja melocotón
          dark: "#9a3412",    // Terracota marcial
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
