"use client"

/**
 * Componente de encabezado del sitio
 *
 * Este componente muestra:
 * - Logo y nombre del sitio
 * - Navegación principal
 * - Selector de tema
 * - Botones de inicio de sesión/registro o menú de usuario
 *
 * Se adapta a diferentes tamaños de pantalla con un menú hamburguesa en móvil
 */
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BookOpen, Menu, X, User, LogOut, Settings, BookMarked, History } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { useAuth } from "@/lib/auth-context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function SiteHeader() {
  const { user, logout, isAuthenticated } = useAuth()
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(`${path}/`)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo y nombre del sitio */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <BookOpen className="h-6 w-6 text-primary" />
          <span className="hidden sm:inline text-purple-600">NovelUzu</span>
        </Link>

        {/* Navegación para pantallas medianas y grandes */}
        <nav className="hidden md:flex gap-4 sm:gap-6">
          <Link
            href="/explore"
            className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/explore") ? "text-primary" : ""}`}
          >
            Explorar
          </Link>
          <Link
            href="/rankings"
            className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/rankings") ? "text-primary" : ""}`}
          >
            Rankings
          </Link>
          <Link
            href="/genres"
            className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/genres") ? "text-primary" : ""}`}
          >
            Géneros
          </Link>
          <Link
            href="/latest"
            className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/latest") ? "text-primary" : ""}`}
          >
            Novedades
          </Link>
        </nav>

        {/* Botones de acción y tema */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          {/* Usuario autenticado o botones de login/registro */}
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 ml-1">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.avatar || "/placeholder.jpeg"} alt={user?.username} />
                    <AvatarFallback>{user?.username?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.username}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/user/profile" className="cursor-pointer w-full flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>Perfil</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/user/library" className="cursor-pointer w-full flex items-center">
                    <BookMarked className="mr-2 h-4 w-4" />
                    <span>Biblioteca</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/user/history" className="cursor-pointer w-full flex items-center">
                    <History className="mr-2 h-4 w-4" />
                    <span>Historial</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/user/settings" className="cursor-pointer w-full flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Configuración</span>
                  </Link>
                </DropdownMenuItem>
                {user?.role === "admin" && (
                  <DropdownMenuItem asChild>
                    <Link href="/admin" className="cursor-pointer w-full flex items-center">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Panel Admin</span>
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Cerrar sesión</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href="/login">Iniciar Sesión</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/register">Registrarse</Link>
              </Button>
            </div>
          )}

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
                className={`text-sm font-medium p-2 hover:bg-muted rounded-md hover:text-primary ${isActive("/explore") ? "text-primary" : ""}`}
                onClick={closeMobileMenu}
              >
                Explorar
              </Link>
              <Link
                href="/rankings"
                className={`text-sm font-medium p-2 hover:bg-muted rounded-md hover:text-primary ${isActive("/rankings") ? "text-primary" : ""}`}
                onClick={closeMobileMenu}
              >
                Rankings
              </Link>
              <Link
                href="/genres"
                className={`text-sm font-medium p-2 hover:bg-muted rounded-md hover:text-primary ${isActive("/genres") ? "text-primary" : ""}`}
                onClick={closeMobileMenu}
              >
                Géneros
              </Link>
              <Link
                href="/latest"
                className={`text-sm font-medium p-2 hover:bg-muted rounded-md hover:text-primary ${isActive("/latest") ? "text-primary" : ""}`}
                onClick={closeMobileMenu}
              >
                Novedades
              </Link>
            </nav>

            {/* Opciones de usuario o botones de inicio de sesión/registro para móvil */}
            {isAuthenticated ? (
              <div className="flex flex-col gap-2 border-t pt-2">
                <div className="flex items-center gap-2 p-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.avatar || "/placeholder.jpeg"} alt={user?.username} />
                    <AvatarFallback>{user?.username?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{user?.username}</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                  </div>
                </div>
                <Link
                  href="/user/profile"
                  className="text-sm font-medium p-2 hover:bg-muted rounded-md flex items-center gap-2"
                  onClick={closeMobileMenu}
                >
                  <User className="h-4 w-4" />
                  Perfil
                </Link>
                <Link
                  href="/user/library"
                  className="text-sm font-medium p-2 hover:bg-muted rounded-md flex items-center gap-2"
                  onClick={closeMobileMenu}
                >
                  <BookMarked className="h-4 w-4" />
                  Biblioteca
                </Link>
                <Link
                  href="/user/settings"
                  className="text-sm font-medium p-2 hover:bg-muted rounded-md flex items-center gap-2"
                  onClick={closeMobileMenu}
                >
                  <Settings className="h-4 w-4" />
                  Configuración
                </Link>
                {user?.role === "admin" && (
                  <Link
                    href="/admin"
                    className="text-sm font-medium p-2 hover:bg-muted rounded-md flex items-center gap-2"
                    onClick={closeMobileMenu}
                  >
                    <Settings className="h-4 w-4" />
                    Panel Admin
                  </Link>
                )}
                <Button
                  variant="ghost"
                  className="justify-start p-2 h-auto font-medium text-sm"
                  onClick={() => {
                    logout()
                    closeMobileMenu()
                  }}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Cerrar sesión
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-2 sm:hidden">
                <Button variant="outline" asChild>
                  <Link href="/login" onClick={closeMobileMenu}>
                    Iniciar Sesión
                  </Link>
                </Button>
                <Button asChild>
                  <Link href="/register" onClick={closeMobileMenu}>
                    Registrarse
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
