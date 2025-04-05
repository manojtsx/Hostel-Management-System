import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import { Badge } from "@/components/ui/badge"
  import { Input } from "@/components/ui/input"
  import { Search, Clock } from "lucide-react"
  
  // Mock data - replace with actual data from your backend
  const auditLogs = [
    {
      id: "1",
      action: "User Created",
      user: "John Doe",
      target: "Jane Smith",
      timestamp: "2024-03-15 14:30:00",
      ipAddress: "192.168.1.1",
    },
    {
      id: "2",
      action: "Hostel Approved",
      user: "Admin User",
      target: "Sunrise Hostel",
      timestamp: "2024-03-15 13:45:00",
      ipAddress: "192.168.1.2",
    },
    // Add more mock audit logs as needed
  ]
  
  export default function AuditLogsPage() {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Audit Logs</h1>
          <p className="text-gray-500">Track actions taken by Admins for security & transparency</p>
        </div>
  
        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search audit logs..."
              className="pl-8"
            />
          </div>
        </div>
  
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Action</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Target</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>IP Address</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {auditLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>
                    <Badge variant="outline">{log.action}</Badge>
                  </TableCell>
                  <TableCell className="font-medium">{log.user}</TableCell>
                  <TableCell>{log.target}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4 text-gray-500" />
                      {log.timestamp}
                    </div>
                  </TableCell>
                  <TableCell>{log.ipAddress}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    )
  } 