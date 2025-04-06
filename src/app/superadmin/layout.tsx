import { SuperAdminSidebar } from "@/components/superadmin/sidebar"
import { Providers } from "@/components/providers"

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
          <Providers>
            {children}
          </Providers>
        </main>
      </div>
    </div>
  )
}