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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, User, Mail, Phone, MoreVertical, Eye, Pencil, Check, X } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
import { useState } from "react"

interface Student {
  id: number
  studentId: string
  name: string
  email: string
  phone: string
  room: string
  status: "Active" | "Inactive"
  checkInDate: string
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "active":
      return "bg-green-500"
    case "inactive":
      return "bg-red-500"
    default:
      return "bg-gray-500"
  }
}

interface StudentFormProps {
  student?: Student
  onSubmit: (student: Partial<Student>) => void
  onCancel: () => void
  mode: "add" | "edit"
}

function StudentForm({ student, onSubmit, onCancel, mode }: StudentFormProps) {
  const [formData, setFormData] = useState<Partial<Student>>(
    student || {
      studentId: "",
      name: "",
      email: "",
      phone: "",
      room: "",
      status: "Active",
      checkInDate: new Date().toISOString().split("T")[0],
    }
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="studentId" className="text-right">
          Student ID
        </Label>
        <Input
          id="studentId"
          value={formData.studentId}
          onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
          className="col-span-3"
          required
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Name
        </Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="col-span-3"
          required
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="email" className="text-right">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="col-span-3"
          required
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="phone" className="text-right">
          Phone
        </Label>
        <Input
          id="phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="col-span-3"
          required
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="room" className="text-right">
          Room
        </Label>
        <Input
          id="room"
          value={formData.room}
          onChange={(e) => setFormData({ ...formData, room: e.target.value })}
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
          onValueChange={(value) => setFormData({ ...formData, status: value as Student["status"] })}
        >
          <SelectTrigger className="col-span-3">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="checkInDate" className="text-right">
          Check-in Date
        </Label>
        <Input
          id="checkInDate"
          type="date"
          value={formData.checkInDate}
          onChange={(e) => setFormData({ ...formData, checkInDate: e.target.value })}
          className="col-span-3"
          required
        />
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {mode === "add" ? "Add Student" : "Save Changes"}
        </Button>
      </DialogFooter>
    </form>
  )
}

function ViewStudentDialog({ student, onClose }: { student: Student; onClose: () => void }) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Student Details</DialogTitle>
          <DialogDescription>
            View detailed information about the student
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Student ID</Label>
              <p className="text-sm">{student.studentId}</p>
            </div>
            <div>
              <Label>Name</Label>
              <p className="text-sm">{student.name}</p>
            </div>
            <div>
              <Label>Email</Label>
              <p className="text-sm">{student.email}</p>
            </div>
            <div>
              <Label>Phone</Label>
              <p className="text-sm">{student.phone}</p>
            </div>
            <div>
              <Label>Room</Label>
              <p className="text-sm">{student.room}</p>
            </div>
            <div>
              <Label>Status</Label>
              <Badge className={getStatusColor(student.status)}>
                {student.status}
              </Badge>
            </div>
            <div>
              <Label>Check-in Date</Label>
              <p className="text-sm">{student.checkInDate}</p>
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

export function StudentsManagement() {
  const [students, setStudents] = useState<Student[]>([
    {
      id: 1,
      studentId: "ST001",
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1234567890",
      room: "101-A",
      status: "Active",
      checkInDate: "2024-01-01",
    },
    {
      id: 2,
      studentId: "ST002",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "+1234567891",
      room: "102-B",
      status: "Active",
      checkInDate: "2024-01-15",
    },
    {
      id: 3,
      studentId: "ST003",
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
      phone: "+1234567892",
      room: "103-C",
      status: "Inactive",
      checkInDate: "2024-02-01",
    },
  ])

  const [isAddStudentDialogOpen, setIsAddStudentDialogOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [viewMode, setViewMode] = useState<"view" | "edit" | null>(null)

  const handleAddStudent = (newStudent: Partial<Student>) => {
    const student: Student = {
      id: students.length + 1,
      studentId: newStudent.studentId!,
      name: newStudent.name!,
      email: newStudent.email!,
      phone: newStudent.phone!,
      room: newStudent.room!,
      status: newStudent.status as Student["status"],
      checkInDate: newStudent.checkInDate || new Date().toISOString().split("T")[0],
    }

    setStudents([...students, student])
    setIsAddStudentDialogOpen(false)
  }

  const handleEditStudent = (updatedStudent: Partial<Student>) => {
    if (!selectedStudent) return

    setStudents(students.map(student =>
      student.id === selectedStudent.id
        ? { ...student, ...updatedStudent }
        : student
    ))
    setSelectedStudent(null)
    setViewMode(null)
  }

  const handleDeleteStudent = (studentId: number) => {
    setStudents(students.filter(student => student.id !== studentId))
  }

  const handleActiveToggle = (studentId: number, status: "Active" | "Inactive") => {
    setStudents(students.map(student =>
      student.id === studentId
        ? { ...student, status }
        : student
    ))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Students</h1>
          <p className="text-muted-foreground">
            Manage student information and room allocations
          </p>
        </div>
        <Dialog open={isAddStudentDialogOpen} onOpenChange={setIsAddStudentDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Student
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Student</DialogTitle>
              <DialogDescription>
                Fill in the details to add a new student
              </DialogDescription>
            </DialogHeader>
            <StudentForm
              onSubmit={handleAddStudent}
              onCancel={() => setIsAddStudentDialogOpen(false)}
              mode="add"
            />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Student List</CardTitle>
          <CardDescription>
            View and manage all students in the hostel
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Room</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Check-in Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.studentId}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {student.name}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        <span className="text-sm">{student.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        <span className="text-sm">{student.phone}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{student.room}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(student.status)}>
                      {student.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{student.checkInDate}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => {
                          setSelectedStudent(student)
                          setViewMode("view")
                        }}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => {
                            handleActiveToggle(student.id, "Active")
                          }}>
                          <Check className="mr-2 h-4 w-4" />
                          Mark as Active
                        </DropdownMenuItem>
                        <DropdownMenuItem
                        onClick={() => {
                          handleActiveToggle(student.id, "Inactive")
                        }}>
                          <X className="mr-2 h-4 w-4" />
                          Mark as Inactive
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {
                          setSelectedStudent(student)
                          setViewMode("edit")
                        }}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit Details
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleDeleteStudent(student.id)}
                        >
                          Delete Student
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

      {selectedStudent && viewMode === "view" && (
        <ViewStudentDialog
          student={selectedStudent}
          onClose={() => {
            setSelectedStudent(null)
            setViewMode(null)
          }}
        />
      )}

      {selectedStudent && viewMode === "edit" && (
        <Dialog open={true} onOpenChange={() => {
          setSelectedStudent(null)
          setViewMode(null)
        }}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Student</DialogTitle>
              <DialogDescription>
                Update the student's information
              </DialogDescription>
            </DialogHeader>
            <StudentForm
              student={selectedStudent}
              onSubmit={handleEditStudent}
              onCancel={() => {
                setSelectedStudent(null)
                setViewMode(null)
              }}
              mode="edit"
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
} 