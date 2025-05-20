"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Settings,
  BarChart,
  MessageSquare,
  Bell,
  Shield,
  Menu,
  X,
  FileText,
  Tag,
  DollarSign,
  Flag,
} from "lucide-react"

export function AdminSidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const menuItems = [
    {
      title: "Panel principal",
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
      title: "Estadísticas",
      href: "/admin/analytics",
      icon: <BarChart className="h-5 w-5" />,
    },
    {
      title: "Reportes",
      href: "/admin/reports",
      icon: <Flag className="h-5 w-5" />,
    },
    {
      title: "Comentarios",
      href: "/admin/comments",
      icon: <MessageSquare className="h-5 w-5" />,
    },
    {
      title: "Notificaciones",
      href: "/admin/notifications",
      icon: <Bell className="h-5 w-5" />,
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
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed bottom-4 right-4 z-50 bg-blue-600 text-white p-3 rounded-full shadow-lg"
        aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Overlay para móvil */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`
          bg-gray-900 text-white w-64 flex-shrink-0 overflow-y-auto
          fixed md:static inset-y-0 left-0 z-50 transform transition-transform duration-200 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div className="p-4 border-b border-gray-800">
          <h2 className="text-xl font-bold">Panel de Administración</h2>
          <p className="text-gray-400 text-sm">NovelUzu</p>
        </div>

        <nav className="p-4">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.href

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`
                      flex items-center gap-3 px-3 py-2 rounded-md transition-colors
                      ${isActive ? "bg-blue-700 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"}
                    `}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </aside>
    </>
  )
}
