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
} from "lucide-react"

export function StudentAnnouncements() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Announcements</h1>
        <p className="text-muted-foreground">
          Stay updated with hostel news and events
        </p>
      </div>

      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-red-500" />
                <CardTitle>Important Notice</CardTitle>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon">
                  <Bookmark className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MessageSquare className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <CardDescription>Posted 2 hours ago</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Due to maintenance work, water supply will be interrupted tomorrow from 10 AM to 2 PM. Please store water accordingly.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bell className="h-5 w-5 text-blue-500" />
                <CardTitle>Hostel Meeting</CardTitle>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon">
                  <Bookmark className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MessageSquare className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <CardDescription>Posted yesterday</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-muted-foreground">
                There will be a hostel meeting this Friday at 2 PM in the common room. All students are requested to attend.
              </p>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Friday, March 15, 2024</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-yellow-500" />
                <CardTitle>Document Submission</CardTitle>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon">
                  <Bookmark className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MessageSquare className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <CardDescription>Posted 3 days ago</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Please submit your ID proof and address verification documents by this Friday. Late submissions will not be accepted.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 