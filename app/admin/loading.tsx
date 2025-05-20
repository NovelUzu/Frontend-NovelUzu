import type React from "react"
import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminAuth } from "@/components/admin/admin-auth"

export const metadata: Metadata = {
  title: "Panel de Administración | NovelUzu",
  description: "Panel de administración para gestionar la plataforma NovelUzu",
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <AdminAuth>
        <div className="container flex-1 items-start md:grid md:grid-cols-[240px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-10">
          <AdminSidebar />
          <main className="relative py-6 lg:gap-10 lg:py-8">
            <div className="mx-auto w-full min-w-0">{children}</div>
          </main>
        </div>
      </AdminAuth>
    </div>
  )
}
