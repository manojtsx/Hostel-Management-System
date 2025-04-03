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
} from "lucide-react"

export function StudentRoom() {
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
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src="/avatars/01.png" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">John Doe</p>
                <p className="text-sm text-muted-foreground">
                  Computer Science
                </p>
              </div>
              <Button variant="ghost" size="icon">
                <MessageSquare className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src="/avatars/02.png" />
                <AvatarFallback>AS</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">Alice Smith</p>
                <p className="text-sm text-muted-foreground">
                  Electrical Engineering
                </p>
              </div>
              <Button variant="ghost" size="icon">
                <MessageSquare className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Room Maintenance</CardTitle>
          <CardDescription>Report issues and view maintenance history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <AlertCircle className="h-5 w-5 text-yellow-500" />
                <div>
                  <p className="font-medium">AC Not Working</p>
                  <p className="text-sm text-muted-foreground">
                    Reported 2 days ago
                  </p>
                </div>
              </div>
              <Button variant="outline">View Details</Button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <AlertCircle className="h-5 w-5 text-green-500" />
                <div>
                  <p className="font-medium">Leaking Tap</p>
                  <p className="text-sm text-muted-foreground">
                    Fixed yesterday
                  </p>
                </div>
              </div>
              <Button variant="outline">View Details</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 