import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Building2, Edit2, Trash2, Plus } from "lucide-react"

export function HostelList() {
  // TODO: Replace with actual data from API
  const hostels = [
    {
      id: 1,
      name: "Sunrise Residency",
      address: "123 University Road",
      totalRooms: 50,
      totalBeds: 200,
      status: "Active",
    },
    {
      id: 2,
      name: "Green Valley Hostel",
      address: "456 College Street",
      totalRooms: 30,
      totalBeds: 120,
      status: "Active",
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Hostels</h2>
          <p className="text-muted-foreground">
            Manage all hostels in the system
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Hostel
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Total Rooms</TableHead>
              <TableHead>Total Beds</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {hostels.map((hostel) => (
              <TableRow key={hostel.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <Building2 className="h-4 w-4 mr-2" />
                    {hostel.name}
                  </div>
                </TableCell>
                <TableCell>{hostel.address}</TableCell>
                <TableCell>{hostel.totalRooms}</TableCell>
                <TableCell>{hostel.totalBeds}</TableCell>
                <TableCell>
                  <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                    {hostel.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
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
      </div>
    </div>
  )
} 