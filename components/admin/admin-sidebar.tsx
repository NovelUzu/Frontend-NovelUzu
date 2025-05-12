"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  BarChart3,
  BookOpen,
  Flag,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Settings,
  Users,
  X,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const closeSidebar = () => {
    setIsOpen(false)
  }

  const handleLogout = () => {
    // Eliminar el estado de administrador
    localStorage.removeItem("isAdmin")
    // Redirigir a la página de inicio
    router.push("/")
  }

  const navItems = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: "Usuarios",
      href: "/admin/users",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "Contenido",
      href: "/admin/content",
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      title: "Comentarios",
      href: "/admin/comments",
      icon: <MessageSquare className="h-5 w-5" />,
    },
    {
      title: "Reportes",
      href: "/admin/reports",
      icon: <Flag className="h-5 w-5" />,
    },
    {
      title: "Estadísticas",
      href: "/admin/stats",
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      title: "Configuración",
      href: "/admin/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  return (
    <>
      {/* Botón de menú móvil */}
      <Button variant="outline" size="icon" className="fixed left-4 top-4 z-50 md:hidden" onClick={toggleSidebar}>
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Overlay para cerrar el sidebar en móvil */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden" onClick={closeSidebar} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform border-r bg-card transition-transform duration-200 ease-in-out md:relative md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center border-b px-4">
          <Link href="/admin" className="flex items-center gap-2 font-bold text-xl" onClick={closeSidebar}>
            <BookOpen className="h-6 w-6 text-primary" />
            <span>Admin Panel</span>
          </Link>
        </div>

        <ScrollArea className="h-[calc(100vh-4rem)]">
          <div className="px-3 py-4">
            <nav className="flex flex-col gap-1">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  onClick={closeSidebar}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                    pathname === item.href ? "bg-accent text-accent-foreground" : "hover:bg-accent/50"
                  }`}
                >
                  {item.icon}
                  {item.title}
                </Link>
              ))}
            </nav>

            <div className="mt-6 border-t pt-6">
              <Link
                href="/"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-accent/50"
                onClick={closeSidebar}
              >
                <Home className="h-5 w-5" />
                Volver al sitio
              </Link>
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 px-3 py-2 text-sm hover:bg-accent/50"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5" />
                Cerrar sesión
              </Button>
            </div>
          </div>
        </ScrollArea>
      </aside>
    </>
  )
}
