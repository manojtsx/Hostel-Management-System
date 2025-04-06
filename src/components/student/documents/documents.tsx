"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  FileText,
  Upload,
  Download,
  AlertCircle,
  CheckCircle2,
  Clock,
  Plus,
  Trash,
  Eye,
  FileCheck,
  FileX,
  FileClock,
} from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
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

interface Document {
  id: string
  name: string
  type: string
  status: "verified" | "pending" | "rejected" | "expired"
  uploadedAt: string
  verifiedAt?: string
  expiryDate?: string
  fileUrl?: string
  rejectionReason?: string
}

interface DocumentHistory {
  id: string
  documentId: string
  action: "upload" | "verify" | "reject" | "expire"
  date: string
  comment?: string
}

export function StudentDocuments() {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "1",
      name: "ID Proof",
      type: "Aadhar Card",
      status: "verified",
      uploadedAt: "2024-02-28",
      verifiedAt: "2024-03-01",
      expiryDate: "2029-03-01",
      fileUrl: "/documents/id-proof.pdf",
    },
    {
      id: "2",
      name: "Address Proof",
      type: "Utility Bill",
      status: "pending",
      uploadedAt: "2024-03-05",
      fileUrl: "/documents/address-proof.pdf",
    },
    {
      id: "3",
      name: "Medical Certificate",
      type: "Health Report",
      status: "rejected",
      uploadedAt: "2024-03-10",
      rejectionReason: "Certificate is more than 3 months old",
      fileUrl: "/documents/medical-certificate.pdf",
    },
  ])

  const [documentHistory, setDocumentHistory] = useState<DocumentHistory[]>([
    {
      id: "1",
      documentId: "1",
      action: "upload",
      date: "2024-02-28",
      comment: "Initial submission",
    },
    {
      id: "2",
      documentId: "1",
      action: "verify",
      date: "2024-03-01",
      comment: "Document verified successfully",
    },
    {
      id: "3",
      documentId: "2",
      action: "upload",
      date: "2024-03-05",
      comment: "Address proof submitted",
    },
    {
      id: "4",
      documentId: "3",
      action: "upload",
      date: "2024-03-10",
      comment: "Medical certificate submitted",
    },
    {
      id: "5",
      documentId: "3",
      action: "reject",
      date: "2024-03-11",
      comment: "Certificate is more than 3 months old",
    },
  ])

  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)
  const [newDocument, setNewDocument] = useState<Partial<Document>>({
    name: "",
    type: "",
  })

  const handleUpload = () => {
    if (!newDocument.name || !newDocument.type) {
      toast.error("Please fill in all required fields")
      return
    }

    const document: Document = {
      id: Date.now().toString(),
      name: newDocument.name,
      type: newDocument.type,
      status: "pending",
      uploadedAt: new Date().toISOString().split("T")[0],
    }

    setDocuments([...documents, document])
    setDocumentHistory([
      ...documentHistory,
      {
        id: Date.now().toString(),
        documentId: document.id,
        action: "upload",
        date: document.uploadedAt,
        comment: "New document uploaded",
      },
    ])

    setIsUploadDialogOpen(false)
    setNewDocument({ name: "", type: "" })
    toast.success("Document uploaded successfully")
  }

  const handleDelete = (documentId: string) => {
    setDocuments(documents.filter((doc) => doc.id !== documentId))
    toast.success("Document deleted successfully")
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-500" />
      case "rejected":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      case "expired":
        return <FileX className="h-5 w-5 text-red-500" />
      default:
        return <FileClock className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-green-500"
      case "pending":
        return "bg-yellow-500"
      case "rejected":
        return "bg-red-500"
      case "expired":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Documents</h1>
        <p className="text-muted-foreground">
          Manage your hostel documents and submissions
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Required Documents</CardTitle>
                <CardDescription>Documents needed for hostel stay</CardDescription>
              </div>
              <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Upload Document
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Upload New Document</DialogTitle>
                    <DialogDescription>
                      Submit a new document for verification
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Document Name</Label>
                      <Input
                        id="name"
                        value={newDocument.name}
                        onChange={(e) => setNewDocument({ ...newDocument, name: e.target.value })}
                        placeholder="e.g., ID Proof, Address Proof"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="type">Document Type</Label>
                      <Select
                        value={newDocument.type}
                        onValueChange={(value) => setNewDocument({ ...newDocument, type: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select document type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Aadhar Card">Aadhar Card</SelectItem>
                          <SelectItem value="Passport">Passport</SelectItem>
                          <SelectItem value="Utility Bill">Utility Bill</SelectItem>
                          <SelectItem value="Rental Agreement">Rental Agreement</SelectItem>
                          <SelectItem value="Medical Certificate">Medical Certificate</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="file">Document File</Label>
                      <Input id="file" type="file" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleUpload}>Upload</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {documents.map((document) => (
              <div key={document.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{document.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {document.type}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Uploaded: {document.uploadedAt}
                    </p>
                    {document.expiryDate && (
                      <p className="text-sm text-muted-foreground">
                        Expires: {document.expiryDate}
                      </p>
                    )}
                    {document.rejectionReason && (
                      <p className="text-sm text-red-500">
                        {document.rejectionReason}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {document.fileUrl && (
                    <Button variant="outline" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                  )}
                  <Button variant="outline" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDelete(document.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Document Status</CardTitle>
            <CardDescription>Current status of your submissions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {documents.map((document) => (
              <div key={document.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {getStatusIcon(document.status)}
                  <div>
                    <p className="font-medium">{document.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {document.type}
                    </p>
                    {document.verifiedAt && (
                      <p className="text-sm text-muted-foreground">
                        Verified: {document.verifiedAt}
                      </p>
                    )}
                  </div>
                </div>
                <Badge className={getStatusColor(document.status)}>
                  {document.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Document History</CardTitle>
          <CardDescription>Your document submission timeline</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {documentHistory.map((history) => {
              const document = documents.find((doc) => doc.id === history.documentId)
              return (
                <div key={history.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">
                      {document?.name} - {history.action}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {history.date}
                    </p>
                    {history.comment && (
                      <p className="text-sm text-muted-foreground">
                        {history.comment}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <Badge
                      className={
                        history.action === "verify"
                          ? "bg-green-500"
                          : history.action === "reject"
                          ? "bg-red-500"
                          : "bg-blue-500"
                      }
                    >
                      {history.action}
                    </Badge>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 