import Link from "next/link"
import { BookOpen } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="w-full border-t bg-background py-6">
      <div className="container flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          <span className="text-lg font-bold">NovelUzu</span>
        </div>
        <p className="text-center text-sm text-muted-foreground md:text-left">
          &copy; {new Date().getFullYear()} NovelUzu. Todos los derechos reservados.
        </p>
        <div className="flex gap-4">
          <Link href="/terms" className="text-sm text-muted-foreground hover:underline">
            Términos
          </Link>
          <Link href="/privacy" className="text-sm text-muted-foreground hover:underline">
            Privacidad
          </Link>
          <Link href="/contact" className="text-sm text-muted-foreground hover:underline">
            Contacto
          </Link>
        </div>
      </div>
    </footer>
  )
}
