"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  BedDouble,
  Bell,
  Utensils,
  FileText,
  Calendar,
  AlertCircle,
  Users,
  Clock,
  CheckCircle2,
  XCircle,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface RoomDetails {
  number: string
  block: string
  floor: string
  type: string
  capacity: number
  occupied: number
}

interface MealPlan {
  type: string
  status: "active" | "expired" | "pending"
  validUntil: string
  mealsPerDay: number
  remainingDays: number
}

interface Announcement {
  id: string
  title: string
  content: string
  date: string
  type: "info" | "warning" | "alert"
  isRead: boolean
}

interface Document {
  id: string
  name: string
  status: "pending" | "approved" | "rejected"
  dueDate: string
  type: string
}

interface Event {
  id: string
  title: string
  date: string
  time: string
  location: string
  type: "inspection" | "meeting" | "maintenance"
}

interface Notice {
  id: string
  title: string
  content: string
  date: string
  priority: "low" | "medium" | "high"
  isRead: boolean
}

export function StudentDashboard() {
  const [roomDetails, setRoomDetails] = useState<RoomDetails>({
    number: "101",
    block: "A",
    floor: "1",
    type: "Double Sharing",
    capacity: 2,
    occupied: 2,
  })

  const [mealPlan, setMealPlan] = useState<MealPlan>({
    type: "Premium",
    status: "active",
    validUntil: "2024-12-31",
    mealsPerDay: 3,
    remainingDays: 290,
  })

  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: "1",
      title: "Hostel Maintenance",
      content: "Water supply will be interrupted tomorrow from 10 AM to 2 PM",
      date: "2024-03-15",
      type: "warning",
      isRead: false,
    },
    {
      id: "2",
      title: "Document Submission",
      content: "Please submit your ID proof by Friday",
      date: "2024-03-14",
      type: "alert",
      isRead: false,
    },
    {
      id: "3",
      title: "Hostel Meeting",
      content: "Monthly hostel meeting scheduled for Friday",
      date: "2024-03-13",
      type: "info",
      isRead: true,
    },
  ])

  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "1",
      name: "ID Proof",
      status: "pending",
      dueDate: "2024-03-20",
      type: "Verification",
    },
    {
      id: "2",
      name: "Medical Certificate",
      status: "approved",
      dueDate: "2024-03-15",
      type: "Health",
    },
    {
      id: "3",
      name: "Address Proof",
      status: "rejected",
      dueDate: "2024-03-10",
      type: "Verification",
    },
  ])

  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      title: "Room Inspection",
      date: "2024-03-16",
      time: "10:00 AM",
      location: "Block A",
      type: "inspection",
    },
    {
      id: "2",
      title: "Hostel Meeting",
      date: "2024-03-18",
      time: "2:00 PM",
      location: "Common Hall",
      type: "meeting",
    },
    {
      id: "3",
      title: "Maintenance Work",
      date: "2024-03-20",
      time: "9:00 AM",
      location: "Block A",
      type: "maintenance",
    },
  ])

  const [notices, setNotices] = useState<Notice[]>([
    {
      id: "1",
      title: "Maintenance Notice",
      content: "Water supply will be interrupted tomorrow",
      date: "2024-03-15",
      priority: "high",
      isRead: false,
    },
    {
      id: "2",
      title: "Document Submission",
      content: "Please submit your ID proof by Friday",
      date: "2024-03-14",
      priority: "medium",
      isRead: false,
    },
    {
      id: "3",
      title: "Hostel Rules Update",
      content: "New hostel rules have been updated",
      date: "2024-03-13",
      priority: "low",
      isRead: true,
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "expired":
        return "bg-red-500"
      case "pending":
        return "bg-yellow-500"
      case "approved":
        return "bg-green-500"
      case "rejected":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "inspection":
        return <BedDouble className="h-5 w-5 text-muted-foreground" />
      case "meeting":
        return <Users className="h-5 w-5 text-muted-foreground" />
      case "maintenance":
        return <AlertCircle className="h-5 w-5 text-muted-foreground" />
      default:
        return <Calendar className="h-5 w-5 text-muted-foreground" />
    }
  }

  const occupancyPercentage = (roomDetails.occupied / roomDetails.capacity) * 100

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Welcome back, Student!</h1>
        <p className="text-muted-foreground">
          Here&apos;s an overview of your hostel activities
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Room Details</CardTitle>
            <BedDouble className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Room {roomDetails.number}</div>
            <p className="text-xs text-muted-foreground">
              Block {roomDetails.block}, Floor {roomDetails.floor}
            </p>
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm">
                <span>Occupancy</span>
                <span>{roomDetails.occupied}/{roomDetails.capacity}</span>
              </div>
              <Progress value={occupancyPercentage} className="mt-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Meal Plan</CardTitle>
            <Utensils className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mealPlan.type}</div>
            <p className="text-xs text-muted-foreground">
              Valid until {mealPlan.validUntil}
            </p>
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm">
                <span>Remaining Days</span>
                <span>{mealPlan.remainingDays} days</span>
              </div>
              <Progress
                value={(mealPlan.remainingDays / 365) * 100}
                className="mt-2"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Announcements</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {announcements.filter((a) => !a.isRead).length} New
            </div>
            <p className="text-xs text-muted-foreground">
              Unread announcements
            </p>
            <div className="mt-4 space-y-2">
              {announcements.slice(0, 2).map((announcement) => (
                <div
                  key={announcement.id}
                  className="flex items-center space-x-2 text-sm"
                >
                  {!announcement.isRead && (
                    <div className="h-2 w-2 rounded-full bg-blue-500" />
                  )}
                  <span className="truncate">{announcement.title}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Documents</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {documents.filter((d) => d.status === "pending").length}
            </div>
            <p className="text-xs text-muted-foreground">
              Pending documents
            </p>
            <div className="mt-4 space-y-2">
              {documents.slice(0, 2).map((document) => (
                <div
                  key={document.id}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="truncate">{document.name}</span>
                  <Badge className={getStatusColor(document.status)}>
                    {document.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Your scheduled activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {events.map((event) => (
                <div key={event.id} className="flex items-center space-x-4">
                  {getTypeIcon(event.type)}
                  <div>
                    <p className="font-medium">{event.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {event.date} at {event.time}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {event.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Important Notices</CardTitle>
            <CardDescription>Recent announcements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notices.map((notice) => (
                <div key={notice.id} className="flex items-center space-x-4">
                  <AlertCircle
                    className={`h-5 w-5 ${
                      notice.priority === "high"
                        ? "text-red-500"
                        : notice.priority === "medium"
                        ? "text-yellow-500"
                        : "text-blue-500"
                    }`}
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <p className="font-medium">{notice.title}</p>
                      {!notice.isRead && (
                        <Badge className={getPriorityColor(notice.priority)}>
                          {notice.priority}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {notice.content}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {notice.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 