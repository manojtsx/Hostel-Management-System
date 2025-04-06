"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import {
  Package,
  Plus,
  X,
  Clock,
  CheckCircle2,
  AlertCircle,
  Search,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface InventoryItem {
  id: string
  name: string
  category: string
  quantity: number
  available: number
  description: string
  location: string
}

interface Request {
  id: string
  itemId: string
  itemName: string
  quantity: number
  status: "pending" | "approved" | "rejected"
  requestDate: string
  approvalDate?: string
  reason?: string
}

export function StudentInventory() {
  const [inventory, setInventory] = useState<InventoryItem[]>([
    {
      id: "1",
      name: "Study Table",
      category: "Furniture",
      quantity: 10,
      available: 5,
      description: "Standard study table with drawer",
      location: "Storage Room A",
    },
    {
      id: "2",
      name: "Chair",
      category: "Furniture",
      quantity: 15,
      available: 8,
      description: "Ergonomic study chair",
      location: "Storage Room A",
    },
    {
      id: "3",
      name: "Bedside Lamp",
      category: "Electronics",
      quantity: 20,
      available: 12,
      description: "LED bedside lamp with adjustable brightness",
      location: "Storage Room B",
    },
  ])

  const [requests, setRequests] = useState<Request[]>([
    {
      id: "1",
      itemId: "1",
      itemName: "Study Table",
      quantity: 1,
      status: "approved",
      requestDate: "2024-03-10",
      approvalDate: "2024-03-11",
    },
    {
      id: "2",
      itemId: "2",
      itemName: "Chair",
      quantity: 1,
      status: "pending",
      requestDate: "2024-03-15",
    },
  ])

  const [newRequest, setNewRequest] = useState<Partial<Request>>({
    itemId: "",
    quantity: 1,
  })

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredInventory = inventory.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const requestItem = () => {
    if (!newRequest.itemId || !newRequest.quantity) {
      toast.error("Please select an item and quantity")
      return
    }

    const item = inventory.find((i) => i.id === newRequest.itemId)
    if (!item) {
      toast.error("Item not found")
      return
    }

    if (newRequest.quantity > item.available) {
      toast.error("Requested quantity exceeds available items")
      return
    }

    const request: Request = {
      id: Math.random().toString(36).substr(2, 9),
      itemId: newRequest.itemId!,
      itemName: item.name,
      quantity: newRequest.quantity!,
      status: "pending",
      requestDate: new Date().toISOString(),
    }

    setRequests([...requests, request])
    setNewRequest({ itemId: "", quantity: 1 })
    toast.success("Request submitted successfully")
  }

  const getStatusColor = (status: Request["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500"
      case "approved":
        return "bg-green-500"
      case "rejected":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusIcon = (status: Request["status"]) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />
      case "approved":
        return <CheckCircle2 className="h-4 w-4" />
      case "rejected":
        return <AlertCircle className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Inventory</h1>
        <p className="text-muted-foreground">
          View and request hostel inventory items
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Available Items</CardTitle>
            <CardDescription>Browse and request items</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search items..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8"
                  />
                </div>
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Furniture">Furniture</SelectItem>
                    <SelectItem value="Electronics">Electronics</SelectItem>
                    <SelectItem value="Appliances">Appliances</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                {filteredInventory.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-lg border p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {item.category}
                        </p>
                      </div>
                      <Badge
                        variant={
                          item.available > 0 ? "default" : "destructive"
                        }
                      >
                        {item.available} available
                      </Badge>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {item.description}
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Location: {item.location}
                    </p>
                    {item.available > 0 && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-4"
                        onClick={() =>
                          setNewRequest({
                            ...newRequest,
                            itemId: item.id,
                          })
                        }
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Request Item
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your Requests</CardTitle>
            <CardDescription>Track your inventory requests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {requests.map((request) => (
                <div
                  key={request.id}
                  className="rounded-lg border p-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{request.itemName}</h3>
                      <p className="text-sm text-muted-foreground">
                        Quantity: {request.quantity}
                      </p>
                    </div>
                    <Badge className={getStatusColor(request.status)}>
                      <div className="flex items-center space-x-1">
                        {getStatusIcon(request.status)}
                        <span>{request.status}</span>
                      </div>
                    </Badge>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Requested on:{" "}
                    {new Date(request.requestDate).toLocaleDateString()}
                  </p>
                  {request.approvalDate && (
                    <p className="mt-2 text-sm text-muted-foreground">
                      Approved on:{" "}
                      {new Date(request.approvalDate).toLocaleDateString()}
                    </p>
                  )}
                  {request.reason && (
                    <p className="mt-2 text-sm text-red-500">
                      Reason: {request.reason}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {newRequest.itemId && (
        <Card>
          <CardHeader>
            <CardTitle>Request Item</CardTitle>
            <CardDescription>Submit your request</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  value={newRequest.quantity}
                  onChange={(e) =>
                    setNewRequest({
                      ...newRequest,
                      quantity: parseInt(e.target.value),
                    })
                  }
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setNewRequest({ itemId: "", quantity: 1 })}
                >
                  Cancel
                </Button>
                <Button onClick={requestItem}>Submit Request</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 