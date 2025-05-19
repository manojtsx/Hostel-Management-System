"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
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
import { MoreHorizontal, Plus, BedDouble, Users, User, Eye, Pencil } from "lucide-react"
import { toast } from "sonner"
import useRoomMutations from "./RoomMutations"
import { useQuery } from "@tanstack/react-query"
import { getRooms } from "./RoomServer"

interface Room {
  roomId: string
  roomNumber: string
  roomType: "Single" | "Double" | "Triple"
  roomCapacity: string
  occupied: number
  status: "available" | "partially_occupied" | "occupied"
  occupants: {
    name: string
    type: "student" | "guest"
  }[]
  roomPricePerMonth: string
  roomFloor: string
  roomBuilding: string
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "available":
      return "bg-green-500"
    case "occupied":
      return "bg-blue-500"
    case "maintenance":
      return "bg-red-500"
    default:
      return "bg-gray-500"
  }
}

function ViewRoomDialog({ room, onClose }: { room: Room; onClose: () => void }) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Room Details</DialogTitle>
          <DialogDescription>
            View detailed information about the room
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Room Number</Label>
              <p className="text-sm">{room.roomNumber}</p>
            </div>
            <div>
              <Label>Type</Label>
              <p className="text-sm">{room.roomType}</p>
            </div>
            <div>
              <Label>Capacity</Label>
              <p className="text-sm">{room.roomCapacity}</p>
            </div>
            <div>
              <Label>Occupied</Label>
              <p className="text-sm">{room.occupied}</p>
            </div>
            <div>
              <Label>Status</Label>
              <Badge className={getStatusColor(room.status)}>
                {room.status}
              </Badge>
            </div>
            <div>
              <Label>Price</Label>
              <p className="text-sm">${room.roomPricePerMonth}/month</p>
            </div>
            <div>
              <Label>Location</Label>
              <p className="text-sm">Building {room.roomBuilding}, Floor {room.roomFloor}</p>
            </div>
          </div>
          <div>
            <Label>Occupants</Label>
            <div className="space-y-2 mt-2">
              {room.occupants.map((occupant, index) => (
                <div key={index} className="flex items-center gap-2">
                  {occupant.type === "student" ? (
                    <Users className="h-4 w-4 text-blue-500" />
                  ) : (
                    <User className="h-4 w-4 text-green-500" />
                  )}
                  <div>
                    <p className="text-sm font-medium">{occupant.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {occupant.type}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function RoomsManagement() {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [searchQuery, setSearchQuery] = useState("")
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [roomToDelete, setRoomToDelete] = useState<Room | null>(null)

  const {data : rooms, isLoading : isRoomsLoading} = useQuery({
    queryKey: ["rooms", currentPage, pageSize, searchQuery],
    queryFn: () => getRooms(currentPage, pageSize, searchQuery)
  })

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)
  const [viewMode, setViewMode] = useState<"view" | "edit" | null>(null)
  const [newRoom, setNewRoom] = useState<Partial<Room>>({
    status: "available",
    occupants: [],
  })

  const {createRoom, isCreatingRoom} = useRoomMutations();
  const handleAddRoom = async() => {
    if (!newRoom.roomNumber || !newRoom.roomType || !newRoom.roomCapacity || !newRoom.roomPricePerMonth || !newRoom.roomFloor || !newRoom.roomBuilding) {
      toast.error("Please fill in all required fields")
      return
    }

    const room: Room = {
      roomId: newRoom.roomNumber,
      roomNumber: newRoom.roomNumber,
      roomType: newRoom.roomType as Room["roomType"],
      roomCapacity: newRoom.roomCapacity,
      occupied: 0,
      status: "available",
      occupants: [],
      roomPricePerMonth: newRoom.roomPricePerMonth,
      roomFloor: newRoom.roomFloor,
      roomBuilding: newRoom.roomBuilding,
    }

    // setRooms([...rooms, room])
    await createRoom(JSON.stringify(room));

    setIsAddDialogOpen(false)
    setNewRoom({ status: "available", occupants: [] });
  }

  const handleEditRoom = () => {
    if (!selectedRoom || !newRoom.roomNumber || !newRoom.roomType || !newRoom.roomCapacity || !newRoom.roomPricePerMonth || !newRoom.roomFloor || !newRoom.roomBuilding) {
      toast.error("Please fill in all required fields")
      return
    }

    setSelectedRoom(null)
    setViewMode(null)
    setNewRoom({ status: "available", occupants: [] })
    toast.success("Room updated successfully")
  }

  const handleUpdateStatus = (id: string, status: Room["status"]) => {
    toast.success("Status updated successfully")
  }

  const handleDeleteRoom = (id: string) => {
    // Close the delete dialog
    setIsDeleteDialogOpen(false)
    setRoomToDelete(null)
    toast.success("Room deleted successfully")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Rooms</h1>
          <p className="text-muted-foreground">
            Manage rooms and their occupants
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Room
            </Button> 
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{selectedRoom ? "Edit Room" : "Add New Room"}</DialogTitle>
              <DialogDescription>
                {selectedRoom ? "Update the room details" : "Enter the room details and configuration"}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="roomNumber">Room Number</Label>
                  <Input
                    id="roomNumber"
                    value={newRoom.roomNumber || ""}
                    onChange={(e) => setNewRoom({ ...newRoom, roomNumber: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="roomType">Room Type</Label>
                  <Select
                    value={newRoom.roomType}
                    onValueChange={(value) => setNewRoom({ ...newRoom, roomType: value as Room["roomType"] })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Single">Single</SelectItem>
                      <SelectItem value="Double">Double</SelectItem>
                      <SelectItem value="Triple">Triple</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="roomCapacity">Capacity</Label>
                  <Input
                    id="roomCapacity"
                    type="number"
                    value={newRoom.roomCapacity || ""}
                    onChange={(e) => setNewRoom({ ...newRoom, roomCapacity: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="roomPricePerMonth">Price (per month)</Label>
                  <Input
                    id="roomPricePerMonth"
                    type="number"
                    value={newRoom.roomPricePerMonth || ""}
                    onChange={(e) => setNewRoom({ ...newRoom, roomPricePerMonth: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="roomFloor">Floor</Label>
                  <Input
                    id="roomFloor"
                    value={newRoom.roomFloor || ""}
                    onChange={(e) => setNewRoom({ ...newRoom, roomFloor: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="roomBuilding">Building</Label>
                  <Input
                    id="roomBuilding"
                    value={newRoom.roomBuilding || ""}
                    onChange={(e) => setNewRoom({ ...newRoom, roomBuilding: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => {
                setIsAddDialogOpen(false)
                setSelectedRoom(null)
                setNewRoom({ status: "available", occupants: [] })
              }}>
                Cancel
              </Button>
              <Button onClick={selectedRoom ? handleEditRoom : handleAddRoom}>
                {selectedRoom ? "Save Changes" : "Add Room"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Room List</CardTitle>
              <CardDescription>
                View and manage rooms and their occupants
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Search rooms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-[200px]"
              />
              <Select
                value={pageSize.toString()}
                onValueChange={(value) => setPageSize(Number(value))}
              >
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="10" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Room</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Occupants</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rooms?.rooms?.map((room) => (
                <TableRow key={room.roomId}>
                  <TableCell className="font-medium">{room.roomNumber}</TableCell>
                  <TableCell>{room.roomType}</TableCell>
                  <TableCell>
                    {room.occupied}/{room.roomCapacity}
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {room.occupants.map((occupant, index) => (
                        <div key={index} className="flex items-center gap-2">
                          {occupant.type === "student" ? (
                            <Users className="h-4 w-4 text-blue-500" />
                          ) : (
                            <User className="h-4 w-4 text-green-500" />
                          )}
                          <div>
                            <p className="text-sm font-medium">{occupant.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {occupant.type}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(room.status)}>
                      {room.status}
                    </Badge>
                  </TableCell>
                  <TableCell>${room.roomPricePerMonth}/month</TableCell>
                  <TableCell>
                    Building {room.roomBuilding}, Floor {room.roomFloor}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => {
                          setSelectedRoom(room)
                          setViewMode("view")
                        }}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {
                          setSelectedRoom(room)
                          setNewRoom({
                            roomNumber: room.roomNumber,
                            roomType: room.roomType,
                            roomCapacity: room.roomCapacity,
                            roomPricePerMonth: room.roomPricePerMonth,
                            roomFloor: room.roomFloor,
                            roomBuilding: room.roomBuilding,
                            status: room.status,
                            occupants: room.occupants,
                          })
                          setIsAddDialogOpen(true)
                        }}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit Room
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setRoomToDelete(room)
                            setIsDeleteDialogOpen(true)
                          }}
                          className="text-red-600"
                        >
                          <BedDouble className="mr-2 h-4 w-4" />
                          Delete Room
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, (rooms?.totalPages || 0) * pageSize)} of {(rooms?.totalPages || 0) * pageSize} rooms
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => prev + 1)}
              disabled={currentPage >= (rooms?.totalPages || 1)}
            >
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>

      {selectedRoom && viewMode === "view" && (
        <ViewRoomDialog
          room={selectedRoom}
          onClose={() => {
            setSelectedRoom(null)
            setViewMode(null)
          }}
        />
      )}

      {/* Add Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Room</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete room {roomToDelete?.roomNumber}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsDeleteDialogOpen(false)
                setRoomToDelete(null)
              }}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => roomToDelete && handleDeleteRoom(roomToDelete.roomId)}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
} 