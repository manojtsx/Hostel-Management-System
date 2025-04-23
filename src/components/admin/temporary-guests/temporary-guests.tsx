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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"
import { MoreHorizontal, Plus, User, Calendar, Clock, CreditCard, Mail, MapPin, FileText, Phone, LogOut, XCircle, CheckCircle } from "lucide-react"
import { toast } from "sonner"
import { useQuery } from "@tanstack/react-query"
import { getTemporaryGuests, getAvailableRooms } from "./TemporaryGuestServer"
import useTemporaryGuestMutations from "./TemporaryGuestMutations"
import { useDebounce } from "@/utils/debounce/usedebounce"
import { GuestStatus } from "@prisma/client"
import { Pagination } from "@/components/pagination"
import { Textarea } from "@/components/ui/textarea"
import { format } from "date-fns"

interface HostelRoom {
  roomId: string
  roomNumber: string
  roomType: string
  roomFloor: string
}

interface TemporaryGuest {
  guestId: string
  guestName: string
  guestEmail: string | null
  guestPhone: string
  guestAddress: string
  guestPurpose: string
  guestDocuments: string[]
  checkInDate: Date
  checkOutDate: Date
  status: GuestStatus
  roomId: string | null
  room: HostelRoom | null
}

interface TemporaryGuestFormProps {
  guest?: TemporaryGuest
  onSubmit: (guest: Partial<TemporaryGuest>) => void
  onCancel: () => void
  mode: "add" | "edit"
}

function TemporaryGuestForm({ guest, onSubmit, onCancel, mode }: TemporaryGuestFormProps) {
  const [formData, setFormData] = useState<Partial<TemporaryGuest>>(
    guest || {
      guestName: "",
      guestEmail: "",
      guestPhone: "",
      guestAddress: "",
      guestPurpose: "",
      guestDocuments: [],
      checkInDate: new Date(),
      checkOutDate: new Date(new Date().setDate(new Date().getDate() + 1)),
      roomId: null,
      status: "Pending"
    }
  )

  const { data: roomsData, isLoading: isLoadingRooms } = useQuery({
    queryKey: ["available-rooms"],
    queryFn: getAvailableRooms,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="guestName" className="text-right">
          Name
        </Label>
        <Input
          id="guestName"
          value={formData.guestName}
          onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
          className="col-span-3"
          required
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="guestEmail" className="text-right">
          Email
        </Label>
        <Input
          id="guestEmail"
          type="email"
          value={formData.guestEmail || ""}
          onChange={(e) => setFormData({ ...formData, guestEmail: e.target.value })}
          className="col-span-3"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="guestPhone" className="text-right">
          Phone
        </Label>
        <Input
          id="guestPhone"
          value={formData.guestPhone}
          onChange={(e) => setFormData({ ...formData, guestPhone: e.target.value })}
          className="col-span-3"
          required
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="guestAddress" className="text-right">
          Address
        </Label>
        <Input
          id="guestAddress"
          value={formData.guestAddress}
          onChange={(e) => setFormData({ ...formData, guestAddress: e.target.value })}
          className="col-span-3"
          required
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="guestPurpose" className="text-right">
          Purpose
        </Label>
        <Textarea
          id="guestPurpose"
          value={formData.guestPurpose}
          onChange={(e) => setFormData({ ...formData, guestPurpose: e.target.value })}
          className="col-span-3"
          required
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="checkInDate" className="text-right">
          Check-in Date
        </Label>
        <Input
          id="checkInDate"
          type="datetime-local"
          value={formData.checkInDate ? format(new Date(formData.checkInDate), "yyyy-MM-dd'T'HH:mm") : ""}
          onChange={(e) => setFormData({ ...formData, checkInDate: new Date(e.target.value) })}
          className="col-span-3"
          required
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="checkOutDate" className="text-right">
          Check-out Date
        </Label>
        <Input
          id="checkOutDate"
          type="datetime-local"
          value={formData.checkOutDate ? format(new Date(formData.checkOutDate), "yyyy-MM-dd'T'HH:mm") : ""}
          onChange={(e) => setFormData({ ...formData, checkOutDate: new Date(e.target.value) })}
          className="col-span-3"
          required
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="roomId" className="text-right">
          Room
        </Label>
        <Select
          value={formData.roomId || ""}
          onValueChange={(value) => setFormData({ ...formData, roomId: value || null })}
          disabled={isLoadingRooms}
        >
          <SelectTrigger className="col-span-3">
            <SelectValue placeholder="Select a room" />
          </SelectTrigger>
          <SelectContent> 
            <SelectItem value="NA">No room assigned</SelectItem>
            {roomsData?.data?.map((room) => (
              <SelectItem key={room.roomId} value={room.roomId}>
                {room.roomNumber} - {room.roomType} (Floor {room.roomFloor})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {mode === "edit" && (
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="status" className="text-right">
            Status
          </Label>
          <Select
            value={formData.status}
            onValueChange={(value) => setFormData({ ...formData, status: value as GuestStatus })}
          >
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Approved">Approved</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
              <SelectItem value="CheckedOut">Checked Out</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {mode === "add" ? "Add Guest" : "Update Guest"}
        </Button>
      </DialogFooter>
    </form>
  )
}

function ViewTemporaryGuestDialog({
  guest,
  onClose,
}: {
  guest: TemporaryGuest
  onClose: () => void
}) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{guest.guestName}</DialogTitle>
          <DialogDescription>
            <div className="flex items-center space-x-2 mt-2">
              <Badge variant={
                guest.status === "Approved" ? "default" : 
                guest.status === "Rejected" ? "destructive" : 
                guest.status === "CheckedOut" ? "secondary" : "outline"
              }>
                {guest.status}
              </Badge>
              {guest.room && (
                <Badge variant="outline">
                  Room: {guest.room.roomNumber}
                </Badge>
              )}
            </div>
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Name:</span>
              </div>
              <p className="text-sm text-muted-foreground pl-6">{guest.guestName}</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Phone:</span>
              </div>
              <p className="text-sm text-muted-foreground pl-6">{guest.guestPhone}</p>
            </div>
            {guest.guestEmail && (
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Email:</span>
                </div>
                <p className="text-sm text-muted-foreground pl-6">{guest.guestEmail}</p>
              </div>
            )}
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Address:</span>
              </div>
              <p className="text-sm text-muted-foreground pl-6">{guest.guestAddress}</p>
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Purpose:</span>
            </div>
            <p className="text-sm text-muted-foreground pl-6">{guest.guestPurpose}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Check-in:</span>
              </div>
              <p className="text-sm text-muted-foreground pl-6">
                {format(new Date(guest.checkInDate), "PPP p")}
              </p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Check-out:</span>
              </div>
              <p className="text-sm text-muted-foreground pl-6">
                {format(new Date(guest.checkOutDate), "PPP p")}
              </p>
            </div>
          </div>
          {guest.guestDocuments && guest.guestDocuments.length > 0 && (
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Documents:</span>
              </div>
              <ul className="list-disc list-inside text-sm text-muted-foreground pl-6">
                {guest.guestDocuments.map((doc, index) => (
                  <li key={index}>
                    <a href={doc} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                      Document {index + 1}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default function TemporaryGuestManagement() {
  const [isAddGuestDialogOpen, setIsAddGuestDialogOpen] = useState(false)
  const [isEditGuestDialogOpen, setIsEditGuestDialogOpen] = useState(false)
  const [isViewGuestDialogOpen, setIsViewGuestDialogOpen] = useState(false)
  const [selectedGuest, setSelectedGuest] = useState<TemporaryGuest | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [filters, setFilters] = useState({
    status: "All",
  })
  const debouncedSearchQuery = useDebounce(searchQuery, 500)

  const {
    createTemporaryGuest,
    isCreatingTemporaryGuest,
    updateTemporaryGuest,
    isUpdatingTemporaryGuest,
    removeTemporaryGuest,
    isRemovingTemporaryGuest,
    changeTemporaryGuestStatus,
    isUpdatingTemporaryGuestStatus
  } = useTemporaryGuestMutations()

  const { data: guestsData, isLoading } = useQuery({
    queryKey: ["temporary-guests", currentPage, debouncedSearchQuery, filters],
    queryFn: () => getTemporaryGuests(currentPage, pageSize, debouncedSearchQuery, filters),
  })

  const handleAddGuest = async (newGuest: Partial<TemporaryGuest>) => {
    await createTemporaryGuest(JSON.stringify(newGuest))
    setIsAddGuestDialogOpen(false)
  }

  const handleEditGuest = async (updatedGuest: Partial<TemporaryGuest>) => {
    if (selectedGuest) {
      await updateTemporaryGuest(
        JSON.stringify({
          ...updatedGuest,
          guestId: selectedGuest.guestId,
        })
      )
      setIsEditGuestDialogOpen(false)
    }
  }

  const handleDeleteGuest = async (guestId: string) => {
    await removeTemporaryGuest(guestId)
  }

  const handleChangeGuestStatus = async (guestId: string, status: GuestStatus) => {
    await changeTemporaryGuestStatus({ guestId, status })
  }

  const getStatusBadgeVariant = (status: GuestStatus) => {
    switch (status) {
      case "Approved":
        return "default"
      case "Rejected":
        return "destructive"
      case "CheckedOut":
        return "secondary"
      default:
        return "outline"
    }
  }

  const getStatusIcon = (status: GuestStatus) => {
    switch (status) {
      case "Approved":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "Rejected":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "CheckedOut":
        return <LogOut className="h-4 w-4 text-gray-500" />
      default:
        return <Clock className="h-4 w-4 text-yellow-500" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Temporary Guests</h1>
          <p className="text-muted-foreground">
            Manage temporary guests and their stays
          </p>
        </div>
        <Dialog open={isAddGuestDialogOpen} onOpenChange={setIsAddGuestDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Guest
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Guest</DialogTitle>
              <DialogDescription>
                Fill in the details to add a new temporary guest
              </DialogDescription>
            </DialogHeader>
            <TemporaryGuestForm
              onSubmit={handleAddGuest}
              onCancel={() => setIsAddGuestDialogOpen(false)}
              mode="add"
            />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Temporary Guests</CardTitle>
          <CardDescription>
            View and manage temporary guests
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-1 items-center space-x-2">
              <Input
                placeholder="Search guests..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-8 w-[150px] lg:w-[250px]"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Select
                value={filters.status}
                onValueChange={(value) => setFilters({ ...filters, status: value })}
              >
                <SelectTrigger className="h-8 w-[130px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Statuses</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Approved">Approved</SelectItem>
                  <SelectItem value="Rejected">Rejected</SelectItem>
                  <SelectItem value="CheckedOut">Checked Out</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            {isLoading ? (
              <div className="text-center py-4">Loading temporary guests...</div>
            ) : guestsData?.data && guestsData.data.length === 0 ? (
              <div className="text-center py-4">No temporary guests found</div>
            ) : (
              guestsData?.data?.map((guest) => (
                <div
                  key={guest.guestId}
                  className="flex items-start space-x-4 rounded-lg border p-4"
                >
                  <div className="flex-shrink-0">
                    <User className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{guest.guestName}</h3>
                      <div className="flex items-center space-x-2">
                        <Badge variant={getStatusBadgeVariant(guest.status)}>
                          <div className="flex items-center space-x-1">
                            {getStatusIcon(guest.status)}
                            <span>{guest.status}</span>
                          </div>
                        </Badge>
                        {guest.room && (
                          <Badge variant="outline">
                            Room: {guest.room.roomNumber}
                          </Badge>
                        )}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedGuest(guest)
                                setIsViewGuestDialogOpen(true)
                              }}
                            >
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedGuest(guest)
                                setIsEditGuestDialogOpen(true)
                              }}
                            >
                              Edit Guest
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleChangeGuestStatus(guest.guestId, "Approved")}
                              disabled={guest.status === "Approved"}
                            >
                              Approve
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleChangeGuestStatus(guest.guestId, "Rejected")}
                              disabled={guest.status === "Rejected"}
                            >
                              Reject
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleChangeGuestStatus(guest.guestId, "CheckedOut")}
                              disabled={guest.status === "CheckedOut"}
                            >
                              Mark as Checked Out
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => handleDeleteGuest(guest.guestId)}
                            >
                              Delete Guest
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      <span>{guest.guestPhone}</span>
                      {guest.guestEmail && (
                        <>
                          <Mail className="h-4 w-4 ml-2" />
                          <span>{guest.guestEmail}</span>
                        </>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {format(new Date(guest.checkInDate), "PPP")} - {format(new Date(guest.checkOutDate), "PPP")}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium">Purpose:</span> {guest.guestPurpose}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          {guestsData && guestsData.totalPages && guestsData.totalPages > 1 && (
            <div className="mt-4">
              <Pagination
                currentPage={currentPage}
                totalItems={guestsData.total}
                pageSize={pageSize}
                onPageChange={setCurrentPage}
                onPageSizeChange={pageSize => setPageSize(pageSize)}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {isEditGuestDialogOpen && selectedGuest && (
        <Dialog open={isEditGuestDialogOpen} onOpenChange={setIsEditGuestDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Guest</DialogTitle>
              <DialogDescription>
                Update the details of the temporary guest
              </DialogDescription>
            </DialogHeader>
            <TemporaryGuestForm
              guest={selectedGuest}
              onSubmit={handleEditGuest}
              onCancel={() => setIsEditGuestDialogOpen(false)}
              mode="edit"
            />
          </DialogContent>
        </Dialog>
      )}

      {isViewGuestDialogOpen && selectedGuest && (
        <ViewTemporaryGuestDialog
          guest={selectedGuest}
          onClose={() => setIsViewGuestDialogOpen(false)}
        />
      )}
    </div>
  )
} 