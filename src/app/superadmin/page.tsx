import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Users,
  ClipboardCheck,
  AlertTriangle,
  DollarSign,
  History,
  Bell,
} from "lucide-react"

export default function SuperAdminDashboard() {
  const stats = [
    {
      title: "Total Users",
      value: "1,234",
      icon: Users,
      description: "Active users in the system",
    },
    {
      title: "Pending Requests",
      value: "42",
      icon: ClipboardCheck,
      description: "Requests awaiting approval",
    },
    {
      title: "Open Reports",
      value: "18",
      icon: AlertTriangle,
      description: "Unresolved complaints",
    },
    {
      title: "Monthly Revenue",
      value: "$12,345",
      icon: DollarSign,
      description: "Current month's earnings",
    },
    {
      title: "Recent Activities",
      value: "156",
      icon: History,
      description: "Actions in last 24 hours",
    },
    {
      title: "Unread Notifications",
      value: "7",
      icon: Bell,
      description: "New system notifications",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Super Admin Dashboard</h1>
        <p className="text-gray-500">Welcome to the Super Admin dashboard</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-gray-500">{stat.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
} 