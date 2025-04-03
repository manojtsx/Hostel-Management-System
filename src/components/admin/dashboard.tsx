import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BedDouble,
  Users,
  Bell,
  Utensils,
} from "lucide-react"

export function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your hostel management
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Rooms</CardTitle>
            <BedDouble className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">50</div>
            <p className="text-xs text-muted-foreground">
              +2 from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">200</div>
            <p className="text-xs text-muted-foreground">
              +15 from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Announcements</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              +1 from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Meal Plans</CardTitle>
            <Utensils className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              Active plans
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <div>
                <p className="text-sm font-medium">New student checked in</p>
                <p className="text-sm text-muted-foreground">
                  John Doe checked into Room 101
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="h-2 w-2 rounded-full bg-blue-500" />
              <div>
                <p className="text-sm font-medium">New announcement posted</p>
                <p className="text-sm text-muted-foreground">
                  Maintenance scheduled for next week
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="h-2 w-2 rounded-full bg-yellow-500" />
              <div>
                <p className="text-sm font-medium">Meal plan updated</p>
                <p className="text-sm text-muted-foreground">
                  New menu items added to breakfast
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Room Status */}
      <Card>
        <CardHeader>
          <CardTitle>Room Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 border rounded-md">
              <div className="text-2xl font-bold">40</div>
              <p className="text-sm text-muted-foreground">Occupied Rooms</p>
            </div>
            <div className="p-4 border rounded-md">
              <div className="text-2xl font-bold">8</div>
              <p className="text-sm text-muted-foreground">Available Rooms</p>
            </div>
            <div className="p-4 border rounded-md">
              <div className="text-2xl font-bold">2</div>
              <p className="text-sm text-muted-foreground">Under Maintenance</p>
            </div>
            <div className="p-4 border rounded-md">
              <div className="text-2xl font-bold">80%</div>
              <p className="text-sm text-muted-foreground">Occupancy Rate</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 