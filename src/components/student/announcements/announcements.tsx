"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Bell,
  AlertCircle,
  Calendar,
  MessageSquare,
  Bookmark,
  Filter,
  Search,
  Plus,
  Clock,
  User,
  Tag,
} from "lucide-react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"

interface Announcement {
  id: string
  title: string
  content: string
  type: "important" | "general" | "event" | "maintenance"
  date: string
  author: string
  tags: string[]
  isBookmarked: boolean
  isRead: boolean
  eventDate?: string
  location?: string
}

export function StudentAnnouncements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: "1",
      title: "Important Notice",
      content: "Due to maintenance work, water supply will be interrupted tomorrow from 10 AM to 2 PM. Please store water accordingly.",
      type: "important",
      date: "2024-03-15",
      author: "Hostel Management",
      tags: ["Maintenance", "Water Supply"],
      isBookmarked: false,
      isRead: false,
    },
    {
      id: "2",
      title: "Hostel Meeting",
      content: "There will be a hostel meeting this Friday at 2 PM in the common room. All students are requested to attend.",
      type: "event",
      date: "2024-03-14",
      author: "Hostel Warden",
      tags: ["Meeting", "Important"],
      isBookmarked: true,
      isRead: true,
      eventDate: "2024-03-16",
      location: "Common Room",
    },
    {
      id: "3",
      title: "Document Submission",
      content: "Please submit your ID proof and address verification documents by this Friday. Late submissions will not be accepted.",
      type: "general",
      date: "2024-03-13",
      author: "Administration",
      tags: ["Documents", "Deadline"],
      isBookmarked: false,
      isRead: true,
    },
    {
      id: "4",
      title: "WiFi Maintenance",
      content: "Scheduled maintenance for WiFi infrastructure will be performed on Saturday. Expect intermittent connectivity.",
      type: "maintenance",
      date: "2024-03-12",
      author: "IT Department",
      tags: ["WiFi", "Maintenance"],
      isBookmarked: false,
      isRead: false,
    },
  ])

  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState<string>("all")
  const [filterTag, setFilterTag] = useState<string>("all")

  const handleBookmark = (id: string) => {
    setAnnouncements(announcements.map(announcement => 
      announcement.id === id 
        ? { ...announcement, isBookmarked: !announcement.isBookmarked }
        : announcement
    ))
    toast.success("Bookmark status updated")
  }

  const handleMarkAsRead = (id: string) => {
    setAnnouncements(announcements.map(announcement => 
      announcement.id === id 
        ? { ...announcement, isRead: true }
        : announcement
    ))
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "important":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      case "event":
        return <Calendar className="h-5 w-5 text-blue-500" />
      case "maintenance":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />
      default:
        return <Bell className="h-5 w-5 text-green-500" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "important":
        return "bg-red-500"
      case "event":
        return "bg-blue-500"
      case "maintenance":
        return "bg-yellow-500"
      default:
        return "bg-green-500"
    }
  }

  const filteredAnnouncements = announcements.filter(announcement => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         announcement.content.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = filterType === "all" || announcement.type === filterType
    const matchesTag = filterTag === "all" || announcement.tags.includes(filterTag)
    return matchesSearch && matchesType && matchesTag
  })

  const allTags = Array.from(new Set(announcements.flatMap(a => a.tags)))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Announcements</h1>
        <p className="text-muted-foreground">
          Stay updated with hostel news and events
        </p>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search announcements..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="important">Important</SelectItem>
              <SelectItem value="general">General</SelectItem>
              <SelectItem value="event">Events</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterTag} onValueChange={setFilterTag}>
            <SelectTrigger className="w-[180px]">
              <Tag className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filter by tag" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tags</SelectItem>
              {allTags.map(tag => (
                <SelectItem key={tag} value={tag}>{tag}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4">
        {filteredAnnouncements.map((announcement) => (
          <Card key={announcement.id} className={!announcement.isRead ? "border-l-4 border-blue-500" : ""}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {getTypeIcon(announcement.type)}
                  <CardTitle>{announcement.title}</CardTitle>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleBookmark(announcement.id)}
                  >
                    <Bookmark
                      className={`h-4 w-4 ${
                        announcement.isBookmarked ? "fill-current" : ""
                      }`}
                    />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <User className="h-4 w-4" />
                  <span>{announcement.author}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{announcement.date}</span>
                </div>
                {announcement.eventDate && (
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{announcement.eventDate}</span>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">{announcement.content}</p>
                {announcement.location && (
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <span>Location: {announcement.location}</span>
                  </div>
                )}
                <div className="flex flex-wrap gap-2">
                  {announcement.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}