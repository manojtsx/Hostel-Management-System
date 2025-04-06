"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Plus, Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight, MoreVertical } from "lucide-react"
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
import { useState } from "react"

interface Event {
  id: number
  title: string
  date: string
  time: string
  type: "Meeting" | "Maintenance" | "Event"
  location: string
  description: string
}

export function CalendarManagement() {
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: "Hostel Meeting",
      date: "2024-03-15",
      time: "14:00",
      type: "Meeting",
      location: "Common Room",
      description: "Monthly hostel meeting for all residents",
    },
    {
      id: 2,
      title: "Maintenance Day",
      date: "2024-03-20",
      time: "09:00",
      type: "Maintenance",
      location: "All Rooms",
      description: "Scheduled maintenance for all rooms",
    },
    {
      id: 3,
      title: "Cultural Night",
      date: "2024-03-25",
      time: "18:00",
      type: "Event",
      location: "Hostel Grounds",
      description: "Annual cultural night celebration",
    },
  ])

  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [isAddEventDialogOpen, setIsAddEventDialogOpen] = useState(false)
  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    title: "",
    date: "",
    time: "",
    type: "Meeting",
    location: "",
    description: "",
  })

  const getEventTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "meeting":
        return "bg-blue-500"
      case "maintenance":
        return "bg-yellow-500"
      case "event":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.date || !newEvent.time || !newEvent.location) return

    const event: Event = {
      id: events.length + 1,
      title: newEvent.title,
      date: newEvent.date,
      time: newEvent.time,
      type: newEvent.type as Event["type"],
      location: newEvent.location,
      description: newEvent.description || "",
    }

    setEvents([...events, event])
    setNewEvent({
      title: "",
      date: "",
      time: "",
      type: "Meeting",
      location: "",
      description: "",
    })
    setIsAddEventDialogOpen(false)
  }

  const handleDeleteEvent = (eventId: number) => {
    setEvents(events.filter(event => event.id !== eventId))
  }

  const handleEditEvent = (eventId: number, updates: Partial<Event>) => {
    setEvents(events.map(event => 
      event.id === eventId ? { ...event, ...updates } : event
    ))
  }

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDay = firstDay.getDay()

    return { daysInMonth, startingDay }
  }

  const getMonthName = (date: Date) => {
    return date.toLocaleString('default', { month: 'long', year: 'numeric' })
  }

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const handleDateClick = (date: Date) => {
    setSelectedDate(date)
    setNewEvent(prev => ({
      ...prev,
      date: date.toISOString().split('T')[0]
    }))
    setIsAddEventDialogOpen(true)
  }

  const getEventsForDate = (date: Date) => {
    return events.filter(event => event.date === date.toISOString().split('T')[0])
  }

  const { daysInMonth, startingDay } = getDaysInMonth(currentDate)
  const days = Array.from({ length: 42 }, (_, i) => {
    const dayNumber = i - startingDay + 1
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), dayNumber)
    return {
      dayNumber,
      date,
      isCurrentMonth: dayNumber > 0 && dayNumber <= daysInMonth,
      events: getEventsForDate(date)
    }
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Calendar</h1>
          <p className="text-muted-foreground">
            Manage events and schedules
          </p>
        </div>
        <Dialog open={isAddEventDialogOpen} onOpenChange={setIsAddEventDialogOpen}>
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
                Fill in the details to add a new event
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Date
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="time" className="text-right">
                  Time
                </Label>
                <Input
                  id="time"
                  type="time"
                  value={newEvent.time}
                  onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Type
                </Label>
                <Select
                  value={newEvent.type}
                  onValueChange={(value) => setNewEvent({ ...newEvent, type: value as Event["type"] })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Meeting">Meeting</SelectItem>
                    <SelectItem value="Maintenance">Maintenance</SelectItem>
                    <SelectItem value="Event">Event</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="location" className="text-right">
                  Location
                </Label>
                <Input
                  id="location"
                  value={newEvent.location}
                  onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Input
                  id="description"
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddEventDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddEvent}>Add Event</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Calendar View */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{getMonthName(currentDate)}</CardTitle>
              <div className="flex space-x-2">
                <Button variant="outline" size="icon" onClick={handlePrevMonth}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={handleNextMonth}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <CardDescription>
              Click on a date to add an event
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2">
              {/* Calendar Header */}
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div
                  key={day}
                  className="text-center text-sm font-medium text-muted-foreground"
                >
                  {day}
                </div>
              ))}
              {/* Calendar Days */}
              {days.map(({ dayNumber, date, isCurrentMonth, events }, index) => (
                <div
                  key={index}
                  onClick={() => isCurrentMonth && handleDateClick(date)}
                  className={`aspect-square rounded-md border p-1 text-center cursor-pointer ${
                    isCurrentMonth ? "hover:bg-accent" : "text-muted-foreground"
                  } ${events.length > 0 ? "bg-blue-50" : ""}`}
                >
                  {isCurrentMonth && dayNumber}
                  {events.length > 0 && (
                    <div className="mt-1 flex justify-center space-x-1">
                      {events.map(event => (
                        <div
                          key={event.id}
                          className={`h-1 w-1 rounded-full ${getEventTypeColor(event.type)}`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>
              View and manage upcoming events
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="flex items-start space-x-4 rounded-lg border p-4"
                >
                  <div className="flex-shrink-0">
                    <CalendarIcon className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{event.title}</h3>
                      <div className="flex items-center space-x-2">
                        <Badge className={getEventTypeColor(event.type)}>
                          {event.type}
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
                            <DropdownMenuItem onClick={() => handleEditEvent(event.id, { type: "Meeting" })}>
                              Change to Meeting
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEditEvent(event.id, { type: "Maintenance" })}>
                              Change to Maintenance
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEditEvent(event.id, { type: "Event" })}>
                              Change to Event
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => handleDeleteEvent(event.id)}
                            >
                              Delete Event
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{event.time}</span>
                      <span>•</span>
                      <span>{event.date}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {event.location}
                    </p>
                    <p className="text-sm">{event.description}</p>
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