"use client"

import { Button } from "@/components/ui/button"
import {
  Users,
  ClipboardCheck,
  AlertTriangle,
  DollarSign,
  History,
  Bell,
  LogOut,
  Menu,
  X,
  Home,
  Building2,
  BarChart3,
  Settings,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

export function SuperAdminSidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const navigation = [
    { name: "Dashboard", href: "/superadmin/dashboard", icon: Home },
    { name: "Hostels", href: "/superadmin/hostels", icon: Building2 },
    { name  : "Admins", href: "/superadmin/admins", icon: Users },
    { name: "Requests & Approvals", href: "/superadmin/requests", icon: ClipboardCheck },
    { name: "Reports & Complaints", href: "/superadmin/reports", icon: AlertTriangle },
    { name: "Revenue & Subscription", href: "/superadmin/revenue", icon: DollarSign },
    { name: "Analytics", href: "/superadmin/analytics", icon: BarChart3 },
    { name: "Audit Logs", href: "/superadmin/audit", icon: History },
    { name: "Notifications", href: "/superadmin/notifications", icon: Bell },
    { name: "Settings", href: "/superadmin/settings", icon: Settings },
  ]

  const handleLogout = async () => {
    await signOut({redirect : false})
    router.push("/login/superadmin")
  }

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        >
          {isSidebarOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 transform bg-gray-900 text-white transition-transform duration-200 ease-in-out",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0"
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center justify-between border-b border-gray-800 px-4">
            <div className="flex items-center space-x-2">
              <Link href="/superadmin/dashboard" className="flex items-center gap-2 font-semibold">
                <span className="text-lg font-semibold">Super Admin</span>
              </Link>
            </div>
          </div>

          <nav className="flex-1 space-y-1 px-2 py-4">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "group flex items-center rounded-md px-2 py-2 text-sm font-medium",
                    isActive
                      ? "bg-gray-800 text-white"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <item.icon
                    className={cn(
                      "mr-3 h-5 w-5 flex-shrink-0",
                      isActive ? "text-white" : "text-gray-400 group-hover:text-white"
                    )}
                  />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          <div className="border-t border-gray-800 p-4">
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-300 hover:bg-gray-800 hover:text-white"
              onClick={handleLogout}
            >
              <LogOut className="mr-3 h-5 w-5" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="lg:pl-64">
        <main className="p-8">{/* Content will be rendered here */}</main>
      </div>
    </>
  )
} 