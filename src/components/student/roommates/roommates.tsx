"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import {
  Mail,
  Phone,
  MessageSquare,
  UserPlus,
  X,
  Clock,
  Calendar,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
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
  email: string
  phone: string
  course: string
  year: string
  joinDate: string
  status: "active" | "inactive"
  preferences: {
    wakeUpTime: string
    sleepTime: string
    studyTime: string
    music: boolean
    visitors: boolean
  }
}

interface Message {
  id: string
  from: string
  to: string
  content: string
  timestamp: string
  isRead: boolean
}

export function StudentRoommates() {
  const [roommates, setRoommates] = useState<Roommate[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      phone: "+1234567890",
      course: "Computer Science",
      year: "3rd Year",
      joinDate: "2023-08-15",
      status: "active",
      preferences: {
        wakeUpTime: "07:00",
        sleepTime: "23:00",
        studyTime: "20:00-22:00",
        music: true,
        visitors: true,
      },
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+0987654321",
      course: "Electrical Engineering",
      year: "2nd Year",
      joinDate: "2023-08-15",
      status: "active",
      preferences: {
        wakeUpTime: "06:30",
        sleepTime: "22:30",
        studyTime: "19:00-21:00",
        music: false,
        visitors: false,
      },
    },
  ])

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      from: "John Doe",
      to: "You",
      content: "Hey, can we discuss the room cleaning schedule?",
      timestamp: "2024-03-15T10:30:00",
      isRead: true,
    },
    {
      id: "2",
      from: "You",
      to: "Jane Smith",
      content: "Sure, let's meet tomorrow at 5 PM",
      timestamp: "2024-03-15T11:00:00",
      isRead: true,
    },
  ])

  const [newMessage, setNewMessage] = useState({
    to: "",
    content: "",
  })

  const sendMessage = () => {
    if (!newMessage.to || !newMessage.content) {
      toast.error("Please fill in all fields")
      return
    }

    const message: Message = {
      id: Math.random().toString(36).substr(2, 9),
      from: "You",
      to: newMessage.to,
      content: newMessage.content,
      timestamp: new Date().toISOString(),
      isRead: true,
    }

    setMessages([...messages, message])
    setNewMessage({ to: "", content: "" })
    toast.success("Message sent successfully")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Roommates</h1>
        <p className="text-muted-foreground">
          View and communicate with your roommates
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Roommate Details</CardTitle>
            <CardDescription>Information about your roommates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {roommates.map((roommate) => (
                <div
                  key={roommate.id}
                  className="rounded-lg border p-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{roommate.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {roommate.course} - {roommate.year}
                      </p>
                    </div>
                    <Badge
                      className={
                        roommate.status === "active"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }
                    >
                      {roommate.status}
                    </Badge>
                  </div>
                  <div className="mt-4 grid gap-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{roommate.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{roommate.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Joined: {roommate.joinDate}</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h4 className="text-sm font-medium">Preferences</h4>
                    <div className="mt-2 grid gap-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span>Wake Up Time</span>
                        <span>{roommate.preferences.wakeUpTime}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Sleep Time</span>
                        <span>{roommate.preferences.sleepTime}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Study Time</span>
                        <span>{roommate.preferences.studyTime}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Music</span>
                        <span>
                          {roommate.preferences.music ? "Allowed" : "Not Allowed"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Visitors</span>
                        <span>
                          {roommate.preferences.visitors
                            ? "Allowed"
                            : "Not Allowed"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Messages</CardTitle>
            <CardDescription>Communicate with your roommates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="to">To</Label>
                <Select
                  value={newMessage.to}
                  onValueChange={(value) =>
                    setNewMessage({ ...newMessage, to: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select roommate" />
                  </SelectTrigger>
                  <SelectContent>
                    {roommates.map((roommate) => (
                      <SelectItem key={roommate.id} value={roommate.name}>
                        {roommate.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Message</Label>
                <Textarea
                  id="content"
                  value={newMessage.content}
                  onChange={(e) =>
                    setNewMessage({ ...newMessage, content: e.target.value })
                  }
                  placeholder="Type your message here..."
                />
              </div>
              <Button onClick={sendMessage}>
                <MessageSquare className="mr-2 h-4 w-4" />
                Send Message
              </Button>

              <div className="mt-6 space-y-4">
                <h3 className="font-medium">Recent Messages</h3>
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className="rounded-lg border p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">
                          {message.from} → {message.to}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {message.content}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>
                          {new Date(message.timestamp).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 