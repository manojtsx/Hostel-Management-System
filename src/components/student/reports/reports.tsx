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
import {
  BarChart,
  LineChart,
  PieChart,
  Download,
  Filter,
  Calendar,
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface AttendanceRecord {
  date: string
  status: "present" | "absent" | "late"
  reason?: string
}

interface PaymentRecord {
  date: string
  amount: number
  type: string
  status: "paid" | "pending" | "overdue"
}

interface MaintenanceRecord {
  date: string
  type: string
  status: "completed" | "pending" | "in-progress"
  cost: number
}

export function StudentReports() {
  const [timeRange, setTimeRange] = useState("month")
  const [selectedReport, setSelectedReport] = useState("attendance")

  const attendanceData: AttendanceRecord[] = [
    {
      date: "2024-03-01",
      status: "present",
    },
    {
      date: "2024-03-02",
      status: "late",
      reason: "Traffic delay",
    },
    {
      date: "2024-03-03",
      status: "absent",
      reason: "Medical leave",
    },
    // Add more records...
  ]

  const paymentData: PaymentRecord[] = [
    {
      date: "2024-03-01",
      amount: 5000,
      type: "Monthly Rent",
      status: "paid",
    },
    {
      date: "2024-03-15",
      amount: 2000,
      type: "Meal Plan",
      status: "pending",
    },
    // Add more records...
  ]

  const maintenanceData: MaintenanceRecord[] = [
    {
      date: "2024-03-05",
      type: "Room Cleaning",
      status: "completed",
      cost: 0,
    },
    {
      date: "2024-03-10",
      type: "AC Repair",
      status: "in-progress",
      cost: 1500,
    },
    // Add more records...
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "present":
      case "paid":
      case "completed":
        return "bg-green-500"
      case "late":
      case "pending":
      case "in-progress":
        return "bg-yellow-500"
      case "absent":
      case "overdue":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const downloadReport = () => {
    // Implement report download functionality
    console.log("Downloading report...")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Reports</h1>
        <p className="text-muted-foreground">
          View your hostel-related reports and analytics
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Select value={selectedReport} onValueChange={setSelectedReport}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select report type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="attendance">Attendance</SelectItem>
              <SelectItem value="payments">Payments</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
            </SelectContent>
          </Select>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Last Week</SelectItem>
              <SelectItem value="month">Last Month</SelectItem>
              <SelectItem value="quarter">Last Quarter</SelectItem>
              <SelectItem value="year">Last Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={downloadReport}>
          <Download className="mr-2 h-4 w-4" />
          Download Report
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Attendance Summary</CardTitle>
            <CardDescription>Your attendance records</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {attendanceData.map((record) => (
                <div
                  key={record.date}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div>
                    <p className="font-medium">
                      {new Date(record.date).toLocaleDateString()}
                    </p>
                    {record.reason && (
                      <p className="text-sm text-muted-foreground">
                        {record.reason}
                      </p>
                    )}
                  </div>
                  <div
                    className={`rounded-full px-3 py-1 text-xs font-medium text-white ${getStatusColor(
                      record.status
                    )}`}
                  >
                    {record.status}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
            <CardDescription>Your payment records</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {paymentData.map((record) => (
                <div
                  key={record.date}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div>
                    <p className="font-medium">
                      {new Date(record.date).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {record.type}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <p className="font-medium">₹{record.amount}</p>
                    <div
                      className={`rounded-full px-3 py-1 text-xs font-medium text-white ${getStatusColor(
                        record.status
                      )}`}
                    >
                      {record.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Maintenance Records</CardTitle>
            <CardDescription>Your maintenance history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {maintenanceData.map((record) => (
                <div
                  key={record.date}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div>
                    <p className="font-medium">
                      {new Date(record.date).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {record.type}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    {record.cost > 0 && (
                      <p className="font-medium">₹{record.cost}</p>
                    )}
                    <div
                      className={`rounded-full px-3 py-1 text-xs font-medium text-white ${getStatusColor(
                        record.status
                      )}`}
                    >
                      {record.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Analytics</CardTitle>
            <CardDescription>Visual representation of your data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid h-[300px] place-items-center rounded-lg border p-4">
              <div className="flex items-center space-x-4 text-muted-foreground">
                <BarChart className="h-8 w-8" />
                <span>Attendance Chart</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 