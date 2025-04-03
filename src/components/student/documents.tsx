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
} from "lucide-react"

export function StudentDocuments() {
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
            <CardTitle>Required Documents</CardTitle>
            <CardDescription>Documents needed for hostel stay</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">ID Proof</p>
                  <p className="text-sm text-muted-foreground">
                    Aadhar Card / Passport
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="icon">
                  <Upload className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Address Proof</p>
                  <p className="text-sm text-muted-foreground">
                    Utility Bill / Rental Agreement
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="icon">
                  <Upload className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Document Status</CardTitle>
            <CardDescription>Current status of your submissions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <div>
                  <p className="font-medium">ID Proof</p>
                  <p className="text-sm text-muted-foreground">
                    Verified on March 1, 2024
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Clock className="h-5 w-5 text-yellow-500" />
                <div>
                  <p className="font-medium">Address Proof</p>
                  <p className="text-sm text-muted-foreground">
                    Pending verification
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <AlertCircle className="h-5 w-5 text-red-500" />
                <div>
                  <p className="font-medium">Medical Certificate</p>
                  <p className="text-sm text-muted-foreground">
                    Rejected - Please resubmit
                  </p>
                </div>
              </div>
            </div>
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
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">ID Proof Submission</p>
                <p className="text-sm text-muted-foreground">
                  February 28, 2024
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-green-500">Approved</p>
                <p className="text-xs text-muted-foreground">
                  March 1, 2024
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Address Proof Submission</p>
                <p className="text-sm text-muted-foreground">
                  March 5, 2024
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-yellow-500">Pending</p>
                <p className="text-xs text-muted-foreground">
                  Under review
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Medical Certificate Submission</p>
                <p className="text-sm text-muted-foreground">
                  March 10, 2024
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-red-500">Rejected</p>
                <p className="text-xs text-muted-foreground">
                  March 11, 2024
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 