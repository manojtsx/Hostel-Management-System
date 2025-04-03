import { redirect } from "next/navigation"

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // TODO: Add authentication check
  const isAuthenticated = false

  if (!isAuthenticated) {
    redirect("/superadmin/login")
  }

  return <>{children}</>
} 