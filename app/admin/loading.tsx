import type React from "react"
import { AdminAuth } from "@/components/admin/admin-auth"
import { AdminSidebar } from "@/components/admin/admin-sidebar"

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <AdminAuth>
            <div className="flex min-h-screen flex-col md:flex-row">
                <AdminSidebar />
                <div className="flex-1 overflow-auto">
                    <div className="container p-4 md:p-6 lg:p-8">{children}</div>
                </div>
            </div>
        </AdminAuth>
    )
}
