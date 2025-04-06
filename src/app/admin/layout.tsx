import { ReactNode } from "react"
import { AdminSidebar } from "@/components/admin/sidebar/sidebar"

interface AdminLayoutProps {
  children: ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex-1 overflow-auto bg-gray-100">
        <header className="bg-white shadow-sm">
          <div className="px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-800">Admin Dashboard</h2>
          </div>
        </header>
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
} 