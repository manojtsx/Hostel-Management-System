"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Home,
  BedDouble,
  Bell,
  Utensils,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

export function StudentSidebar() {
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const navigation = [
    {
      name: "Dashboard",
      href: "/student/dashboard",
      icon: Home,
    },
    {
      name: "My Room",
      href: "/student/room",
      icon: BedDouble,
    },
    {
      name: "Announcements",
      href: "/student/announcements",
      icon: Bell,
    },
    {
      name: "Meal Plans",
      href: "/student/meal-plans",
      icon: Utensils,
    },
    {
      name: "Documents",
      href: "/student/documents",
      icon: FileText,
    },
    {
      name: "Settings",
      href: "/student/settings",
      icon: Settings,
    },
  ]

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
              <span className="text-lg font-semibold">Student Portal</span>
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