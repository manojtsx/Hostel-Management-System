"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BedDouble,
  Users,
  Bell,
  Utensils,
  DollarSign,
  Calendar,
  TrendingUp,
  AlertCircle,
  Package,
  FileText,
  User,
} from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useQuery } from "@tanstack/react-query"
import { getTotalRooms, getTotalStudents } from "./DashboardServer"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface DashboardStats {
  totalRooms: number
  totalStudents: number
  totalTemporaryGuests: number
  monthlyRevenue: number
  occupancyRate: number
  pendingPayments: number
  activeTemporaryGuests: number
}

interface RecentActivity {
  id: string
  type: "student" | "guest" | "payment" | "maintenance"
  title: string
  description: string
  date: string
  status: "completed" | "pending" | "failed"
}

interface RoomStatus {
  id: string
  number: string
  type: string
  capacity: number
  occupied: number
  status: "available" | "occupied" | "maintenance"
}

export function AdminDashboard() {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())

  const [stats, setStats] = useState<DashboardStats>({
    totalRooms: 50,
    totalStudents: 200,
    totalTemporaryGuests: 15,
    monthlyRevenue: 50000,
    occupancyRate: 85,
    pendingPayments: 5,
    activeTemporaryGuests: 8,
  })

  const {data : totalRooms, isLoading : isTotalRoomsLoading} = useQuery({
    queryKey: ["total-rooms", selectedMonth, selectedYear],
    queryFn: () => getTotalRooms(selectedMonth, selectedYear)
  })

  const {data : totalStudents, isLoading : isTotalStudentsLoading} = useQuery({
    queryKey: ["total-students", selectedMonth, selectedYear],
    queryFn: () => getTotalStudents(selectedMonth, selectedYear)
  })

  useEffect(() => {
    if (totalRooms && totalStudents) {
      setStats({
        totalRooms: totalRooms.totalRooms || 0,
        totalStudents: totalStudents.totalStudents || 0,
        totalTemporaryGuests: 0,
        monthlyRevenue: 0,
        occupancyRate: 0,
        pendingPayments: 0,
        activeTemporaryGuests: 0,
      })
    }
  }, [totalRooms, totalStudents])

  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([
    {
      id: "1",
      type: "student",
      title: "New Student Registration",
      description: "John Doe registered for the semester",
      date: "2024-03-15",
      status: "completed",
    },
    {
      id: "2",
      type: "guest",
      title: "New Temporary Guest",
      description: "Sarah Johnson checked in for 2 days",
      date: "2024-03-16",
      status: "pending",
    },
    {
      id: "3",
      type: "payment",
      title: "Payment Received",
      description: "Monthly rent payment from Room 101",
      date: "2024-03-17",
      status: "completed",
    },
    {
      id: "4",
      type: "maintenance",
      title: "Maintenance Request",
      description: "AC repair needed in Room 102",
      date: "2024-03-18",
      status: "pending",
    },
  ])

  const [roomStatus, setRoomStatus] = useState<RoomStatus[]>([
    {
      id: "101",
      number: "101",
      type: "Single",
      capacity: 4,
      occupied: 3,
      status: "occupied",
    },
    {
      id: "102",
      number: "102",
      type: "Double",
      capacity: 8,
      occupied: 5,
      status: "occupied",
    },
    {
      id: "103",
      number: "103",
      type: "Triple",
      capacity: 12,
      occupied: 7,
      status: "occupied",
    },
    {
      id: "104",
      number: "104",
      type: "Single",
      capacity: 4,
      occupied: 2,
      status: "available",
    },
    {
      id: "105",
      number: "105",
      type: "Double",
      capacity: 8,
      occupied: 4,
      status: "occupied",
    },
  ])


  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of your hostel management system
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Select
            value={selectedMonth.toString()}
            onValueChange={(value) => setSelectedMonth(parseInt(value))}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">January</SelectItem>
              <SelectItem value="2">February</SelectItem>
              <SelectItem value="3">March</SelectItem>
              <SelectItem value="4">April</SelectItem>
              <SelectItem value="5">May</SelectItem>
              <SelectItem value="6">June</SelectItem>
              <SelectItem value="7">July</SelectItem>
              <SelectItem value="8">August</SelectItem>
              <SelectItem value="9">September</SelectItem>
              <SelectItem value="10">October</SelectItem>
              <SelectItem value="11">November</SelectItem>
              <SelectItem value="12">December</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={selectedYear.toString()}
            onValueChange={(value) => setSelectedYear(parseInt(value))}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - 2 + i).map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button>
            <FileText className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Rooms</CardTitle>
            <BedDouble className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalRooms}</div>
            <p className="text-xs text-muted-foreground">
              {stats.occupancyRate}% occupancy rate
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalStudents}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((stats.totalStudents / (stats.totalRooms * 4)) * 100)}% capacity
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Temporary Guests</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalTemporaryGuests}</div>
            <p className="text-xs text-muted-foreground">
              {stats.activeTemporaryGuests} currently active
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.monthlyRevenue}</div>
            <p className="text-xs text-muted-foreground">
              {stats.pendingPayments} pending payments
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {activity.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {activity.description}
                    </p>
                  </div>
                  <div className="ml-auto font-medium">
                    <Badge
                      variant={
                        activity.status === "completed"
                          ? "default"
                          : activity.status === "pending"
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {activity.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Room Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {roomStatus.map((room) => (
                <div key={room.id} className="flex items-center">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Room {room.number}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {room.occupied}/{room.capacity} occupied
                    </p>
                  </div>
                  <div className="ml-auto font-medium">
                    <Badge
                      variant={
                        room.status === "available"
                          ? "default"
                          : room.status === "occupied"
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {room.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts and Notifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Pending Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Package className="h-4 w-4 text-yellow-500" />
                  <div>
                    <p className="text-sm font-medium">{stats.pendingPayments} Pending Payments</p>
                    <p className="text-xs text-muted-foreground">Follow up required</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">View</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="w-full">
                <Users className="mr-2 h-4 w-4" />
                Add Student
              </Button>
              <Button variant="outline" className="w-full">
                <BedDouble className="mr-2 h-4 w-4" />
                Manage Rooms
              </Button>
              <Button variant="outline" className="w-full">
                <Bell className="mr-2 h-4 w-4" />
                Post Announcement
              </Button>
              <Button variant="outline" className="w-full">
                <Utensils className="mr-2 h-4 w-4" />
                Update Menu
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 