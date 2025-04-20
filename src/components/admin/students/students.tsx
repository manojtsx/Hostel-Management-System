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
import useStudentMutations from "./StudentMutations"

interface Student {
  studentId: string
  studentGeneratedId: string
  studentName: string
  studentEmail: string
  studentPhone: string
  studentRoom: string
  studentStatus: "Active" | "Inactive"
  studentCheckInDate: string
  studentGender: string
  studentGuardianName: string
  studentGuardianPhone: string
  studentGuardianAddress: string
  studentGuardianRelation: string
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
      studentGeneratedId: "",
      studentName: "",
      studentEmail: "",
      studentPhone: "",
      studentRoom: "",
      studentStatus: "Active",
      studentCheckInDate: new Date().toISOString().split("T")[0],
      studentGender: "Male",
      studentGuardianName: "",
      studentGuardianPhone: "",
      studentGuardianAddress: "",
      studentGuardianRelation: "Parent"
    }
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="studentGeneratedId">Student ID</Label>
          <Input
            id="studentGeneratedId"
            value={formData.studentGeneratedId}
            placeholder="Student ID will be generated automatically"
            disabled
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="studentName">Name</Label>
          <Input
            id="studentName"
            value={formData.studentName}
            onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="studentEmail">Email</Label>
          <Input
            id="studentEmail"
            type="email"
            value={formData.studentEmail}
            onChange={(e) => setFormData({ ...formData, studentEmail: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="studentPhone">Phone</Label>
          <Input
            id="studentPhone"
            value={formData.studentPhone}
            onChange={(e) => setFormData({ ...formData, studentPhone: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="studentRoom">Room</Label>
          <Input
            id="studentRoom"
            value={formData.studentRoom}
            onChange={(e) => setFormData({ ...formData, studentRoom: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="studentGender">Gender</Label>
          <Select
            value={formData.studentGender}
            onValueChange={(value) => setFormData({ ...formData, studentGender: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select
            value={formData.studentStatus}
            onValueChange={(value) => setFormData({ ...formData, studentStatus: value as Student["studentStatus"] })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="studentCheckInDate">Check-in Date</Label>
          <Input
            id="studentCheckInDate"
            type="date"
            value={formData.studentCheckInDate}
            onChange={(e) => setFormData({ ...formData, studentCheckInDate: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="border-t pt-4">
        <h3 className="text-lg font-medium mb-4">Guardian Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="studentGuardianName">Guardian Name</Label>
            <Input
              id="studentGuardianName"
              value={formData.studentGuardianName}
              onChange={(e) => setFormData({ ...formData, studentGuardianName: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="studentGuardianPhone">Guardian Phone</Label>
            <Input
              id="studentGuardianPhone"
              value={formData.studentGuardianPhone}
              onChange={(e) => setFormData({ ...formData, studentGuardianPhone: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="studentGuardianAddress">Guardian Address</Label>
            <Input
              id="studentGuardianAddress"
              value={formData.studentGuardianAddress}
              onChange={(e) => setFormData({ ...formData, studentGuardianAddress: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="studentGuardianRelation">Relation</Label>
            <Select
              value={formData.studentGuardianRelation}
              onValueChange={(value) => setFormData({ ...formData, studentGuardianRelation: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select relation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Mother">Mother</SelectItem>
                <SelectItem value="Father">Father</SelectItem>
                <SelectItem value="Guardian">Guardian</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
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
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Student ID</Label>
              <p className="text-sm">{student.studentGeneratedId}</p>
            </div>
            <div>
              <Label>Name</Label>
              <p className="text-sm">{student.studentName}</p>
            </div>
            <div>
              <Label>Email</Label>
              <p className="text-sm">{student.studentEmail}</p>
            </div>
            <div>
              <Label>Phone</Label>
              <p className="text-sm">{student.studentPhone}</p>
            </div>
            <div>
              <Label>Room</Label>
              <p className="text-sm">{student.studentRoom}</p>
            </div>
            <div>
              <Label>Gender</Label>
              <p className="text-sm">{student.studentGender}</p>
            </div>
            <div>
              <Label>Status</Label>
              <Badge className={getStatusColor(student.studentStatus)}>
                {student.studentStatus}
              </Badge>
            </div>
            <div>
              <Label>Check-in Date</Label>
              <p className="text-sm">{student.studentCheckInDate}</p>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="text-lg font-medium mb-4">Guardian Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Guardian Name</Label>
                <p className="text-sm">{student.studentGuardianName}</p>
              </div>
              <div>
                <Label>Guardian Phone</Label>
                <p className="text-sm">{student.studentGuardianPhone}</p>
              </div>
              <div>
                <Label>Guardian Address</Label>
                <p className="text-sm">{student.studentGuardianAddress}</p>
              </div>
              <div>
                <Label>Relation</Label>
                <p className="text-sm">{student.studentGuardianRelation}</p>
              </div>
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
  const [students, setStudents] = useState<Student[]>([])

  const [isAddStudentDialogOpen, setIsAddStudentDialogOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [viewMode, setViewMode] = useState<"view" | "edit" | null>(null)

  const {createStudent} = useStudentMutations();
  const handleAddStudent = async(newStudent: Partial<Student>) => {
    const student: Student = {
      studentId: newStudent.studentId!,
      studentGeneratedId: newStudent.studentGeneratedId!,
      studentName: newStudent.studentName!,
      studentEmail: newStudent.studentEmail!,
      studentPhone: newStudent.studentPhone!,
      studentRoom: newStudent.studentRoom!,
      studentStatus: newStudent.studentStatus as Student["studentStatus"],
      studentCheckInDate: newStudent.studentCheckInDate || new Date().toISOString().split("T")[0],
      studentGender: newStudent.studentGender!,
      studentGuardianName: newStudent.studentGuardianName!,
      studentGuardianPhone: newStudent.studentGuardianPhone!,
      studentGuardianAddress: newStudent.studentGuardianAddress!,
      studentGuardianRelation: newStudent.studentGuardianRelation!
    }

    await createStudent(JSON.stringify(student))
    setStudents([...students, student])
    setIsAddStudentDialogOpen(false)
  }

  const handleEditStudent = (updatedStudent: Partial<Student>) => {
    if (!selectedStudent) return

    setStudents(students.map(student => 
      student.studentId === selectedStudent.studentId
        ? { ...student, ...updatedStudent }
        : student
    ))
    setSelectedStudent(null)
    setViewMode(null)
  }

  const handleDeleteStudent = (studentId: string) => {
    setStudents(students.filter(student => student.studentId !== studentId))
  }

  const handleActiveToggle = (studentId: string, status: "Active" | "Inactive") => {
    setStudents(students.map(student =>
      student.studentId === studentId
        ? { ...student, studentStatus: status }
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
                <TableRow key={student.studentId}>
                  <TableCell className="font-medium">{student.studentId}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {student.studentName}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        <span className="text-sm">{student.studentEmail}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        <span className="text-sm">{student.studentPhone}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{student.studentRoom}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(student.studentStatus)}>
                      {student.studentStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>{student.studentCheckInDate}</TableCell>
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
                            handleActiveToggle(student.studentId, "Active")
                          }}>
                          <Check className="mr-2 h-4 w-4" />
                          Mark as Active
                        </DropdownMenuItem>
                        <DropdownMenuItem
                        onClick={() => {
                          handleActiveToggle(student.studentId, "Inactive")
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
                          onClick={() => handleDeleteStudent(student.studentId)}
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