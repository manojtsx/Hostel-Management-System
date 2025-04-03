import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  FileText,
  Download,
  Users,
  DollarSign,
  BedDouble,
  Utensils,
  Package,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function ReportsManagement() {
  // Sample data - replace with actual data from your backend
  const reports = [
    {
      id: 1,
      title: "Occupancy Report",
      description: "Monthly room occupancy statistics",
      type: "Room",
      date: "2024-03-01",
      status: "Generated",
      icon: BedDouble,
    },
    {
      id: 2,
      title: "Financial Summary",
      description: "Monthly income and expenses",
      type: "Finance",
      date: "2024-03-01",
      status: "Generated",
      icon: DollarSign,
    },
    {
      id: 3,
      title: "Student Report",
      description: "Student statistics and demographics",
      type: "Student",
      date: "2024-03-01",
      status: "Generated",
      icon: Users,
    },
    {
      id: 4,
      title: "Meal Plan Usage",
      description: "Monthly meal plan utilization",
      type: "Meal",
      date: "2024-03-01",
      status: "Generated",
      icon: Utensils,
    },
    {
      id: 5,
      title: "Inventory Status",
      description: "Current inventory levels and usage",
      type: "Inventory",
      date: "2024-03-01",
      status: "Generated",
      icon: Package,
    },
  ]

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "room":
        return "bg-blue-500"
      case "finance":
        return "bg-green-500"
      case "student":
        return "bg-purple-500"
      case "meal":
        return "bg-yellow-500"
      case "inventory":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Reports</h1>
          <p className="text-muted-foreground">
            Generate and view hostel reports
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reports.map((report) => (
          <Card key={report.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <report.icon className="h-5 w-5 text-muted-foreground" />
                  <CardTitle className="text-lg">{report.title}</CardTitle>
                </div>
                <Badge className={getTypeColor(report.type)}>
                  {report.type}
                </Badge>
              </div>
              <CardDescription>{report.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Last Generated:</span>
                  <span>{report.date}</span>
                </div>
                <div className="flex items-center justify-between">
                  <Button variant="outline" className="w-[48%]">
                    <FileText className="mr-2 h-4 w-4" />
                    View
                  </Button>
                  <Button variant="outline" className="w-[48%]">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
                <Button className="w-full">
                  Generate New Report
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Custom Report Section */}
      <Card>
        <CardHeader>
          <CardTitle>Custom Report</CardTitle>
          <CardDescription>
            Generate a custom report by selecting specific parameters
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <Button variant="outline">
                <Users className="mr-2 h-4 w-4" />
                Student Data
              </Button>
              <Button variant="outline">
                <BedDouble className="mr-2 h-4 w-4" />
                Room Data
              </Button>
              <Button variant="outline">
                <DollarSign className="mr-2 h-4 w-4" />
                Financial Data
              </Button>
              <Button variant="outline">
                <Utensils className="mr-2 h-4 w-4" />
                Meal Plan Data
              </Button>
              <Button variant="outline">
                <Package className="mr-2 h-4 w-4" />
                Inventory Data
              </Button>
            </div>
            <Button className="w-full">
              Generate Custom Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 