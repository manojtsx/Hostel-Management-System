"use client"

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
  Calendar,
  Check,
  X,
} from "lucide-react"
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
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"
import * as XLSX from "xlsx"

interface Report {
  id: number
  title: string
  description: string
  type: "Room" | "Finance" | "Student" | "Meal" | "Inventory"
  date: string
  status: "Generated" | "Pending" | "Failed"
  icon: any
}

interface ReportData {
  students: any[]
  rooms: any[]
  finances: any[]
  meals: any[]
  inventory: any[]
}

export function ReportsManagement() {
  const [reports, setReports] = useState<Report[]>([
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
  ])

  const [isGenerateDialogOpen, setIsGenerateDialogOpen] = useState(false)
  const [selectedReports, setSelectedReports] = useState<Record<string, boolean>>({
    students: false,
    rooms: false,
    finances: false,
    meals: false,
    inventory: false,
  })
  const [dateRange, setDateRange] = useState({
    start: "",
    end: "",
  })
  const [reportFormat, setReportFormat] = useState<"excel" | "pdf">("excel")
  const [isGenerating, setIsGenerating] = useState(false)

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

  const handleGenerateReport = async () => {
    setIsGenerating(true)
    try {
      // Simulate API call to fetch report data
      const reportData: ReportData = {
        students: [
          { id: 1, name: "John Doe", room: "101", status: "Active" },
          { id: 2, name: "Jane Smith", room: "102", status: "Active" },
        ],
        rooms: [
          { id: 1, number: "101", capacity: 2, occupancy: 2 },
          { id: 2, number: "102", capacity: 2, occupancy: 1 },
        ],
        finances: [
          { id: 1, type: "Income", amount: 5000, date: "2024-03-01" },
          { id: 2, type: "Expense", amount: 2000, date: "2024-03-01" },
        ],
        meals: [
          { id: 1, plan: "Standard", users: 50, revenue: 25000 },
          { id: 2, plan: "Premium", users: 30, revenue: 30000 },
        ],
        inventory: [
          { id: 1, name: "Bed Sheets", quantity: 150, status: "In Stock" },
          { id: 2, name: "Study Tables", quantity: 8, status: "Low Stock" },
        ],
      }

      if (reportFormat === "excel") {
        const workbook = XLSX.utils.book_new()

        if (selectedReports.students) {
          const studentSheet = XLSX.utils.json_to_sheet(reportData.students)
          XLSX.utils.book_append_sheet(workbook, studentSheet, "Students")
        }

        if (selectedReports.rooms) {
          const roomSheet = XLSX.utils.json_to_sheet(reportData.rooms)
          XLSX.utils.book_append_sheet(workbook, roomSheet, "Rooms")
        }

        if (selectedReports.finances) {
          const financeSheet = XLSX.utils.json_to_sheet(reportData.finances)
          XLSX.utils.book_append_sheet(workbook, financeSheet, "Finances")
        }

        if (selectedReports.meals) {
          const mealSheet = XLSX.utils.json_to_sheet(reportData.meals)
          XLSX.utils.book_append_sheet(workbook, mealSheet, "Meals")
        }

        if (selectedReports.inventory) {
          const inventorySheet = XLSX.utils.json_to_sheet(reportData.inventory)
          XLSX.utils.book_append_sheet(workbook, inventorySheet, "Inventory")
        }

        XLSX.writeFile(workbook, `hostel_report_${new Date().toISOString().split("T")[0]}.xlsx`)
      } else {
        // Handle PDF generation
        console.log("PDF generation not implemented yet")
      }

      // Add new report to the list
      const newReport: Report = {
        id: reports.length + 1,
        title: "Custom Report",
        description: `Generated report for ${dateRange.start} to ${dateRange.end}`,
        type: "Finance",
        date: new Date().toISOString().split("T")[0],
        status: "Generated",
        icon: FileText,
      }

      setReports([...reports, newReport])
      setIsGenerateDialogOpen(false)
    } catch (error) {
      console.error("Error generating report:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleDownloadReport = (report: Report) => {
    // Simulate report download
    console.log(`Downloading report: ${report.title}`)
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
        <Dialog open={isGenerateDialogOpen} onOpenChange={setIsGenerateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <FileText className="mr-2 h-4 w-4" />
              Generate Report
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Generate Custom Report</DialogTitle>
              <DialogDescription>
                Select the reports you want to generate and specify the date range
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-4">
                <Label>Select Reports</Label>
                <div className="grid gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="students"
                      checked={selectedReports.students}
                      onCheckedChange={(checked) =>
                        setSelectedReports({ ...selectedReports, students: checked as boolean })
                      }
                    />
                    <Label htmlFor="students">Student Report</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="rooms"
                      checked={selectedReports.rooms}
                      onCheckedChange={(checked) =>
                        setSelectedReports({ ...selectedReports, rooms: checked as boolean })
                      }
                    />
                    <Label htmlFor="rooms">Room Report</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="finances"
                      checked={selectedReports.finances}
                      onCheckedChange={(checked) =>
                        setSelectedReports({ ...selectedReports, finances: checked as boolean })
                      }
                    />
                    <Label htmlFor="finances">Financial Report</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="meals"
                      checked={selectedReports.meals}
                      onCheckedChange={(checked) =>
                        setSelectedReports({ ...selectedReports, meals: checked as boolean })
                      }
                    />
                    <Label htmlFor="meals">Meal Plan Report</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="inventory"
                      checked={selectedReports.inventory}
                      onCheckedChange={(checked) =>
                        setSelectedReports({ ...selectedReports, inventory: checked as boolean })
                      }
                    />
                    <Label htmlFor="inventory">Inventory Report</Label>
                  </div>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={dateRange.start}
                      onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={dateRange.end}
                      onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Report Format</Label>
                <Select value={reportFormat} onValueChange={(value: "excel" | "pdf") => setReportFormat(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="excel">Excel (.xlsx)</SelectItem>
                    <SelectItem value="pdf">PDF (.pdf)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsGenerateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleGenerateReport} disabled={isGenerating}>
                {isGenerating ? "Generating..." : "Generate Report"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
                  <Button
                    variant="outline"
                    className="w-[48%]"
                    onClick={() => handleDownloadReport(report)}
                  >
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
    </div>
  )
} 