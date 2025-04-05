"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Building2, Eye, Loader2, Loader2Icon, Trash2 } from "lucide-react";
import { HostelForm } from "./hostel-form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { useCreateHostel } from "./HostelMutations";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useDebounce } from "@/lib/debounce";
import { useQuery } from "@tanstack/react-query";
import { getAllHostels } from "./HostelServerAction";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pagination } from "@/components/pagination";

interface Hostel {
  hostelId: string;
  hostelName: string;
  hostelAddress: string;
  totalRooms: number;
  totalBeds: number;
  totalFloors: number;
  hostelExpiryDate: Date;
}

export function HostelList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [expiryDays, setExpiryDays] = useState(0);
  const debouncedSearch = useDebounce(searchQuery, 500);

  const { data : hostelsData, isLoading : isHostelsLoading } = useQuery({
    queryKey : ["hostels", debouncedSearch, expiryDays],
    queryFn : () => getAllHostels(currentPage, pageSize, debouncedSearch, expiryDays)
  });
  const { addHostel } = useCreateHostel();
  const handleAddHostel = async (data: Omit<Hostel, "hostelId" | "status">) => {
    await addHostel(JSON.stringify(data));
  };

  const { updateHostel } = useCreateHostel();
  const handleEditHostel = async (
    hostelId: string,
    data: Omit<Hostel, "hostelId" | "status">
  ) => {
    await updateHostel(JSON.stringify(data));
  };

  const { removeHostel } = useCreateHostel();
  const handleDeleteHostel = async (hostelId: string) => {
    await removeHostel(hostelId);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Hostels</h2>
          <p className="text-muted-foreground">
            Manage all hostels in the system
          </p>
        </div>
        <HostelForm mode="add" onSubmit={handleAddHostel} />
      </div>

      <div className="flex items-center gap-2">
        <Input 
          placeholder="Search Hostel" 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Select onValueChange={(value) => setExpiryDays(Number(value))}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Expiry Days" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">All</SelectItem>
            <SelectItem value="30">30 Days</SelectItem>
            <SelectItem value="60">60 Days</SelectItem>
            <SelectItem value="90">90 Days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>T. Rooms</TableHead>
              <TableHead>T. Beds</TableHead>
              <TableHead>T. Floors</TableHead>
              <TableHead>Expiry Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              isHostelsLoading && (
                <TableRow>  
                  <TableCell colSpan={7} className="text-center">
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </TableCell>
                </TableRow>
              )
            }
            {hostelsData?.hostels?.map((hostel) => (
              <TableRow key={hostel.hostelId}>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <Building2 className="h-4 w-4 mr-2" />
                    {hostel.hostelName}
                  </div>
                </TableCell>
                <TableCell>{hostel.hostelAddress}</TableCell>
                <TableCell>{hostel.totalRooms}</TableCell>
                <TableCell>{hostel.totalBeds}</TableCell>
                <TableCell>{hostel.totalFloors}</TableCell>
                <TableCell>
                  {hostel.hostelExpiryDate
                    ? hostel.hostelExpiryDate.toLocaleDateString()
                    : "N/A"}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    {/*  eye button for viewing the hostel */}
                    <HostelViewModal hostel={hostel} />
                    <HostelForm
                      mode="edit"
                      initialData={hostel}
                      onSubmit={(data) => handleEditHostel(hostel.hostelId, data)}
                    />
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete the hostel and all its associated data.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteHostel(hostel.hostelId)}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
         <Pagination totalItems={hostelsData?.totalItems as number} currentPage={currentPage} pageSize={pageSize} onPageChange={setCurrentPage} onPageSizeChange={setPageSize} />
      </div>
    </div>
  );
}

// hostel view modal
const HostelViewModal = ({ hostel }: { hostel: Hostel }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditingMode, setIsEditingMode] = useState(false);
  const [hostelData, setHostelData] = useState<Hostel>({
    hostelId: hostel.hostelId,
    hostelName: hostel.hostelName,
    hostelAddress: hostel.hostelAddress,
    totalRooms: hostel.totalRooms,
    totalBeds: hostel.totalBeds,
    totalFloors: hostel.totalFloors,
    hostelExpiryDate: hostel.hostelExpiryDate,
  });

  const { updateHostel, isUpdatingHostel } = useCreateHostel();
  const handleEditHostel = async (data: Hostel) => {
    await updateHostel(JSON.stringify(data));
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Eye className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Hostel View</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <Label>Name</Label>
            <Input
              type="text"
              placeholder="Hostel Name"
              value={hostelData.hostelName}
              onChange={(e) =>
                setHostelData({ ...hostelData, hostelName: e.target.value })
              }
              disabled={!isEditingMode}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Address</Label>
            <Input
              type="text"
              placeholder="Hostel Address"
              value={hostelData.hostelAddress}
              onChange={(e) =>
                setHostelData({ ...hostelData, hostelAddress: e.target.value })
              }
              disabled={!isEditingMode}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Total Rooms</Label>
            <Input
              type="number"
              placeholder="Total Rooms"
              value={hostelData.totalRooms}
              onChange={(e) =>
                setHostelData({ ...hostelData, totalRooms: parseInt(e.target.value) })
              }
              disabled={!isEditingMode}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Total Beds</Label>
            <Input
              type="number"
              placeholder="Total Beds"
              value={hostelData.totalBeds}
              onChange={(e) =>
                setHostelData({ ...hostelData, totalBeds: parseInt(e.target.value) })
              }
              disabled={!isEditingMode}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Total Floors</Label>
            <Input
              type="number"
              placeholder="Total Floors"
              value={hostelData.totalFloors}
              onChange={(e) =>
                setHostelData({ ...hostelData, totalFloors: parseInt(e.target.value) })
              }
              disabled={!isEditingMode}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Hostel Expiry Date</Label>
            <Input
              type="date"
              placeholder="Hostel Expiry Date"
              value={hostelData.hostelExpiryDate.toISOString().split('T')[0]}
              onChange={(e) =>
                setHostelData({
                  ...hostelData,
                  hostelExpiryDate: new Date(e.target.value),
                })
              }
              disabled={!isEditingMode}
            />
          </div>
        </div>
        <DialogFooter>
          {
            !isEditingMode && (
              <>
              <Button variant="outline" onClick={() => {
                setIsOpen(false);
                setIsEditingMode(false);
              }}>Close</Button>
              <Button onClick={() => {
                setIsEditingMode(true);
              }}>Edit</Button>
              </>
            )
          }
          {
            isEditingMode && (
              <Button disabled={isUpdatingHostel} onClick={() => {
                setIsOpen(false);
                setIsEditingMode(false);
                handleEditHostel(hostelData);
              }}>
                {
                  isUpdatingHostel ? (
                    <Loader2Icon className="h-4 w-4 animate-spin" />
                  ) : (
                    "Save Changes"
                  )
                }
              </Button>
            )
          }
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
