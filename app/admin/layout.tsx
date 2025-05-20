import type { ReactNode } from "react"
import { SiteHeader } from "@/components/site-header"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminAuth } from "@/components/admin/admin-auth"
import { SiteFooter } from "@/components/site-footer"

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AdminAuth>
      <div className="min-h-screen flex flex-col">
        <SiteHeader />
        <div className="flex-1 flex flex-col md:flex-row">
          <AdminSidebar />
          <main className="flex-1 p-4 md:p-6 overflow-auto">{children}</main>
        </div>
        <SiteFooter />
      </div>
    </AdminAuth>
  )
}
