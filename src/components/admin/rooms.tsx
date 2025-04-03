import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, BedDouble, Edit2, Trash2 } from "lucide-react"

export function RoomsManagement() {
  // Sample data - replace with actual data from your backend
  const rooms = [
    {
      id: 1,
      roomNumber: "101",
      type: "Single",
      capacity: 1,
      status: "Occupied",
      beds: [
        { id: 1, bedNumber: "A", status: "Occupied", student: "John Doe" },
      ],
    },
    {
      id: 2,
      roomNumber: "102",
      type: "Double",
      capacity: 2,
      status: "Available",
      beds: [
        { id: 2, bedNumber: "A", status: "Available", student: null },
        { id: 3, bedNumber: "B", status: "Available", student: null },
      ],
    },
    {
      id: 3,
      roomNumber: "103",
      type: "Triple",
      capacity: 3,
      status: "Maintenance",
      beds: [
        { id: 4, bedNumber: "A", status: "Maintenance", student: null },
        { id: 5, bedNumber: "B", status: "Maintenance", student: null },
        { id: 6, bedNumber: "C", status: "Maintenance", student: null },
      ],
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "occupied":
        return "bg-red-500"
      case "available":
        return "bg-green-500"
      case "maintenance":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Rooms & Beds</h1>
          <p className="text-muted-foreground">
            Manage hostel rooms and bed allocations
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Room
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Room List</CardTitle>
          <CardDescription>
            View and manage all rooms in the hostel
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Room Number</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Beds</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rooms.map((room) => (
                <TableRow key={room.id}>
                  <TableCell className="font-medium">{room.roomNumber}</TableCell>
                  <TableCell>{room.type}</TableCell>
                  <TableCell>{room.capacity}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(room.status)}>
                      {room.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {room.beds.map((bed) => (
                        <div
                          key={bed.id}
                          className="flex items-center gap-1 text-sm"
                        >
                          <BedDouble className="h-4 w-4" />
                          <span>{bed.bedNumber}</span>
                          <Badge
                            variant="outline"
                            className={getStatusColor(bed.status)}
                          >
                            {bed.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
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