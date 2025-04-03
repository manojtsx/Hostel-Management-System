import { ReactNode } from "react"
import { SuperAdminSidebar } from "@/components/superadmin/sidebar"

interface SuperAdminLayoutProps {
  children: ReactNode
}

export default function SuperAdminLayout({ children }: SuperAdminLayoutProps) {
  // TODO: Add authentication check

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="flex">
        <div className="w-64 fixed inset-y-0 left-0 z-50">
          <SuperAdminSidebar />
        </div>
        <div className="flex-1 ml-64">
          <main className="p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}