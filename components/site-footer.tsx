import Link from "next/link"
import { BookOpen } from "lucide-react"

export function SiteFooter() {
  // Obtener el año actual para el copyright
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full border-t bg-background py-6">
      <div className="container flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6">
        {/* Logo y nombre del sitio */}
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          <span className="text-lg font-bold bg-gradient-to-r from-primary to-fantasy bg-clip-text text-transparent">
            NovelUzu
          </span>
        </div>

        {/* Información de copyright - Centrada en móvil, alineada a la izquierda en desktop */}
        <p className="text-center text-xs sm:text-sm text-muted-foreground md:text-left">
          &copy; {currentYear} NovelUzu. Todos los derechos reservados.
        </p>

        {/* Enlaces de pie de página - Adaptados para mejor visualización en móvil */}
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/terms" className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors">
            Términos
          </Link>
          <Link
            href="/privacy"
            className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Privacidad
          </Link>
          <Link
            href="/contact"
            className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Contacto
          </Link>
        </div>
      </div>
    </footer>
  )
}
