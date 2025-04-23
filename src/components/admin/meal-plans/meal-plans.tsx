"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Plus, Utensils, Clock, ChevronLeft, ChevronRight, MoreVertical } from "lucide-react"
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
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { getMealPlans } from "./MealPlanServer"
import useMealPlanMutations from "./MealPlanMutations"
import { useDebounce } from "@/utils/debounce/usedebounce"
import { MealType, DayOfWeek } from "@prisma/client"
import { Pagination } from "@/components/pagination"
import { Switch } from "@/components/ui/switch"

interface MealPlan {
  mealPlanId: string
  title: string
  description: string | null
  mealType: MealType
  dayOfWeek: DayOfWeek
  menuItems: string[]
  price: number
  isActive: boolean
}

interface MealPlanFormProps {
  mealPlan?: MealPlan
  onSubmit: (mealPlan: Partial<MealPlan>) => void
  onCancel: () => void
  mode: "add" | "edit"
}

function MealPlanForm({ mealPlan, onSubmit, onCancel, mode }: MealPlanFormProps) {
  const [formData, setFormData] = useState<Partial<MealPlan>>(
    mealPlan || {
      title: "",
      description: "",
      mealType: "Breakfast",
      dayOfWeek: "Monday",
      menuItems: [],
      price: 0,
      isActive: true
    }
  )

  const [menuItem, setMenuItem] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleAddMenuItem = () => {
    if (menuItem.trim()) {
      setFormData({
        ...formData,
        menuItems: [...(formData.menuItems || []), menuItem.trim()]
      })
      setMenuItem("")
    }
  }

  const handleRemoveMenuItem = (index: number) => {
    setFormData({
      ...formData,
      menuItems: formData.menuItems?.filter((_, i) => i !== index)
    })
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
        <Label htmlFor="description" className="text-right">
          Description
        </Label>
        <Input
          id="description"
          value={formData.description || ""}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="col-span-3"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="mealType" className="text-right">
          Meal Type
        </Label>
        <Select
          value={formData.mealType}
          onValueChange={(value) => setFormData({ ...formData, mealType: value as MealType })}
        >
          <SelectTrigger className="col-span-3">
            <SelectValue placeholder="Select meal type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Breakfast">Breakfast</SelectItem>
            <SelectItem value="Lunch">Lunch</SelectItem>
            <SelectItem value="Dinner">Dinner</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="dayOfWeek" className="text-right">
          Day of Week
        </Label>
        <Select
          value={formData.dayOfWeek}
          onValueChange={(value) => setFormData({ ...formData, dayOfWeek: value as DayOfWeek })}
        >
          <SelectTrigger className="col-span-3">
            <SelectValue placeholder="Select day" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Monday">Monday</SelectItem>
            <SelectItem value="Tuesday">Tuesday</SelectItem>
            <SelectItem value="Wednesday">Wednesday</SelectItem>
            <SelectItem value="Thursday">Thursday</SelectItem>
            <SelectItem value="Friday">Friday</SelectItem>
            <SelectItem value="Saturday">Saturday</SelectItem>
            <SelectItem value="Sunday">Sunday</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="price" className="text-right">
          Price
        </Label>
        <Input
          id="price"
          type="number"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
          className="col-span-3"
          required
          min="0"
          step="0.01"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="menuItems" className="text-right">
          Menu Items
        </Label>
        <div className="col-span-3 space-y-2">
          <div className="flex space-x-2">
            <Input
              value={menuItem}
              onChange={(e) => setMenuItem(e.target.value)}
              placeholder="Add menu item"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  handleAddMenuItem()
                }
              }}
            />
            <Button type="button" onClick={handleAddMenuItem}>
              Add
            </Button>
          </div>
          <div className="space-y-1">
            {formData.menuItems?.map((item, index) => (
              <div key={index} className="flex items-center justify-between bg-muted p-2 rounded">
                <span>{item}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveMenuItem(index)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
      {mode === "edit" && (
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="isActive" className="text-right">
            Active
          </Label>
          <div className="col-span-3">
            <Switch
              id="isActive"
              checked={formData.isActive}
              onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
            />
          </div>
        </div>
      )}
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {mode === "add" ? "Add Meal Plan" : "Update Meal Plan"}
        </Button>
      </DialogFooter>
    </form>
  )
}

function ViewMealPlanDialog({
  mealPlan,
  onClose,
}: {
  mealPlan: MealPlan
  onClose: () => void
}) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{mealPlan.title}</DialogTitle>
          <DialogDescription>
            <div className="flex items-center space-x-2 mt-2">
              <Badge variant={mealPlan.isActive ? "default" : "secondary"}>
                {mealPlan.isActive ? "Active" : "Inactive"}
              </Badge>
              <Badge>{mealPlan.mealType}</Badge>
              <Badge variant="outline">{mealPlan.dayOfWeek}</Badge>
            </div>
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {mealPlan.description && (
            <div>
              <h3 className="font-medium">Description</h3>
              <p className="text-sm text-muted-foreground mt-1">{mealPlan.description}</p>
            </div>
          )}
          <div>
            <h3 className="font-medium">Menu Items</h3>
            <ul className="list-disc list-inside text-sm text-muted-foreground mt-1">
              {mealPlan.menuItems.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-medium">Price</h3>
            <p className="text-sm text-muted-foreground mt-1">${mealPlan.price.toFixed(2)}</p>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default function MealPlanManagement() {
  const [isAddMealPlanDialogOpen, setIsAddMealPlanDialogOpen] = useState(false)
  const [isEditMealPlanDialogOpen, setIsEditMealPlanDialogOpen] = useState(false)
  const [isViewMealPlanDialogOpen, setIsViewMealPlanDialogOpen] = useState(false)
  const [selectedMealPlan, setSelectedMealPlan] = useState<MealPlan | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [filters, setFilters] = useState({
    mealType: "All",
    dayOfWeek: "All",
  })
  const debouncedSearchQuery = useDebounce(searchQuery, 500)

  const {
    createMealPlan,
    isCreatingMealPlan,
    updateMealPlan,
    isUpdatingMealPlan,
    removeMealPlan,
    isRemovingMealPlan,
    changeMealPlanStatus,
    isUpdatingMealPlanStatus
  } = useMealPlanMutations()

  const { data: mealPlansData, isLoading } = useQuery({
    queryKey: ["meal-plans", currentPage, debouncedSearchQuery, filters],
    queryFn: () => getMealPlans(currentPage, pageSize, debouncedSearchQuery, filters),
  })

  const handleAddMealPlan = async (newMealPlan: Partial<MealPlan>) => {
    await createMealPlan(JSON.stringify(newMealPlan))
    setIsAddMealPlanDialogOpen(false)
  }

  const handleEditMealPlan = async (updatedMealPlan: Partial<MealPlan>) => {
    if (selectedMealPlan) {
      await updateMealPlan(
        JSON.stringify({
          ...updatedMealPlan,
          mealPlanId: selectedMealPlan.mealPlanId,
        })
      )
      setIsEditMealPlanDialogOpen(false)
    }
  }

  const handleDeleteMealPlan = async (mealPlanId: string) => {
    await removeMealPlan(mealPlanId)
  }

  const handleToggleMealPlanStatus = async (mealPlanId: string, isActive: boolean) => {
    await changeMealPlanStatus({ mealPlanId, isActive })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Meal Plans</h1>
          <p className="text-muted-foreground">
            Manage meal plans and menus
          </p>
        </div>
        <Dialog open={isAddMealPlanDialogOpen} onOpenChange={setIsAddMealPlanDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Meal Plan
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Meal Plan</DialogTitle>
              <DialogDescription>
                Fill in the details to add a new meal plan
              </DialogDescription>
            </DialogHeader>
            <MealPlanForm
              onSubmit={handleAddMealPlan}
              onCancel={() => setIsAddMealPlanDialogOpen(false)}
              mode="add"
            />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Meal Plans</CardTitle>
          <CardDescription>
            View and manage meal plans
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-1 items-center space-x-2">
              <Input
                placeholder="Search meal plans..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-8 w-[150px] lg:w-[250px]"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Select
                value={filters.mealType}
                onValueChange={(value) => setFilters({ ...filters, mealType: value })}
              >
                <SelectTrigger className="h-8 w-[130px]">
                  <SelectValue placeholder="Meal Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Types</SelectItem>
                  <SelectItem value="Breakfast">Breakfast</SelectItem>
                  <SelectItem value="Lunch">Lunch</SelectItem>
                  <SelectItem value="Dinner">Dinner</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={filters.dayOfWeek}
                onValueChange={(value) => setFilters({ ...filters, dayOfWeek: value })}
              >
                <SelectTrigger className="h-8 w-[130px]">
                  <SelectValue placeholder="Day" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Days</SelectItem>
                  <SelectItem value="Monday">Monday</SelectItem>
                  <SelectItem value="Tuesday">Tuesday</SelectItem>
                  <SelectItem value="Wednesday">Wednesday</SelectItem>
                  <SelectItem value="Thursday">Thursday</SelectItem>
                  <SelectItem value="Friday">Friday</SelectItem>
                  <SelectItem value="Saturday">Saturday</SelectItem>
                  <SelectItem value="Sunday">Sunday</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            {isLoading ? (
              <div className="text-center py-4">Loading meal plans...</div>
            ) : mealPlansData?.data && mealPlansData.data.length === 0 ? (
              <div className="text-center py-4">No meal plans found</div>
            ) : (
              mealPlansData?.data?.map((mealPlan) => (
                <div
                  key={mealPlan.mealPlanId}
                  className="flex items-start space-x-4 rounded-lg border p-4"
                >
                  <div className="flex-shrink-0">
                    <Utensils className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{mealPlan.title}</h3>
                      <div className="flex items-center space-x-2">
                        <Badge variant={mealPlan.isActive ? "default" : "secondary"}>
                          {mealPlan.isActive ? "Active" : "Inactive"}
                        </Badge>
                        <Badge>{mealPlan.mealType}</Badge>
                        <Badge variant="outline">{mealPlan.dayOfWeek}</Badge>
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
                                setSelectedMealPlan(mealPlan)
                                setIsViewMealPlanDialogOpen(true)
                              }}
                            >
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedMealPlan(mealPlan)
                                setIsEditMealPlanDialogOpen(true)
                              }}
                            >
                              Edit Meal Plan
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleToggleMealPlanStatus(mealPlan.mealPlanId, !mealPlan.isActive)}
                            >
                              {mealPlan.isActive ? "Deactivate" : "Activate"}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => handleDeleteMealPlan(mealPlan.mealPlanId)}
                            >
                              Delete Meal Plan
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>${mealPlan.price.toFixed(2)}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {mealPlan.description}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {mealPlan.menuItems.map((item, index) => (
                        <Badge key={index} variant="outline">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {mealPlansData && mealPlansData.totalPages && mealPlansData.totalPages > 1 && (
            <div className="mt-4">
              <Pagination
                currentPage={currentPage}
                totalItems={mealPlansData.total}
                pageSize={pageSize}
                onPageChange={setCurrentPage}
                onPageSizeChange={pageSize => setPageSize(pageSize)}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {isEditMealPlanDialogOpen && selectedMealPlan && (
        <Dialog open={isEditMealPlanDialogOpen} onOpenChange={setIsEditMealPlanDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Meal Plan</DialogTitle>
              <DialogDescription>
                Update the details of the meal plan
              </DialogDescription>
            </DialogHeader>
            <MealPlanForm
              mealPlan={selectedMealPlan}
              onSubmit={handleEditMealPlan}
              onCancel={() => setIsEditMealPlanDialogOpen(false)}
              mode="edit"
            />
          </DialogContent>
        </Dialog>
      )}

      {isViewMealPlanDialogOpen && selectedMealPlan && (
        <ViewMealPlanDialog
          mealPlan={selectedMealPlan}
          onClose={() => setIsViewMealPlanDialogOpen(false)}
        />
      )}
    </div>
  )
} 