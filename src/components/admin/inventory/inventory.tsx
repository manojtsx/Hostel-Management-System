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
import { Plus, Package, MoreVertical, AlertCircle, Search, Filter } from "lucide-react"
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
import { useState } from "react"

interface InventoryItem {
  id: number
  name: string
  category: string
  quantity: number
  minQuantity: number
  status: "In Stock" | "Low Stock" | "Out of Stock"
  lastUpdated: string
  location: string
  supplier: string
  unit: string
  notes: string
}

export function InventoryManagement() {
  const [inventory, setInventory] = useState<InventoryItem[]>([
    {
      id: 1,
      name: "Bed Sheets",
      category: "Bedding",
      quantity: 150,
      minQuantity: 50,
      status: "In Stock",
      lastUpdated: "2024-03-10",
      location: "Store Room A",
      supplier: "Textile Co.",
      unit: "pieces",
      notes: "Standard size for hostel beds",
    },
    {
      id: 2,
      name: "Study Tables",
      category: "Furniture",
      quantity: 8,
      minQuantity: 10,
      status: "Low Stock",
      lastUpdated: "2024-03-08",
      location: "Store Room B",
      supplier: "Furniture World",
      unit: "pieces",
      notes: "Wooden study tables",
    },
    {
      id: 3,
      name: "Cleaning Supplies",
      category: "Maintenance",
      quantity: 200,
      minQuantity: 50,
      status: "In Stock",
      lastUpdated: "2024-03-12",
      location: "Store Room C",
      supplier: "CleanPro",
      unit: "units",
      notes: "Monthly restock required",
    },
    {
      id: 4,
      name: "Light Bulbs",
      category: "Electrical",
      quantity: 15,
      minQuantity: 20,
      status: "Low Stock",
      lastUpdated: "2024-03-11",
      location: "Store Room A",
      supplier: "ElectroMart",
      unit: "pieces",
      notes: "LED bulbs, 15W",
    },
  ])

  const [isAddItemDialogOpen, setIsAddItemDialogOpen] = useState(false)
  const [newItem, setNewItem] = useState<Omit<InventoryItem, "id" | "status" | "lastUpdated">>({
    name: "",
    category: "",
    quantity: 0,
    minQuantity: 0,
    location: "",
    supplier: "",
    unit: "pieces",
    notes: "",
  })

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")

  const categories = Array.from(new Set(inventory.map(item => item.category)))
  const locations = Array.from(new Set(inventory.map(item => item.location)))

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "in stock":
        return "bg-green-500"
      case "low stock":
        return "bg-yellow-500"
      case "out of stock":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const handleAddItem = () => {
    if (!newItem.name || !newItem.category || !newItem.quantity || !newItem.minQuantity) return

    const status = newItem.quantity <= newItem.minQuantity ? "Low Stock" : "In Stock"

    const item: InventoryItem = {
      id: inventory.length + 1,
      ...newItem,
      status,
      lastUpdated: new Date().toISOString().split("T")[0],
    }

    setInventory([...inventory, item])
    setNewItem({
      name: "",
      category: "",
      quantity: 0,
      minQuantity: 0,
      location: "",
      supplier: "",
      unit: "pieces",
      notes: "",
    })
    setIsAddItemDialogOpen(false)
  }

  const handleDeleteItem = (itemId: number) => {
    setInventory(inventory.filter(item => item.id !== itemId))
  }

  const handleEditItem = (itemId: number, updates: Partial<InventoryItem>) => {
    setInventory(inventory.map(item => 
      item.id === itemId ? { ...item, ...updates, lastUpdated: new Date().toISOString().split("T")[0] } : item
    ))
  }

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
    const matchesStatus = selectedStatus === "all" || item.status === selectedStatus
    return matchesSearch && matchesCategory && matchesStatus
  })

  const inventoryStats = {
    totalItems: inventory.length,
    lowStockItems: inventory.filter(item => item.status === "Low Stock").length,
    outOfStockItems: inventory.filter(item => item.status === "Out of Stock").length,
    totalCategories: categories.length,
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Inventory</h1>
          <p className="text-muted-foreground">
            Manage hostel inventory and supplies
          </p>
        </div>
        <Dialog open={isAddItemDialogOpen} onOpenChange={setIsAddItemDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Item
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Inventory Item</DialogTitle>
              <DialogDescription>
                Fill in the details to add a new inventory item
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Category
                </Label>
                <Input
                  id="category"
                  value={newItem.category}
                  onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="quantity" className="text-right">
                  Quantity
                </Label>
                <Input
                  id="quantity"
                  type="number"
                  value={newItem.quantity}
                  onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="minQuantity" className="text-right">
                  Min Quantity
                </Label>
                <Input
                  id="minQuantity"
                  type="number"
                  value={newItem.minQuantity}
                  onChange={(e) => setNewItem({ ...newItem, minQuantity: parseInt(e.target.value) })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="location" className="text-right">
                  Location
                </Label>
                <Input
                  id="location"
                  value={newItem.location}
                  onChange={(e) => setNewItem({ ...newItem, location: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="supplier" className="text-right">
                  Supplier
                </Label>
                <Input
                  id="supplier"
                  value={newItem.supplier}
                  onChange={(e) => setNewItem({ ...newItem, supplier: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="unit" className="text-right">
                  Unit
                </Label>
                <Select
                  value={newItem.unit}
                  onValueChange={(value) => setNewItem({ ...newItem, unit: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pieces">Pieces</SelectItem>
                    <SelectItem value="units">Units</SelectItem>
                    <SelectItem value="kg">Kilograms</SelectItem>
                    <SelectItem value="liters">Liters</SelectItem>
                    <SelectItem value="boxes">Boxes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="notes" className="text-right">
                  Notes
                </Label>
                <Input
                  id="notes"
                  value={newItem.notes}
                  onChange={(e) => setNewItem({ ...newItem, notes: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddItemDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddItem}>Add Item</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inventoryStats.totalItems}</div>
            <p className="text-xs text-muted-foreground">
              Across all categories
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inventoryStats.lowStockItems}</div>
            <p className="text-xs text-muted-foreground">
              Need attention
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inventoryStats.outOfStockItems}</div>
            <p className="text-xs text-muted-foreground">
              Urgent restock needed
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inventoryStats.totalCategories}</div>
            <p className="text-xs text-muted-foreground">
              Active categories
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="In Stock">In Stock</SelectItem>
            <SelectItem value="Low Stock">Low Stock</SelectItem>
            <SelectItem value="Out of Stock">Out of Stock</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Inventory List</CardTitle>
          <CardDescription>
            View and manage inventory items
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInventory.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <span>{item.quantity} {item.unit}</span>
                      {item.quantity <= item.minQuantity && (
                        <AlertCircle className="h-4 w-4 text-yellow-500" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(item.status)}>
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{item.location}</TableCell>
                  <TableCell>{item.lastUpdated}</TableCell>
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
                        <DropdownMenuItem onClick={() => handleEditItem(item.id, { quantity: item.quantity + 1 })}>
                          Add Stock
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditItem(item.id, { quantity: item.quantity - 1 })}>
                          Remove Stock
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleEditItem(item.id, { location: "Store Room A" })}>
                          Move to Store Room A
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditItem(item.id, { location: "Store Room B" })}>
                          Move to Store Room B
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditItem(item.id, { location: "Store Room C" })}>
                          Move to Store Room C
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleDeleteItem(item.id)}
                        >
                          Delete Item
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
    </div>
  )
} 