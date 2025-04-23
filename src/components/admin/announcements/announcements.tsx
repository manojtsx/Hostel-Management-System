"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Plus, Bell, MoreVertical } from "lucide-react"
import { Badge } from "@/components/ui/badge"
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { getAnnouncements } from "./AnnouncementServer"
import useAnnouncementMutations from "./AnnouncementMutations"
import { useDebounce } from "@/utils/debounce/usedebounce"
import { AnnouncementPriority, AnnouncementStatus, AnnouncementType } from "@prisma/client"
import { Pagination } from "@/components/pagination"

interface Announcement {
  announcementId: string
  title: string
  content: string
  type: AnnouncementType
  priority: AnnouncementPriority
  date: Date
  status: AnnouncementStatus
}

const getPriorityColor = (priority: string) => {
  switch (priority.toLowerCase()) {
    case "high":
      return "bg-red-500"
    case "medium":
      return "bg-yellow-500"
    case "low":
      return "bg-green-500"
    default:
      return "bg-gray-500"
  }
}

const getTypeColor = (type: string) => {
  switch (type.toLowerCase()) {
    case "maintenance":
      return "bg-blue-500"
    case "information":
      return "bg-gray-500"
    default:
      return "bg-gray-500"
  }
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "comingsoon":
      return "bg-yellow-500"
    case "active":
      return "bg-green-500"
    case "completed":
      return "bg-blue-500"
    default:
      return "bg-gray-500"
  }
}

interface AnnouncementFormProps {
  announcement?: Announcement
  onSubmit: (announcement: Partial<Announcement>) => void
  onCancel: () => void
  mode: "add" | "edit"
}

function AnnouncementForm({ announcement, onSubmit, onCancel, mode }: AnnouncementFormProps) {
  const [formData, setFormData] = useState<Partial<Announcement>>(
    announcement || {
      title: "",
      content: "",
      type: "Information",
      priority: "Medium",
      date: new Date(),
      status: "ComingSoon",
    }
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="title" className="text-right">
          Title
        </Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="col-span-3"
          required
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="content" className="text-right">
          Content
        </Label>
        <Textarea
          id="content"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          className="col-span-3"
          required
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="type" className="text-right">
          Type
        </Label>
        <Select
          value={formData.type}
          onValueChange={(value) => setFormData({ ...formData, type: value as AnnouncementType })}
        >
          <SelectTrigger className="col-span-3">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Maintenance">Maintenance</SelectItem>
            <SelectItem value="Information">Information</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="priority" className="text-right">
          Priority
        </Label>
        <Select
          value={formData.priority}
          onValueChange={(value) => setFormData({ ...formData, priority: value as AnnouncementPriority })}
        >
          <SelectTrigger className="col-span-3">
            <SelectValue placeholder="Select priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="High">High</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="Low">Low</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="date" className="text-right">
          Date
        </Label>
        <Input
          id="date"
          type="date"
          value={formData.date?.toISOString().split("T")[0]}
          onChange={(e) => setFormData({ ...formData, date: new Date(e.target.value) })}
          className="col-span-3"
          required
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="status" className="text-right">
          Status
        </Label>
        <Select
          value={formData.status}
          onValueChange={(value) => setFormData({ ...formData, status: value as AnnouncementStatus })}
        >
          <SelectTrigger className="col-span-3">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ComingSoon">Coming Soon</SelectItem>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {mode === "add" ? "Create Announcement" : "Update Announcement"}
        </Button>
      </DialogFooter>
    </form>
  )
}

function ViewAnnouncementDialog({
  announcement,
  onClose,
}: {
  announcement: Announcement
  onClose: () => void
}) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{announcement.title}</DialogTitle>
          <DialogDescription>
            <div className="flex items-center space-x-2 mt-2">
              <Badge className={getTypeColor(announcement.type)}>
                {announcement.type}
              </Badge>
              <Badge className={getPriorityColor(announcement.priority)}>
                {announcement.priority}
              </Badge>
              <Badge className={getStatusColor(announcement.status)}>
                {announcement.status}
              </Badge>
            </div>
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium">Content</h3>
            <p className="text-sm text-muted-foreground mt-1">{announcement.content}</p>
          </div>
          <div>
            <h3 className="font-medium">Date</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {new Date(announcement.date).toLocaleDateString()}
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function AnnouncementsManagement() {
  const [isAddAnnouncementDialogOpen, setIsAddAnnouncementDialogOpen] = useState(false)
  const [isEditAnnouncementDialogOpen, setIsEditAnnouncementDialogOpen] = useState(false)
  const [isViewAnnouncementDialogOpen, setIsViewAnnouncementDialogOpen] = useState(false)
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [filters, setFilters] = useState({
    type: "All",
    priority: "All",
    status: "All",
  })
  const debouncedSearchQuery = useDebounce(searchQuery, 500)

  const {
    createAnnouncement,
    isCreatingAnnouncement,
    updateAnnouncement,
    isUpdatingAnnouncement,
    removeAnnouncement,
    isRemovingAnnouncement,
    changeAnnouncementStatus,
    isChangingStatus
  } = useAnnouncementMutations()

  const { data: announcementsData, isLoading } = useQuery({
    queryKey: ["announcements", currentPage, debouncedSearchQuery, filters],
    queryFn: () => getAnnouncements(currentPage, pageSize, debouncedSearchQuery, filters),
  })

  const handleAddAnnouncement = async (newAnnouncement: Partial<Announcement>) => {
    await createAnnouncement(JSON.stringify(newAnnouncement))
    setIsAddAnnouncementDialogOpen(false)
  }

  const handleEditAnnouncement = async (updatedAnnouncement: Partial<Announcement>) => {
    if (selectedAnnouncement) {
      await updateAnnouncement(
        JSON.stringify({
          ...updatedAnnouncement,
          announcementId: selectedAnnouncement.announcementId,
        })
      )
      setIsEditAnnouncementDialogOpen(false)
    }
  }

  const handleDeleteAnnouncement = async (announcementId: string) => {
    await removeAnnouncement(announcementId)
  }

  const handleStatusChange = async (announcementId: string, status: AnnouncementStatus) => {
    await changeAnnouncementStatus({ announcementId, status })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Announcements</h1>
          <p className="text-muted-foreground">
            Manage hostel announcements and notices
          </p>
        </div>
        <Dialog open={isAddAnnouncementDialogOpen} onOpenChange={setIsAddAnnouncementDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Announcement
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Announcement</DialogTitle>
              <DialogDescription>
                Fill in the details to create a new announcement
              </DialogDescription>
            </DialogHeader>
            <AnnouncementForm
              onSubmit={handleAddAnnouncement}
              onCancel={() => setIsAddAnnouncementDialogOpen(false)}
              mode="add"
            />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Announcement List</CardTitle>
          <CardDescription>
            View and manage all announcements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-1 items-center space-x-2">
              <Input
                placeholder="Search announcements..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-8 w-[150px] lg:w-[250px]"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Select
                value={filters.type}
                onValueChange={(value) => setFilters({ ...filters, type: value })}
              >
                <SelectTrigger className="h-8 w-[130px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Types</SelectItem>
                  <SelectItem value="Maintenance">Maintenance</SelectItem>
                  <SelectItem value="Information">Information</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={filters.priority}
                onValueChange={(value) => setFilters({ ...filters, priority: value })}
              >
                <SelectTrigger className="h-8 w-[130px]">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Priorities</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={filters.status}
                onValueChange={(value) => setFilters({ ...filters, status: value })}
              >
                <SelectTrigger className="h-8 w-[130px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Statuses</SelectItem>
                  <SelectItem value="ComingSoon">Coming Soon</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            {isLoading ? (
              <div className="text-center py-4">Loading announcements...</div>
            ) : announcementsData?.data && announcementsData?.data.length === 0 ? (
              <div className="text-center py-4">No announcements found</div>
            ) : (
              announcementsData?.data?.map((announcement) => (
                <div
                  key={announcement.announcementId}
                  className="flex items-start space-x-4 rounded-lg border p-4"
                >
                  <div className="flex-shrink-0">
                    <Bell className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{announcement.title}</h3>
                      <div className="flex items-center space-x-2">
                        <Badge className={getTypeColor(announcement.type)}>
                          {announcement.type}
                        </Badge>
                        <Badge className={getPriorityColor(announcement.priority)}>
                          {announcement.priority}
                        </Badge>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedAnnouncement(announcement)
                                setIsViewAnnouncementDialogOpen(true)
                              }}
                            >
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedAnnouncement(announcement)
                                setIsEditAnnouncementDialogOpen(true)
                              }}
                            >
                              Edit Announcement
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleStatusChange(announcement.announcementId, "ComingSoon")}
                            >
                              Set Status: Coming Soon
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleStatusChange(announcement.announcementId, "Active")}
                            >
                              Set Status: Active
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleStatusChange(announcement.announcementId, "Completed")}
                            >
                              Set Status: Completed
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => handleDeleteAnnouncement(announcement.announcementId)}
                            >
                              Delete Announcement
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {announcement.content}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-muted-foreground">
                          Posted: {new Date(announcement.date).toLocaleDateString()}
                        </span>
                        <Badge className={getStatusColor(announcement.status)}>
                          {announcement.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {announcementsData && announcementsData.totalPages && announcementsData.totalPages > 1 && (
            <div className="mt-4">
              <Pagination
                currentPage={currentPage}
                totalItems={announcementsData.total}
                pageSize={pageSize}
                onPageChange={setCurrentPage}
                onPageSizeChange={pageSize => setPageSize(pageSize)}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {isEditAnnouncementDialogOpen && selectedAnnouncement && (
        <Dialog open={isEditAnnouncementDialogOpen} onOpenChange={setIsEditAnnouncementDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Announcement</DialogTitle>
              <DialogDescription>
                Update the details of the announcement
              </DialogDescription>
            </DialogHeader>
            <AnnouncementForm
              announcement={selectedAnnouncement}
              onSubmit={handleEditAnnouncement}
              onCancel={() => setIsEditAnnouncementDialogOpen(false)}
              mode="edit"
            />
          </DialogContent>
        </Dialog>
      )}

      {isViewAnnouncementDialogOpen && selectedAnnouncement && (
        <ViewAnnouncementDialog
          announcement={selectedAnnouncement}
          onClose={() => setIsViewAnnouncementDialogOpen(false)}
        />
      )}
    </div>
  )
} 