import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/lib/auth-context"

// Carga la fuente Inter desde Google Fonts, configurada para caracteres latinos
const inter = Inter({ subsets: ["latin"] })

// Metadata: información sobre la página, útil para SEO y accesibilidad
export const metadata: Metadata = {
  title: "NovelUzu - Plataforma de Novelas Web",
  description: "Descubre, lee y escribe novelas web en NovelUzu",
}

// Componente RootLayout: estructura base que envuelve toda la app
// Se renderiza en todas las páginas dentro de `app/`
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode // Los componentes hijos que se renderizarán dentro del layout
}>) {
  return (
    <html lang="es" suppressHydrationWarning> 
      {/* 
        lang="es": indica que el contenido está en español para accesibilidad y SEO
        suppressHydrationWarning: evita warnings en consola durante hidratación React
      */}
      <body className={inter.className}>
        {/* 
          ThemeProvider: proveedor para controlar el tema (claro/oscuro)
          - attribute="class": el tema se aplica cambiando clases CSS
          - defaultTheme="system": usa tema del sistema operativo por defecto
          - enableSystem: activa soporte para detectar tema del sistema
          - disableTransitionOnChange: evita transiciones CSS molestas cuando cambia el tema
        */}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {/* 
            AuthProvider: contexto global para manejar autenticación y estado del usuario
            De esta forma los hijos pueden usar hooks para acceder a usuario, login, logout, etc.
          */}
          <AuthProvider>
            {/* Renderiza los componentes de la página */}
            {children}
            {/* Componente Toaster para mostrar notificaciones tipo toast en cualquier parte de la app */}
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
