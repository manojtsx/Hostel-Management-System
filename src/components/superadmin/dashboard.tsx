"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Building2,
  Users,
  GraduationCap,
  TrendingUp,
  AlertCircle,
  DollarSign,
  Clock,
  Activity,
  Shield,
  Bell,
  Home,
  FileWarning,
  MoreVertical,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Notification {
  id: number
  title: string
  message: string
  type: "info" | "warning" | "error" | "success"
  timestamp: string
  read: boolean
}

interface Hostel {
  id: number
  name: string
  location: string
  totalRooms: number
  occupiedRooms: number
  status: "Active" | "Inactive" | "Maintenance"
  lastUpdated: string
}

interface Report {
  id: number
  title: string
  type: "Complaint" | "Maintenance" | "Security" | "Other"
  status: "Open" | "In Progress" | "Resolved" | "Closed"
  hostel: string
  date: string
  priority: "High" | "Medium" | "Low"
}

export function SuperAdminDashboard() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: "New Payment Received",
      message: "Payment of $99.99 received from Sunrise Residency",
      type: "success",
      timestamp: "2m ago",
      read: false,
    },
    {
      id: 2,
      title: "System Update Available",
      message: "New version 2.1.0 is available for installation",
      type: "info",
      timestamp: "15m ago",
      read: false,
    },
    {
      id: 3,
      title: "Security Alert",
      message: "Unusual login attempt detected from unknown IP",
      type: "error",
      timestamp: "1h ago",
      read: true,
    },
    {
      id: 4,
      title: "Subscription Expiring",
      message: "Green Valley Hostel subscription expires in 3 days",
      type: "warning",
      timestamp: "2h ago",
      read: true,
    },
  ])

  const [hostels] = useState<Hostel[]>([
    {
      id: 1,
      name: "Sunrise Residency",
      location: "123 Main St, City",
      totalRooms: 50,
      occupiedRooms: 45,
      status: "Active",
      lastUpdated: "2024-03-15",
    },
    {
      id: 2,
      name: "Green Valley Hostel",
      location: "456 Park Ave, Town",
      totalRooms: 30,
      occupiedRooms: 25,
      status: "Active",
      lastUpdated: "2024-03-14",
    },
    {
      id: 3,
      name: "Mountain View Hostel",
      location: "789 Hill Rd, Village",
      totalRooms: 40,
      occupiedRooms: 35,
      status: "Maintenance",
      lastUpdated: "2024-03-13",
    },
  ])

  const [reports] = useState<Report[]>([
    {
      id: 1,
      title: "Water Leak in Room 101",
      type: "Maintenance",
      status: "Open",
      hostel: "Sunrise Residency",
      date: "2024-03-15",
      priority: "High",
    },
    {
      id: 2,
      title: "Noise Complaint",
      type: "Complaint",
      status: "In Progress",
      hostel: "Green Valley Hostel",
      date: "2024-03-14",
      priority: "Medium",
    },
    {
      id: 3,
      title: "Security Camera Issue",
      type: "Security",
      status: "Open",
      hostel: "Mountain View Hostel",
      date: "2024-03-13",
      priority: "High",
    },
  ])
  
  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      case "info":
        return <Bell className="h-4 w-4 text-blue-500" />
    }
  }

  const getReportPriorityBadge = (priority: Report["priority"]) => {
    switch (priority) {
      case "High":
        return <Badge variant="destructive">High</Badge>
      case "Medium":
        return <Badge variant="secondary">Medium</Badge>
      case "Low":
        return <Badge variant="outline">Low</Badge>
    }
  }

  const getReportStatusBadge = (status: Report["status"]) => {
    switch (status) {
      case "Open":
        return <Badge variant="default">Open</Badge>
      case "In Progress":
        return <Badge variant="secondary">In Progress</Badge>
      case "Resolved":
        return <Badge variant="outline">Resolved</Badge>
      case "Closed":
        return <Badge variant="destructive">Closed</Badge>
    }
  }

  const getHostelStatusBadge = (status: Hostel["status"]) => {
    switch (status) {
      case "Active":
        return <Badge variant="default">Active</Badge>
      case "Inactive":
        return <Badge variant="destructive">Inactive</Badge>
      case "Maintenance":
        return <Badge variant="secondary">Maintenance</Badge>
    }
  }

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of the hostel management system
          </p>
        </div>
        <Button>
          <Activity className="mr-2 h-4 w-4" />
          Generate Report
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Hostels</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              +2 from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Admins</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              +3 from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">
              +89 from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,450</div>
            <p className="text-xs text-muted-foreground">
              +15% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2,450</div>
            <p className="text-xs text-muted-foreground">
              5 pending payments
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">
              Current active users
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Security Status</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Secure</div>
            <p className="text-xs text-muted-foreground">
              All systems normal
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Hostels Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Hostels List */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Hostels</CardTitle>
                <Button variant="outline" size="sm">
                  <Home className="mr-2 h-4 w-4" />
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Rooms</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {hostels.map((hostel) => (
                    <TableRow key={hostel.id}>
                      <TableCell className="font-medium">{hostel.name}</TableCell>
                      <TableCell>{hostel.location}</TableCell>
                      <TableCell>{hostel.occupiedRooms}/{hostel.totalRooms}</TableCell>
                      <TableCell>{getHostelStatusBadge(hostel.status)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Manage Rooms</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Reports List */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Reports</CardTitle>
                <Button variant="outline" size="sm">
                  <FileWarning className="mr-2 h-4 w-4" />
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Hostel</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell className="font-medium">{report.title}</TableCell>
                      <TableCell>{report.hostel}</TableCell>
                      <TableCell>{getReportPriorityBadge(report.priority)}</TableCell>
                      <TableCell>{getReportStatusBadge(report.status)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Assign</DropdownMenuItem>
                            <DropdownMenuItem>Update Status</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Notifications Section */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Notifications</CardTitle>
                <Button variant="outline" size="sm">
                  <Bell className="mr-2 h-4 w-4" />
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`flex items-start space-x-4 p-2 rounded-lg ${
                      !notification.read ? "bg-muted" : ""
                    }`}
                  >
                    <div className="mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{notification.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {notification.timestamp}
                      </p>
                    </div>
                    {!notification.read && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => markAsRead(notification.id)}
                      >
                        Mark as read
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* System Information */}
          <Card>
            <CardHeader>
              <CardTitle>System Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">System Version</p>
                  <p className="text-sm text-muted-foreground">2.1.0</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Last Backup</p>
                  <p className="text-sm text-muted-foreground">2024-03-15 23:59</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Database Size</p>
                  <p className="text-sm text-muted-foreground">245 MB</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Uptime</p>
                  <p className="text-sm text-muted-foreground">99.9%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 