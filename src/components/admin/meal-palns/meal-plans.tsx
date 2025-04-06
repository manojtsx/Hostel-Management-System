"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Plus, MoreVertical } from "lucide-react"
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

interface Menu {
  breakfast: string[]
  lunch: string[]
  dinner: string[]
}

interface MealPlan {
  id: number
  name: string
  description: string
  price: string
  mealsPerDay: number
  menu: Menu
  status: "Active" | "Inactive"
}

export function MealPlansManagement() {
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([
    {
      id: 1,
      name: "Standard Plan",
      description: "Basic meal plan with regular menu items",
      price: "₹5000/month",
      mealsPerDay: 3,
      menu: {
        breakfast: ["Idli", "Dosa", "Poha", "Upma"],
        lunch: ["Rice", "Dal", "Vegetables", "Curd"],
        dinner: ["Roti", "Sabzi", "Dal", "Rice"],
      },
      status: "Active",
    },
    {
      id: 2,
      name: "Premium Plan",
      description: "Enhanced meal plan with additional options",
      price: "₹7000/month",
      mealsPerDay: 3,
      menu: {
        breakfast: ["Idli", "Dosa", "Poha", "Upma", "Puri", "Paratha"],
        lunch: ["Rice", "Dal", "Vegetables", "Curd", "Salad", "Sweet"],
        dinner: ["Roti", "Sabzi", "Dal", "Rice", "Soup", "Dessert"],
      },
      status: "Active",
    },
    {
      id: 3,
      name: "Special Diet Plan",
      description: "Customized meal plan for special dietary requirements",
      price: "₹8000/month",
      mealsPerDay: 3,
      menu: {
        breakfast: ["Oats", "Fruits", "Nuts", "Milk"],
        lunch: ["Brown Rice", "Quinoa", "Grilled Vegetables", "Tofu"],
        dinner: ["Whole Wheat Roti", "Steamed Vegetables", "Lentils", "Salad"],
      },
      status: "Active",
    },
  ])

  const [isAddMealPlanDialogOpen, setIsAddMealPlanDialogOpen] = useState(false)
  const [newMealPlan, setNewMealPlan] = useState<Omit<MealPlan, "id">>({
    name: "",
    description: "",
    price: "",
    mealsPerDay: 3,
    menu: {
      breakfast: [],
      lunch: [],
      dinner: [],
    },
    status: "Active",
  })

  const [newMenuItem, setNewMenuItem] = useState({
    mealType: "breakfast" as keyof Menu,
    item: "",
  })

  const handleAddMealPlan = () => {
    if (!newMealPlan.name || !newMealPlan.description || !newMealPlan.price) return

    const mealPlan: MealPlan = {
      id: mealPlans.length + 1,
      ...newMealPlan,
    }

    setMealPlans([...mealPlans, mealPlan])
    setNewMealPlan({
      name: "",
      description: "",
      price: "",
      mealsPerDay: 3,
      menu: {
        breakfast: [],
        lunch: [],
        dinner: [],
      },
      status: "Active",
    })
    setIsAddMealPlanDialogOpen(false)
  }

  const handleDeleteMealPlan = (mealPlanId: number) => {
    setMealPlans(mealPlans.filter(plan => plan.id !== mealPlanId))
  }

  const handleEditMealPlan = (mealPlanId: number, updates: Partial<MealPlan>) => {
    setMealPlans(mealPlans.map(plan => 
      plan.id === mealPlanId ? { ...plan, ...updates } : plan
    ))
  }

  const handleAddMenuItem = () => {
    if (!newMenuItem.item) return

    setNewMealPlan(prev => {
      const updatedMenu = { ...prev.menu }
      updatedMenu[newMenuItem.mealType] = [...updatedMenu[newMenuItem.mealType], newMenuItem.item]
      
      return {
        ...prev,
        menu: updatedMenu,
      }
    })
    setNewMenuItem({ mealType: "breakfast", item: "" })
  }

  const handleRemoveMenuItem = (mealType: keyof Menu, item: string) => {
    setNewMealPlan(prev => {
      const updatedMenu = { ...prev.menu }
      updatedMenu[mealType] = updatedMenu[mealType].filter(i => i !== item)
      
      return {
        ...prev,
        menu: updatedMenu,
      }
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Meal Plans</h1>
          <p className="text-muted-foreground">
            Manage hostel meal plans and menus
          </p>
        </div>
        <Dialog open={isAddMealPlanDialogOpen} onOpenChange={setIsAddMealPlanDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Meal Plan
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Meal Plan</DialogTitle>
              <DialogDescription>
                Fill in the details to create a new meal plan
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newMealPlan.name}
                  onChange={(e) => setNewMealPlan({ ...newMealPlan, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={newMealPlan.description}
                  onChange={(e) => setNewMealPlan({ ...newMealPlan, description: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  Price
                </Label>
                <Input
                  id="price"
                  value={newMealPlan.price}
                  onChange={(e) => setNewMealPlan({ ...newMealPlan, price: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="mealsPerDay" className="text-right">
                  Meals per Day
                </Label>
                <Select
                  value={newMealPlan.mealsPerDay?.toString()}
                  onValueChange={(value) => setNewMealPlan({ ...newMealPlan, mealsPerDay: parseInt(value) })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select meals per day" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Menu Items</Label>
                <div className="col-span-3 space-y-4">
                  <div className="flex gap-2">
                    <Select
                      value={newMenuItem.mealType}
                      onValueChange={(value) => setNewMenuItem({ ...newMenuItem, mealType: value as keyof Menu })}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select meal type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="breakfast">Breakfast</SelectItem>
                        <SelectItem value="lunch">Lunch</SelectItem>
                        <SelectItem value="dinner">Dinner</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      value={newMenuItem.item}
                      onChange={(e) => setNewMenuItem({ ...newMenuItem, item: e.target.value })}
                      placeholder="Enter menu item"
                    />
                    <Button onClick={handleAddMenuItem}>Add</Button>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Breakfast</h4>
                    <div className="flex flex-wrap gap-2">
                      {newMealPlan.menu?.breakfast.map((item, index) => (
                        <Badge key={index} variant="secondary">
                          {item}
                          <button
                            className="ml-1 hover:text-red-500"
                            onClick={() => handleRemoveMenuItem("breakfast", item)}
                          >
                            ×
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Lunch</h4>
                    <div className="flex flex-wrap gap-2">
                      {newMealPlan.menu?.lunch.map((item, index) => (
                        <Badge key={index} variant="secondary">
                          {item}
                          <button
                            className="ml-1 hover:text-red-500"
                            onClick={() => handleRemoveMenuItem("lunch", item)}
                          >
                            ×
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Dinner</h4>
                    <div className="flex flex-wrap gap-2">
                      {newMealPlan.menu?.dinner.map((item, index) => (
                        <Badge key={index} variant="secondary">
                          {item}
                          <button
                            className="ml-1 hover:text-red-500"
                            onClick={() => handleRemoveMenuItem("dinner", item)}
                          >
                            ×
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddMealPlanDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddMealPlan}>Create Meal Plan</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mealPlans.map((plan) => (
          <Card key={plan.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{plan.name}</span>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{plan.status}</Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleEditMealPlan(plan.id, { status: "Active" })}>
                        Set Status: Active
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEditMealPlan(plan.id, { status: "Inactive" })}>
                        Set Status: Inactive
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => handleDeleteMealPlan(plan.id)}
                      >
                        Delete Meal Plan
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Price</span>
                  <span className="text-sm">{plan.price}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Meals per Day</span>
                  <span className="text-sm">{plan.mealsPerDay}</span>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Menu</h4>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm font-medium">Breakfast:</span>
                      <ul className="mt-1 list-inside list-disc text-sm text-muted-foreground">
                        {plan.menu.breakfast.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Lunch:</span>
                      <ul className="mt-1 list-inside list-disc text-sm text-muted-foreground">
                        {plan.menu.lunch.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Dinner:</span>
                      <ul className="mt-1 list-inside list-disc text-sm text-muted-foreground">
                        {plan.menu.dinner.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 