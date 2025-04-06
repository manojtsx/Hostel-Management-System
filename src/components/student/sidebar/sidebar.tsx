"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  BedDouble,
  Bell,
  Utensils,
  FileText,
  Settings,
  Calendar,
  Users,
  Package,
  BarChart,
  Wallet,
} from "lucide-react"
import { cn } from "@/lib/utils"

const studentNavItems = [
  {
    title: "Dashboard",
    href: "/student/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Room",
    href: "/student/room",
    icon: BedDouble,
  },
  {
    title: "Announcements",
    href: "/student/announcements",
    icon: Bell,
  },
  {
    title: "Meal Plans",
    href: "/student/meal-plans",
    icon: Utensils,
  },
  {
    title: "Documents",
    href: "/student/documents",
    icon: FileText,
  },
  {
    title: "Calendar",
    href: "/student/calendar",
    icon: Calendar,
  },
  {
    title: "Roommates",
    href: "/student/roommates",
    icon: Users,
  },
  {
    title: "Inventory",
    href: "/student/inventory",
    icon: Package,
  },
  {
    title: "Reports",
    href: "/student/reports",
    icon: BarChart,
  },
  {
    title: "Payments",
    href: "/student/payments",
    icon: Wallet,
  },
  {
    title: "Settings",
    href: "/student/settings",
    icon: Settings,
  },
]

export function StudentSidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full flex-col gap-2">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/student" className="flex items-center gap-2 font-semibold">
          <span>Student Portal</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start gap-2 px-2">
          {studentNavItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
                  isActive ? "bg-accent" : "transparent"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
} 