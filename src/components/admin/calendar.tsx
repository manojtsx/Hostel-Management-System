import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Plus, Calendar as CalendarIcon, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function CalendarManagement() {
  // Sample data - replace with actual data from your backend
  const events = [
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
  ]

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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Calendar</h1>
          <p className="text-muted-foreground">
            Manage events and schedules
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Event
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
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
                      <Badge className={getEventTypeColor(event.type)}>
                        {event.type}
                      </Badge>
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

        {/* Calendar View */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly View</CardTitle>
            <CardDescription>
              Calendar overview for the current month
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
              {Array.from({ length: 35 }, (_, i) => {
                const day = i + 1
                const hasEvent = events.some(
                  (event) => event.date === `2024-03-${day.toString().padStart(2, "0")}`
                )
                return (
                  <div
                    key={day}
                    className={`aspect-square rounded-md border p-1 text-center ${
                      hasEvent ? "bg-blue-50" : ""
                    }`}
                  >
                    {day}
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 