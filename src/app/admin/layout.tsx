import { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Home,
  Users,
  Calendar,
  Bell,
  Utensils,
  Package,
  BarChart2,
  Settings,
  LogOut,
} from "lucide-react"
import Link from "next/link"

interface AdminLayoutProps {
  children: ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Hostel Admin</h1>
        </div>
        <nav className="space-y-2">
          <Link href="/admin/dashboard">
            <Button variant="ghost" className="w-full justify-start">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
          </Link>
          <Link href="/admin/rooms">
            <Button variant="ghost" className="w-full justify-start">
              <Home className="mr-2 h-4 w-4" />
              Rooms & Beds
            </Button>
          </Link>
          <Link href="/admin/students">
            <Button variant="ghost" className="w-full justify-start">
              <Users className="mr-2 h-4 w-4" />
              Students
            </Button>
          </Link>
          <Link href="/admin/accounts"> 
            <Button variant="ghost" className="w-full justify-start">
              <Users className="mr-2 h-4 w-4" />
              Accounts
            </Button>
          </Link>
          <Link href="/admin/calendar">
            <Button variant="ghost" className="w-full justify-start">
              <Calendar className="mr-2 h-4 w-4" />
              Calendar
            </Button>
          </Link>
          <Link href="/admin/announcements">
            <Button variant="ghost" className="w-full justify-start">
              <Bell className="mr-2 h-4 w-4" />
              Announcements
            </Button>
          </Link>
          <Link href="/admin/meal-plans">
            <Button variant="ghost" className="w-full justify-start">
              <Utensils className="mr-2 h-4 w-4" />
              Meal Plans
            </Button>
          </Link>
          <Link href="/admin/inventory">
            <Button variant="ghost" className="w-full justify-start">
              <Package className="mr-2 h-4 w-4" />
              Inventory
            </Button>
          </Link>
          <Link href="/admin/reports">
            <Button variant="ghost" className="w-full justify-start">
              <BarChart2 className="mr-2 h-4 w-4" />
              Reports
            </Button>
          </Link>
          <Link href="/admin/settings">
            <Button variant="ghost" className="w-full justify-start">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </Link>
        </nav>
        <div className="absolute bottom-4 left-0 right-0 px-4">
          <Button variant="ghost" className="w-full justify-start text-red-400">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
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