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
import { useState, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { getEvents, getEventsByDateRange } from "./CalendarServer"
import useCalendarMutations from "./CalendarMutations"
import { useDebounce } from "@/utils/debounce/usedebounce"
import { EventType } from "@prisma/client"
import { Pagination } from "@/components/pagination"

interface EventFormData {
  title: string
  date: Date
  time: string
  type: EventType
  location: string
  description: string
}

interface Event extends Omit<EventFormData, 'time' | 'location' | 'description'> {
  eventId: string
  time: string | null
  location: string | null
  description: string | null
  id?: number
  createdAt?: Date
  updatedAt?: Date
  academicYear?: number
  hostelId?: string
  authId?: string
}

const getEventTypeColor = (type: string) => {
  switch (type.toLowerCase()) {
    case "party":
      return "bg-blue-500"
    case "sports":
      return "bg-yellow-500"
    case "cultural":
      return "bg-green-500"
    case "social":
      return "bg-red-500"
    case "festival":
      return "bg-purple-500"
    case "other":
      return "bg-gray-500"
    default:
      return "bg-gray-500"
  }
}

interface EventFormProps {
  event?: Event
  onSubmit: (event: EventFormData) => void
  onCancel: () => void
  mode: "add" | "edit"
}

function EventForm({ event, onSubmit, onCancel, mode }: EventFormProps) {
  const [formData, setFormData] = useState<EventFormData>({
    title: event?.title || "",
    date: event?.date || new Date(),
    time: event?.time || "12:00",
    type: event?.type || "Party",
    location: event?.location || "",
    description: event?.description || "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="title" className="text-right">
          Title
        </Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="col-span-3"
          required
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="date" className="text-right">
          Date
        </Label>
        <Input
          id="date"
          type="date"
          value={formData.date instanceof Date ? formData.date.toISOString().split('T')[0] : new Date(formData.date as string).toISOString().split('T')[0]}
          onChange={(e) => {
            const newDate = new Date(e.target.value)
            setFormData({ ...formData, date: newDate })
          }}
          className="col-span-3"
          required
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="time" className="text-right">
          Time
        </Label>
        <Input
          id="time"
          type="time"
          value={formData.time}
          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
          className="col-span-3"
          required
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="type" className="text-right">
          Type
        </Label>
        <Select
          value={formData.type}
          onValueChange={(value) => setFormData({ ...formData, type: value as EventType })}
        >
          <SelectTrigger className="col-span-3">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Party">Party</SelectItem>
            <SelectItem value="Sports">Sports</SelectItem>
            <SelectItem value="Cultural">Cultural</SelectItem>
            <SelectItem value="Social">Social</SelectItem>
            <SelectItem value="Festival">Festival</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="location" className="text-right">
          Location
        </Label>
        <Input
          id="location"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          className="col-span-3"
          required
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="description" className="text-right">
          Description
        </Label>
        <Input
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="col-span-3"
        />
      </div>
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {mode === "add" ? "Add Event" : "Update Event"}
        </Button>
      </DialogFooter>
    </form>
  )
}

function ViewEventDialog({
  event,
  onClose,
}: {
  event: Event
  onClose: () => void
}) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{event.title}</DialogTitle>
          <DialogDescription>
            <div className="flex items-center space-x-2 mt-2">
              <Badge className={getEventTypeColor(event.type)}>
                {event.type}
              </Badge>
            </div>
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium">Description</h3>
            <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
          </div>
          <div>
            <h3 className="font-medium">Location</h3>
            <p className="text-sm text-muted-foreground mt-1">{event.location}</p>
          </div>
          <div>
            <h3 className="font-medium">Date & Time</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {new Date(event.date).toLocaleDateString()} at {event.time}
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function CalendarManagement() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [isAddEventDialogOpen, setIsAddEventDialogOpen] = useState(false)
  const [isEditEventDialogOpen, setIsEditEventDialogOpen] = useState(false)
  const [isViewEventDialogOpen, setIsViewEventDialogOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [filters, setFilters] = useState({
    type: "All",
    startDate: null as Date | null,
    endDate: null as Date | null,
  })
  const debouncedSearchQuery = useDebounce(searchQuery, 500)

  const {
    createEvent,
    isCreatingEvent,
    updateEvent,
    isUpdatingEvent,
    removeEvent,
    isRemovingEvent
  } = useCalendarMutations()

  // Get the first and last day of the current month for calendar view
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)

  // Fetch events for the list view
  const { data: eventsData, isLoading } = useQuery({
    queryKey: ["events", currentPage, debouncedSearchQuery, filters],
    queryFn: () => getEvents(currentPage, pageSize, debouncedSearchQuery, filters),
  })

  // Fetch events for the calendar view
  const { data: calendarEventsData } = useQuery({
    queryKey: ["calendar-events", firstDayOfMonth, lastDayOfMonth],
    queryFn: () => getEventsByDateRange(firstDayOfMonth, lastDayOfMonth),
  })

  const handleAddEvent = async (newEvent: EventFormData) => {
    try {
      const eventData = {
        ...newEvent,
        date: newEvent.date instanceof Date ? newEvent.date.toISOString() : new Date(newEvent.date as string).toISOString()
      }
      await createEvent(JSON.stringify(eventData))
      setIsAddEventDialogOpen(false)
    } catch (error) {
      console.error('Error adding event:', error)
    }
  }

  const handleEditEvent = async (updatedEvent: EventFormData) => {
    if (selectedEvent) {
      try {
        // Ensure the date is properly formatted
        const eventDate = new Date(updatedEvent.date);
        if (isNaN(eventDate.getTime())) {
          console.error('Invalid date format');
          return;
        }

        const eventData = {
          ...updatedEvent,
          eventId: selectedEvent.eventId,
          date: eventDate.toISOString()
        }
        await updateEvent(JSON.stringify(eventData))
        setIsEditEventDialogOpen(false)
      } catch (error) {
        console.error('Error updating event:', error)
      }
    }
  }

  const handleDeleteEvent = async (eventId: string) => {
    await removeEvent(eventId)
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

  const handleDateClick = (date: Date, events: Event[]) => {
    if (events.length > 0) {
      // If there are events on this date, show the first event's details
      setSelectedEvent(events[0])
      setIsViewEventDialogOpen(true)
    } else {
      // If no events, open the add event dialog
      setSelectedDate(date)
      setIsAddEventDialogOpen(true)
    }
  }

  const getEventsForDate = (date: Date) => {
    if (!calendarEventsData?.data) return []
    
    return calendarEventsData.data.filter(event => {
      const eventDate = new Date(event.date)
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      )
    })
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
            <EventForm
              event={selectedDate ? { ...selectedEvent, date: selectedDate } as Event : undefined}
              onSubmit={handleAddEvent}
              onCancel={() => setIsAddEventDialogOpen(false)}
              mode="add"
            />
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
              Click on a date to add an event or view existing events
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
                  onClick={() => isCurrentMonth && handleDateClick(date, events)}
                  className={`aspect-square rounded-md border p-1 text-center cursor-pointer ${
                    isCurrentMonth ? "hover:bg-accent" : "text-muted-foreground"
                  } ${events.length > 0 ? "bg-blue-50" : ""}`}
                >
                  {isCurrentMonth && dayNumber}
                  {events.length > 0 && (
                    <div className="mt-1 flex flex-col items-center space-y-1">
                      {events.map(event => (
                        <div
                          key={event.eventId}
                          className={`h-1.5 w-1.5 rounded-full ${getEventTypeColor(event.type)}`}
                          title={event.title}
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
            <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-1 items-center space-x-2">
                <Input
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-8 w-[150px] lg:w-[250px]"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Select
                  value={filters.type}
                  onValueChange={(value) => setFilters({ ...filters, type: value })}
                >
                  <SelectTrigger className="h-8 w-[130px]">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Types</SelectItem>
                    <SelectItem value="Party">Party</SelectItem>
                    <SelectItem value="Sports">Sports</SelectItem>
                    <SelectItem value="Cultural">Cultural</SelectItem>
                    <SelectItem value="Social">Social</SelectItem>
                    <SelectItem value="Festival">Festival</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              {isLoading ? (
                <div className="text-center py-4">Loading events...</div>
              ) : eventsData?.data && eventsData.data.length === 0 ? (
                <div className="text-center py-4">No events found</div>
              ) : (
                eventsData?.data?.map((event) => (
                  <div
                    key={event.eventId}
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
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedEvent(event)
                                  setIsViewEventDialogOpen(true)
                                }}
                              >
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedEvent(event)
                                  setIsEditEventDialogOpen(true)
                                }}
                              >
                                Edit Event
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => handleDeleteEvent(event.eventId)}
                              >
                                Delete Event
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        <span>•</span>
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {event.location}
                      </p>
                      <p className="text-sm line-clamp-2">{event.description}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {eventsData && eventsData.totalPages && eventsData.totalPages > 1 && (
              <div className="mt-4">
                <Pagination
                  currentPage={currentPage}
                  totalItems={eventsData.total}
                  pageSize={pageSize}
                  onPageChange={setCurrentPage}
                  onPageSizeChange={pageSize => setPageSize(pageSize)}
                />
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {isEditEventDialogOpen && selectedEvent && (
        <Dialog open={isEditEventDialogOpen} onOpenChange={setIsEditEventDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Event</DialogTitle>
              <DialogDescription>
                Update the details of the event
              </DialogDescription>
            </DialogHeader>
            <EventForm
              event={selectedEvent}
              onSubmit={handleEditEvent}
              onCancel={() => setIsEditEventDialogOpen(false)}
              mode="edit"
            />
          </DialogContent>
        </Dialog>
      )}

      {isViewEventDialogOpen && selectedEvent && (
        <ViewEventDialog
          event={selectedEvent}
          onClose={() => setIsViewEventDialogOpen(false)}
        />
      )}
    </div>
  )
} 