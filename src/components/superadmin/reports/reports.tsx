"use client"

import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Search, MessageSquare, Eye } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

interface Report {
  id: number
  title: string
  reporter: string
  hostel: string
  status: "Open" | "In Progress" | "Resolved"
  date: string
  priority: "Low" | "Medium" | "High"
  description: string
  replies: Reply[]
}

interface Reply {
  id: number
  user: string
  message: string
  date: string
}

export default function Reports() {
  const [reports, setReports] = useState<Report[]>([
    {
      id: 1,
      title: "Noise Complaint",
      reporter: "John Doe",
      hostel: "Sunrise Residency",
      status: "Open",
      date: "2024-04-01",
      priority: "High",
      description: "Excessive noise from room 203 during late hours.",
      replies: [
        {
          id: 1,
          user: "Admin",
          message: "We will look into this matter immediately.",
          date: "2024-04-01",
        },
      ],
    },
    {
      id: 2,
      title: "Maintenance Issue",
      reporter: "Jane Smith",
      hostel: "Green Valley Hostel",
      status: "In Progress",
      date: "2024-04-02",
      priority: "Medium",
      description: "Water leakage in bathroom of room 105.",
      replies: [],
    },
  ])

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)
  const [replyMessage, setReplyMessage] = useState("")

  const handleReply = (reportId: number) => {
    if (!replyMessage.trim()) return

    const newReply: Reply = {
      id: Date.now(),
      user: "Super Admin",
      message: replyMessage,
      date: new Date().toISOString().split("T")[0],
    }

    setReports(
      reports.map((report) =>
        report.id === reportId
          ? {
              ...report,
              replies: [...report.replies, newReply],
              status: "In Progress",
            }
          : report
      )
    )

    setReplyMessage("")
  }

  const filteredReports = reports.filter(
    (report) =>
      report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.reporter.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.hostel.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getStatusBadge = (status: Report["status"]) => {
    switch (status) {
      case "Open":
        return <Badge variant="secondary">Open</Badge>
      case "In Progress":
        return <Badge variant="default">In Progress</Badge>
      case "Resolved":
        return <Badge variant="destructive">Resolved</Badge>
    }
  }

  const getPriorityBadge = (priority: Report["priority"]) => {
    switch (priority) {
      case "Low":
        return <Badge variant="outline">Low</Badge>
      case "Medium":
        return <Badge variant="default">Medium</Badge>
      case "High":
        return <Badge variant="destructive">High</Badge>
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold">Reports & Complaints</h2>
        <p className="text-muted-foreground">
          Manage reports and complaints from students and admins
        </p>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search reports..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Reporter</TableHead>
              <TableHead>Hostel</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReports.map((report) => (
              <TableRow key={report.id}>
                <TableCell className="font-medium">{report.title}</TableCell>
                <TableCell>{report.reporter}</TableCell>
                <TableCell>{report.hostel}</TableCell>
                <TableCell>{getStatusBadge(report.status)}</TableCell>
                <TableCell>{getPriorityBadge(report.priority)}</TableCell>
                <TableCell>{report.date}</TableCell>
                <TableCell className="text-right">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedReport(report)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>{selectedReport?.title}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-medium">Reporter</p>
                            <p className="text-sm text-muted-foreground">
                              {selectedReport?.reporter}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Hostel</p>
                            <p className="text-sm text-muted-foreground">
                              {selectedReport?.hostel}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Status</p>
                            <p className="text-sm text-muted-foreground">
                              {selectedReport?.status}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Priority</p>
                            <p className="text-sm text-muted-foreground">
                              {selectedReport?.priority}
                            </p>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Description</p>
                          <p className="text-sm text-muted-foreground">
                            {selectedReport?.description}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Replies</p>
                          <div className="space-y-2">
                            {selectedReport?.replies.map((reply) => (
                              <div
                                key={reply.id}
                                className="rounded-lg border p-3"
                              >
                                <div className="flex items-center justify-between">
                                  <p className="text-sm font-medium">
                                    {reply.user}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    {reply.date}
                                  </p>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  {reply.message}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Textarea
                            placeholder="Type your reply..."
                            value={replyMessage}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setReplyMessage(e.target.value)}
                          />
                          <Button
                            onClick={() => {
                              if (selectedReport) {
                                handleReply(selectedReport.id);
                              }
                            }}
                            disabled={!replyMessage.trim()}
                          >
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Send Reply
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
} 