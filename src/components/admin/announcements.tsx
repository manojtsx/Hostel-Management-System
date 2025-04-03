import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Plus, Bell, Edit2, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function AnnouncementsManagement() {
  // Sample data - replace with actual data from your backend
  const announcements = [
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
  ]

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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Announcements</h1>
          <p className="text-muted-foreground">
            Manage hostel announcements and notices
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Announcement
        </Button>
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
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="icon">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
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