import { SuperAdminSidebar } from "@/components/superadmin/sidebar"

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <SuperAdminSidebar />
      <div className="flex-1">
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}