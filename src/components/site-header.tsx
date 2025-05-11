import Link from "next/link"
import { BookOpen } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <BookOpen className="h-6 w-6" />
          <span>NovelUzu</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="/explore" className="text-sm font-medium">
            Explorar
          </Link>
          <Link href="/rankings" className="text-sm font-medium">
            Rankings
          </Link>
          <Link href="/genres" className="text-sm font-medium">
            Géneros
          </Link>
          <Link href="/latest" className="text-sm font-medium">
            Novedades
          </Link>
        </nav>
        <div className="ml-4 flex items-center gap-2">
          <ThemeToggle />
          <Button variant="outline" size="sm" asChild>
            <Link href="/login">Iniciar Sesión</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/register">Registrarse</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
