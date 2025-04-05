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
import { Search, Check, X, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

interface Request {
  id: number
  hostelName: string
  adminName: string
  email: string
  status: "Pending" | "Approved" | "Rejected"
  date: string
}

export default function RequestPage() {
  const [requests, setRequests] = useState<Request[]>([
    {
      id: 1,
      hostelName: "Sunrise Residency",
      adminName: "John Doe",
      email: "john@example.com",
      status: "Pending",
      date: "2024-04-01",
    },
    {
      id: 2,
      hostelName: "Green Valley Hostel",
      adminName: "Jane Smith",
      email: "jane@example.com",
      status: "Pending",
      date: "2024-04-02",
    },
  ])

  const [searchQuery, setSearchQuery] = useState("")

  const handleApprove = (id: number) => {
    setRequests(
      requests.map((request) =>
        request.id === id ? { ...request, status: "Approved" } : request
      )
    )
  }

  const handleReject = (id: number) => {
    setRequests(
      requests.map((request) =>
        request.id === id ? { ...request, status: "Rejected" } : request
      )
    )
  }

  const filteredRequests = requests.filter(
    (request) =>
      request.hostelName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.adminName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getStatusBadge = (status: Request["status"]) => {
    switch (status) {
      case "Pending":
        return (
          <Badge variant="secondary">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        )
      case "Approved":
        return (
          <Badge variant="default">
            <Check className="h-3 w-3 mr-1" />
            Approved
          </Badge>
        )
      case "Rejected":
        return (
          <Badge variant="destructive">
            <X className="h-3 w-3 mr-1" />
            Rejected
          </Badge>
        )
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold">Requests & Approvals</h2>
        <p className="text-muted-foreground">
          Manage hostel listing requests from admins
        </p>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search requests..."
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
              <TableHead>Hostel Name</TableHead>
              <TableHead>Admin Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRequests.map((request) => (
              <TableRow key={request.id}>
                <TableCell className="font-medium">{request.hostelName}</TableCell>
                <TableCell>{request.adminName}</TableCell>
                <TableCell>{request.email}</TableCell>
                <TableCell>{getStatusBadge(request.status)}</TableCell>
                <TableCell>{request.date}</TableCell>
                <TableCell className="text-right">
                  {request.status === "Pending" && (
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleReject(request.id)}
                      >
                        <X className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => handleApprove(request.id)}
                      >
                        <Check className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
} 