import { StudentSidebar } from "@/components/student/sidebar"

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <StudentSidebar />
      <div className="flex-1">
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}