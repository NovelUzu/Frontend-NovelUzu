"use client"

/**
 * Componente de encabezado del sitio
 *
 * Este componente muestra:
 * - Logo y nombre del sitio
 * - Navegación principal
 * - Selector de tema
 * - Botones de inicio de sesión/registro
 *
 * Se adapta a diferentes tamaños de pantalla con un menú hamburguesa en móvil
 */
import Link from "next/link"
import { BookOpen, Menu, X } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export function SiteHeader() {
  // Estado para controlar la visibilidad del menú móvil
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Función para alternar el menú móvil
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo y nombre del sitio */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <BookOpen className="h-6 w-6 text-primary" />
          <span className="hidden sm:inline bg-gradient-to-r from-primary to-fantasy bg-clip-text text-transparent">
            WebNovelApp
          </span>
        </Link>

        {/* Navegación para pantallas medianas y grandes */}
        <nav className="hidden md:flex gap-4 sm:gap-6">
          <Link href="/explore" className="text-sm font-medium hover:text-primary transition-colors">
            Explorar
          </Link>
          <Link href="/rankings" className="text-sm font-medium hover:text-primary transition-colors">
            Rankings
          </Link>
          <Link href="/genres" className="text-sm font-medium hover:text-primary transition-colors">
            Géneros
          </Link>
          <Link href="/latest" className="text-sm font-medium hover:text-primary transition-colors">
            Novedades
          </Link>
        </nav>

        {/* Botones de acción y tema */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          {/* Botones de inicio de sesión/registro - Ocultos en móvil */}
          <div className="hidden sm:flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="/login">Iniciar Sesión</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/register">Registrarse</Link>
            </Button>
          </div>

          {/* Botón de menú móvil - Visible solo en pantallas pequeñas */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMobileMenu}
            aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Menú móvil - Visible solo cuando está abierto y en pantallas pequeñas */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="container py-4 flex flex-col gap-4">
            <nav className="flex flex-col gap-2">
              <Link
                href="/explore"
                className="text-sm font-medium p-2 hover:bg-muted rounded-md hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Explorar
              </Link>
              <Link
                href="/rankings"
                className="text-sm font-medium p-2 hover:bg-muted rounded-md hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Rankings
              </Link>
              <Link
                href="/genres"
                className="text-sm font-medium p-2 hover:bg-muted rounded-md hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Géneros
              </Link>
              <Link
                href="/latest"
                className="text-sm font-medium p-2 hover:bg-muted rounded-md hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Novedades
              </Link>
            </nav>

            {/* Botones de inicio de sesión/registro para móvil */}
            <div className="flex flex-col gap-2 sm:hidden">
              <Button variant="outline" asChild>
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                  Iniciar Sesión
                </Link>
              </Button>
              <Button asChild>
                <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                  Registrarse
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
