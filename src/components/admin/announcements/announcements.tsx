"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Plus, Bell, MoreVertical } from "lucide-react"
import { Badge } from "@/components/ui/badge"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

interface Announcement {
  id: number
  title: string
  content: string
  type: "Maintenance" | "Event" | "Information"
  priority: "High" | "Medium" | "Low"
  date: string
  status: "Active" | "Archived"
}

export function AnnouncementsManagement() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: 1,
      title: "Hostel Maintenance Notice",
      content: "Scheduled maintenance will be conducted on March 20th. Please ensure your rooms are accessible.",
      type: "Maintenance",
      priority: "High",
      date: "2024-03-10",
      status: "Active",
    },
    {
      id: 2,
      title: "Cultural Night Registration",
      content: "Registration for the annual cultural night is now open. Please submit your entries by March 15th.",
      type: "Event",
      priority: "Medium",
      date: "2024-03-05",
      status: "Active",
    },
    {
      id: 3,
      title: "New Meal Plan Options",
      content: "New meal plan options are now available. Please check the notice board for details.",
      type: "Information",
      priority: "Low",
      date: "2024-03-01",
      status: "Active",
    },
  ])

  const [isAddAnnouncementDialogOpen, setIsAddAnnouncementDialogOpen] = useState(false)
  const [newAnnouncement, setNewAnnouncement] = useState<Partial<Announcement>>({
    title: "",
    content: "",
    type: "Information",
    priority: "Medium",
    date: new Date().toISOString().split("T")[0],
    status: "Active",
  })

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
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

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "maintenance":
        return "bg-blue-500"
      case "event":
        return "bg-purple-500"
      case "information":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const handleAddAnnouncement = () => {
    if (!newAnnouncement.title || !newAnnouncement.content) return

    const announcement: Announcement = {
      id: announcements.length + 1,
      title: newAnnouncement.title,
      content: newAnnouncement.content,
      type: newAnnouncement.type as Announcement["type"],
      priority: newAnnouncement.priority as Announcement["priority"],
      date: newAnnouncement.date || new Date().toISOString().split("T")[0],
      status: "Active",
    }

    setAnnouncements([...announcements, announcement])
    setNewAnnouncement({
      title: "",
      content: "",
      type: "Information",
      priority: "Medium",
      date: new Date().toISOString().split("T")[0],
      status: "Active",
    })
    setIsAddAnnouncementDialogOpen(false)
  }

  const handleDeleteAnnouncement = (announcementId: number) => {
    setAnnouncements(announcements.filter(announcement => announcement.id !== announcementId))
  }

  const handleEditAnnouncement = (announcementId: number, updates: Partial<Announcement>) => {
    setAnnouncements(announcements.map(announcement => 
      announcement.id === announcementId ? { ...announcement, ...updates } : announcement
    ))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Announcements</h1>
          <p className="text-muted-foreground">
            Manage hostel announcements and notices
          </p>
        </div>
        <Dialog open={isAddAnnouncementDialogOpen} onOpenChange={setIsAddAnnouncementDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Announcement
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Announcement</DialogTitle>
              <DialogDescription>
                Fill in the details to create a new announcement
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  value={newAnnouncement.title}
                  onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="content" className="text-right">
                  Content
                </Label>
                <Textarea
                  id="content"
                  value={newAnnouncement.content}
                  onChange={(e) => setNewAnnouncement({ ...newAnnouncement, content: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Type
                </Label>
                <Select
                  value={newAnnouncement.type}
                  onValueChange={(value) => setNewAnnouncement({ ...newAnnouncement, type: value as Announcement["type"] })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Maintenance">Maintenance</SelectItem>
                    <SelectItem value="Event">Event</SelectItem>
                    <SelectItem value="Information">Information</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="priority" className="text-right">
                  Priority
                </Label>
                <Select
                  value={newAnnouncement.priority}
                  onValueChange={(value) => setNewAnnouncement({ ...newAnnouncement, priority: value as Announcement["priority"] })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Date
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={newAnnouncement.date}
                  onChange={(e) => setNewAnnouncement({ ...newAnnouncement, date: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddAnnouncementDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddAnnouncement}>Create Announcement</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Announcement List</CardTitle>
          <CardDescription>
            View and manage all announcements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {announcements.map((announcement) => (
              <div
                key={announcement.id}
                className="flex items-start space-x-4 rounded-lg border p-4"
              >
                <div className="flex-shrink-0">
                  <Bell className="h-6 w-6 text-muted-foreground" />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{announcement.title}</h3>
                    <div className="flex items-center space-x-2">
                      <Badge className={getTypeColor(announcement.type)}>
                        {announcement.type}
                      </Badge>
                      <Badge className={getPriorityColor(announcement.priority)}>
                        {announcement.priority}
                      </Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleEditAnnouncement(announcement.id, { priority: "High" })}>
                            Set Priority: High
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditAnnouncement(announcement.id, { priority: "Medium" })}>
                            Set Priority: Medium
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditAnnouncement(announcement.id, { priority: "Low" })}>
                            Set Priority: Low
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleEditAnnouncement(announcement.id, { status: "Archived" })}>
                            Archive Announcement
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => handleDeleteAnnouncement(announcement.id)}
                          >
                            Delete Announcement
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {announcement.content}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-muted-foreground">
                        Posted: {announcement.date}
                      </span>
                      <Badge variant="outline">
                        {announcement.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 