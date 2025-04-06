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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { MoreHorizontal, Plus, User, Calendar, Clock, CreditCard } from "lucide-react"
import { toast } from "sonner"

interface TemporaryGuest {
  id: string
  name: string
  email: string
  phone: string
  room: string
  checkInDate: string
  checkOutDate: string
  duration: number
  purpose: string
  status: "active" | "completed" | "cancelled"
  paymentStatus: "paid" | "pending" | "refunded"
  amount: number
}

export function TemporaryGuestsManagement() {
  const [guests, setGuests] = useState<TemporaryGuest[]>([
    {
      id: "TG001",
      name: "John Smith",
      email: "john@example.com",
      phone: "+1234567890",
      room: "101",
      checkInDate: "2024-03-15",
      checkOutDate: "2024-03-17",
      duration: 2,
      purpose: "Business Trip",
      status: "active",
      paymentStatus: "paid",
      amount: 200,
    },
    {
      id: "TG002",
      name: "Sarah Johnson",
      email: "sarah@example.com",
      phone: "+1987654321",
      room: "102",
      checkInDate: "2024-03-16",
      checkOutDate: "2024-03-18",
      duration: 2,
      purpose: "Tourism",
      status: "active",
      paymentStatus: "pending",
      amount: 200,
    },
  ])

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newGuest, setNewGuest] = useState<Partial<TemporaryGuest>>({
    status: "active",
    paymentStatus: "pending",
  })

  const handleAddGuest = () => {
    if (!newGuest.name || !newGuest.email || !newGuest.phone || !newGuest.room || 
        !newGuest.checkInDate || !newGuest.checkOutDate || !newGuest.purpose) {
      toast.error("Please fill in all required fields")
      return
    }

    const duration = Math.ceil(
      (new Date(newGuest.checkOutDate!).getTime() - new Date(newGuest.checkInDate!).getTime()) / (1000 * 60 * 60 * 24)
    )

    const guest: TemporaryGuest = {
      id: `TG${String(guests.length + 1).padStart(3, "0")}`,
      name: newGuest.name!,
      email: newGuest.email!,
      phone: newGuest.phone!,
      room: newGuest.room!,
      checkInDate: newGuest.checkInDate!,
      checkOutDate: newGuest.checkOutDate!,
      duration,
      purpose: newGuest.purpose!,
      status: "active",
      paymentStatus: "pending",
      amount: duration * 100, // Assuming $100 per day
    }

    setGuests([...guests, guest])
    setIsAddDialogOpen(false)
    setNewGuest({ status: "active", paymentStatus: "pending" })
    toast.success("Guest added successfully")
  }

  const handleUpdateStatus = (id: string, status: TemporaryGuest["status"]) => {
    setGuests(guests.map(guest => 
      guest.id === id ? { ...guest, status } : guest
    ))
    toast.success("Status updated successfully")
  }

  const handleUpdatePaymentStatus = (id: string, paymentStatus: TemporaryGuest["paymentStatus"]) => {
    setGuests(guests.map(guest => 
      guest.id === id ? { ...guest, paymentStatus } : guest
    ))
    toast.success("Payment status updated successfully")
  }

  const handleDeleteGuest = (id: string) => {
    setGuests(guests.filter(guest => guest.id !== id))
    toast.success("Guest removed successfully")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "completed":
        return "bg-blue-500"
      case "cancelled":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-500"
      case "pending":
        return "bg-yellow-500"
      case "refunded":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Temporary Guests</h1>
          <p className="text-muted-foreground">
            Manage temporary guests and their bookings
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Guest
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Temporary Guest</DialogTitle>
              <DialogDescription>
                Enter the guest details and booking information
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={newGuest.name || ""}
                    onChange={(e) => setNewGuest({ ...newGuest, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newGuest.email || ""}
                    onChange={(e) => setNewGuest({ ...newGuest, email: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={newGuest.phone || ""}
                    onChange={(e) => setNewGuest({ ...newGuest, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="room">Room</Label>
                  <Select
                    value={newGuest.room}
                    onValueChange={(value) => setNewGuest({ ...newGuest, room: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select room" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="101">Room 101</SelectItem>
                      <SelectItem value="102">Room 102</SelectItem>
                      <SelectItem value="103">Room 103</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="checkInDate">Check-in Date</Label>
                  <Input
                    id="checkInDate"
                    type="date"
                    value={newGuest.checkInDate || ""}
                    onChange={(e) => setNewGuest({ ...newGuest, checkInDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="checkOutDate">Check-out Date</Label>
                  <Input
                    id="checkOutDate"
                    type="date"
                    value={newGuest.checkOutDate || ""}
                    onChange={(e) => setNewGuest({ ...newGuest, checkOutDate: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="purpose">Purpose of Stay</Label>
                <Select
                  value={newGuest.purpose}
                  onValueChange={(value) => setNewGuest({ ...newGuest, purpose: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select purpose" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Business Trip">Business Trip</SelectItem>
                    <SelectItem value="Tourism">Tourism</SelectItem>
                    <SelectItem value="Family Visit">Family Visit</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddGuest}>Add Guest</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Guest List</CardTitle>
          <CardDescription>
            View and manage temporary guests
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Room</TableHead>
                <TableHead>Check-in</TableHead>
                <TableHead>Check-out</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Purpose</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {guests.map((guest) => (
                <TableRow key={guest.id}>
                  <TableCell>{guest.id}</TableCell>
                  <TableCell>
                    <div className="font-medium">{guest.name}</div>
                    <div className="text-sm text-muted-foreground">{guest.email}</div>
                  </TableCell>
                  <TableCell>{guest.room}</TableCell>
                  <TableCell>{guest.checkInDate}</TableCell>
                  <TableCell>{guest.checkOutDate}</TableCell>
                  <TableCell>{guest.duration} days</TableCell>
                  <TableCell>{guest.purpose}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(guest.status)}>
                      {guest.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPaymentStatusColor(guest.paymentStatus)}>
                      {guest.paymentStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => handleUpdateStatus(guest.id, "active")}
                        >
                          <User className="mr-2 h-4 w-4" />
                          Set Active
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleUpdateStatus(guest.id, "completed")}
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          Complete Stay
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleUpdateStatus(guest.id, "cancelled")}
                        >
                          <Clock className="mr-2 h-4 w-4" />
                          Cancel Stay
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleUpdatePaymentStatus(guest.id, "paid")}
                        >
                          <CreditCard className="mr-2 h-4 w-4" />
                          Mark as Paid
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteGuest(guest.id)}
                          className="text-red-600"
                        >
                          <Clock className="mr-2 h-4 w-4" />
                          Remove Guest
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
} 