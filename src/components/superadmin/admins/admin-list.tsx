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
import { User2, Trash2, Loader2 } from "lucide-react"
import { AdminForm } from "./admin-form"
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
} from "@/components/ui/alert-dialog"
import { Switch } from "@/components/ui/switch"
import { useState } from "react"
import { useCreateAdmin } from "./AdminMutation"
import { useQuery } from "@tanstack/react-query"
import { useDebounce } from "@/lib/debounce"
import { getAllAdmins } from "./AdminServerAction"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Pagination } from "@/components/pagination"

interface Hostel {
  hostelId: string
  hostelName: string
  hostelAddress: string
}

type AdminFormData = {
  adminId?: string
  adminName: string
  adminEmail: string
  adminPhone: string
  hostel: Hostel
}

export function AdminList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 500);
  const [statusFilter, setStatusFilter] = useState("All");

  const { data: adminList, isLoading: isLoadingAdmin } = useQuery({
    queryKey: ['admins', currentPage, pageSize, debouncedSearch, statusFilter],
    queryFn: () => getAllAdmins(currentPage, pageSize, debouncedSearch, statusFilter)
  });

  const { addAdmin } = useCreateAdmin();
  const handleAddAdmin = async (data: AdminFormData) => {
    await addAdmin(JSON.stringify(data));
  };

  const { updateAdmin } = useCreateAdmin();
  const handleEditAdmin = async (id: string, data: AdminFormData) => {
    await updateAdmin(JSON.stringify({ ...data, adminId: id }));
  };

  const { removeAdmin } = useCreateAdmin();
  const handleDeleteAdmin = async (id: string) => {
    await removeAdmin(id);
  };

  const { toggleStatus } = useCreateAdmin();
  const handleToggleStatus = async (id: string) => {
    await toggleStatus(id);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Admins</h2>
          <p className="text-muted-foreground">
            Manage all hostel admins in the system
          </p>
        </div>
        <AdminForm mode="add" onSubmit={handleAddAdmin} />
      </div>

      <div className="flex items-center gap-2">
        <Input 
          placeholder="Search Hostel" 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Select onValueChange={(value) => {setStatusFilter(value)}}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Hostel</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoadingAdmin && (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </TableCell>
              </TableRow>
            )}
            {!isLoadingAdmin && adminList?.admins?.map((admin) => (
              <TableRow key={admin.adminId}>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <User2 className="h-4 w-4 mr-2" />
                    {admin.adminName}
                  </div>
                </TableCell>
                <TableCell>{admin.adminEmail}</TableCell>
                <TableCell>{admin.adminPhone}</TableCell>
                <TableCell>{admin.hostel.hostelName}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={admin.status === "Active"}
                      onCheckedChange={() => handleToggleStatus(admin.adminId)}
                    />
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        admin.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {admin.status}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <AdminForm
                      mode="edit"
                      initialData={{
                        adminId: admin.adminId,
                        adminName: admin.adminName,
                        adminEmail: admin.adminEmail,
                        adminPhone: admin.adminPhone,
                        hostel: admin.hostel
                      }}
                      onSubmit={(data) => handleEditAdmin(admin.adminId, data)}
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
                            delete the admin and all their associated data.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteAdmin(admin.adminId)}
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
        <Pagination totalItems={adminList?.totalCount as number} currentPage={currentPage} pageSize={pageSize} onPageChange={setCurrentPage} onPageSizeChange={setPageSize} />
      </div>
    </div>
  );
} 