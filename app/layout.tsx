import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/lib/contexts"

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
      <body className={inter.className}>

        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
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
