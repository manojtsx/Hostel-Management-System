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
import { Calendar as CalendarIcon, Plus, X } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

interface Event {
  id: string
  title: string
  date: Date
  type: "inspection" | "meeting" | "maintenance" | "personal"
  description: string
  location: string
  isPersonal: boolean
}

export function StudentCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      title: "Room Inspection",
      date: new Date(2024, 3, 15),
      type: "inspection",
      description: "Monthly room inspection by hostel staff",
      location: "Block A",
      isPersonal: false,
    },
    {
      id: "2",
      title: "Hostel Meeting",
      date: new Date(2024, 3, 20),
      type: "meeting",
      description: "Monthly hostel meeting with all students",
      location: "Common Hall",
      isPersonal: false,
    },
    {
      id: "3",
      title: "Study Group",
      date: new Date(2024, 3, 18),
      type: "personal",
      description: "Study session with roommates",
      location: "Room 101",
      isPersonal: true,
    },
  ])

  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    title: "",
    date: new Date(),
    type: "personal",
    description: "",
    location: "",
    isPersonal: true,
  })

  const addEvent = () => {
    if (!newEvent.title || !newEvent.date) {
      toast.error("Please fill in all required fields")
      return
    }

    const event: Event = {
      id: Math.random().toString(36).substr(2, 9),
      title: newEvent.title!,
      date: newEvent.date!,
      type: newEvent.type as Event["type"],
      description: newEvent.description || "",
      location: newEvent.location || "",
      isPersonal: newEvent.isPersonal || false,
    }

    setEvents([...events, event])
    toast.success("Event added successfully")
  }

  const deleteEvent = (id: string) => {
    setEvents(events.filter((event) => event.id !== id))
    toast.success("Event deleted successfully")
  }

  const getEventColor = (type: Event["type"]) => {
    switch (type) {
      case "inspection":
        return "bg-yellow-500"
      case "meeting":
        return "bg-blue-500"
      case "maintenance":
        return "bg-red-500"
      case "personal":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Calendar</h1>
        <p className="text-muted-foreground">
          View and manage your events and schedules
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
            <CardDescription>Select a date to view events</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Events</CardTitle>
            <CardDescription>Your scheduled events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {events
                .filter((event) => {
                  if (!date) return false
                  return (
                    event.date.getDate() === date.getDate() &&
                    event.date.getMonth() === date.getMonth() &&
                    event.date.getFullYear() === date.getFullYear()
                  )
                })
                .map((event) => (
                  <div
                    key={event.id}
                    className="flex items-start justify-between rounded-lg border p-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <div
                          className={`h-2 w-2 rounded-full ${getEventColor(
                            event.type
                          )}`}
                        />
                        <h3 className="font-medium">{event.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {event.description}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Location: {event.location}
                      </p>
                    </div>
                    {event.isPersonal && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteEvent(event.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Event
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Event</DialogTitle>
            <DialogDescription>
              Create a new event in your calendar
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={newEvent.title}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, title: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="date">Date</Label>
              <Calendar
                mode="single"
                selected={newEvent.date}
                onSelect={(date) => setNewEvent({ ...newEvent, date })}
                className="rounded-md border"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="type">Type</Label>
              <Select
                value={newEvent.type}
                onValueChange={(value) =>
                  setNewEvent({ ...newEvent, type: value as Event["type"] })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select event type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="personal">Personal</SelectItem>
                  <SelectItem value="inspection">Inspection</SelectItem>
                  <SelectItem value="meeting">Meeting</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={newEvent.location}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, location: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newEvent.description}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, description: e.target.value })
                }
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={addEvent}>Add Event</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
} 