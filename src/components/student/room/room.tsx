"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  BedDouble,
  Users,
  Calendar,
  AlertCircle,
  MessageSquare,
  Bell,
  Wifi,
  Thermometer,
  Droplets,
  Lightbulb,
  Settings,
  Plus,
} from "lucide-react"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Roommate {
  id: string
  name: string
  avatar: string
  course: string
  year: string
  contact: string
}

interface MaintenanceRequest {
  id: string
  title: string
  description: string
  status: "pending" | "in-progress" | "completed"
  date: string
  priority: "low" | "medium" | "high"
}

interface RoomFacility {
  id: string
  name: string
  status: "working" | "not-working" | "maintenance"
  lastChecked: string
}

interface NewRequest {
  title: string
  description: string
  priority: "low" | "medium" | "high"
}

export function StudentRoom() {
  const [roommates, setRoommates] = useState<Roommate[]>([
    {
      id: "1",
      name: "John Doe",
      avatar: "/avatars/01.png",
      course: "Computer Science",
      year: "3rd Year",
      contact: "+1234567890",
    },
    {
      id: "2",
      name: "Alice Smith",
      avatar: "/avatars/02.png",
      course: "Electrical Engineering",
      year: "2nd Year",
      contact: "+1234567891",
    },
  ])

  const [maintenanceRequests, setMaintenanceRequests] = useState<MaintenanceRequest[]>([
    {
      id: "1",
      title: "AC Not Working",
      description: "The air conditioner is not cooling properly",
      status: "pending",
      date: "2024-03-15",
      priority: "high",
    },
    {
      id: "2",
      title: "Leaking Tap",
      description: "The bathroom tap is leaking",
      status: "completed",
      date: "2024-03-14",
      priority: "medium",
    },
  ])

  const [facilities, setFacilities] = useState<RoomFacility[]>([
    {
      id: "1",
      name: "WiFi",
      status: "working",
      lastChecked: "2024-03-15",
    },
    {
      id: "2",
      name: "AC",
      status: "not-working",
      lastChecked: "2024-03-15",
    },
    {
      id: "3",
      name: "Water Supply",
      status: "working",
      lastChecked: "2024-03-15",
    },
    {
      id: "4",
      name: "Lighting",
      status: "working",
      lastChecked: "2024-03-15",
    },
  ])

  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false)
  const [newRequest, setNewRequest] = useState<NewRequest>({
    title: "",
    description: "",
    priority: "medium",
  })

  const handleSubmitRequest = () => {
    if (!newRequest.title || !newRequest.description) {
      toast.error("Please fill in all required fields")
      return
    }

    const request: MaintenanceRequest = {
      id: Date.now().toString(),
      ...newRequest,
      status: "pending",
      date: new Date().toISOString().split("T")[0],
    }

    setMaintenanceRequests([...maintenanceRequests, request])
    setIsReportDialogOpen(false)
    setNewRequest({ title: "", description: "", priority: "medium" })
    toast.success("Maintenance request submitted successfully")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500"
      case "in-progress":
        return "bg-blue-500"
      case "completed":
        return "bg-green-500"
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
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getFacilityIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case "wifi":
        return <Wifi className="h-5 w-5" />
      case "ac":
        return <Thermometer className="h-5 w-5" />
      case "water supply":
        return <Droplets className="h-5 w-5" />
      case "lighting":
        return <Lightbulb className="h-5 w-5" />
      default:
        return <Settings className="h-5 w-5" />
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Room</h1>
        <p className="text-muted-foreground">
          View your room details and roommates
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Room Information</CardTitle>
            <CardDescription>Your current room details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <BedDouble className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Room 101</p>
                <p className="text-sm text-muted-foreground">
                  Block A, Floor 1
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Users className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Capacity: 4</p>
                <p className="text-sm text-muted-foreground">
                  Currently occupied: 3
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Allocated Since</p>
                <p className="text-sm text-muted-foreground">
                  January 1, 2024
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Roommates</CardTitle>
            <CardDescription>Your current roommates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {roommates.map((roommate) => (
              <div key={roommate.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={roommate.avatar} />
                    <AvatarFallback>
                      {roommate.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{roommate.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {roommate.course} • {roommate.year}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon">
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Bell className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Room Facilities</CardTitle>
            <CardDescription>Status of room facilities</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {facilities.map((facility) => (
              <div key={facility.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {getFacilityIcon(facility.name)}
                  <div>
                    <p className="font-medium">{facility.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Last checked: {facility.lastChecked}
                    </p>
                  </div>
                </div>
                <Badge
                  className={
                    facility.status === "working"
                      ? "bg-green-500"
                      : facility.status === "not-working"
                      ? "bg-red-500"
                      : "bg-yellow-500"
                  }
                >
                  {facility.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Maintenance Requests</CardTitle>
              <CardDescription>Report and track maintenance issues</CardDescription>
            </div>
            <Dialog open={isReportDialogOpen} onOpenChange={setIsReportDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Report Issue
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Report Maintenance Issue</DialogTitle>
                  <DialogDescription>
                    Fill in the details of the maintenance issue
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={newRequest.title}
                      onChange={(e) =>
                        setNewRequest({ ...newRequest, title: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={newRequest.description}
                      onChange={(e) =>
                        setNewRequest({ ...newRequest, description: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select
                      value={newRequest.priority}
                      onValueChange={(value: "low" | "medium" | "high") =>
                        setNewRequest({ ...newRequest, priority: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsReportDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSubmitRequest}>Submit Request</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent className="space-y-4">
            {maintenanceRequests.map((request) => (
              <div key={request.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <AlertCircle
                    className={`h-5 w-5 ${
                      request.status === "completed"
                        ? "text-green-500"
                        : request.status === "in-progress"
                        ? "text-blue-500"
                        : "text-yellow-500"
                    }`}
                  />
                  <div>
                    <p className="font-medium">{request.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {request.description}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge className={getStatusColor(request.status)}>
                        {request.status}
                      </Badge>
                      <Badge className={getPriorityColor(request.priority)}>
                        {request.priority}
                      </Badge>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{request.date}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 