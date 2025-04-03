import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Plus, Edit2, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function MealPlansManagement() {
  // Sample data - replace with actual data from your backend
  const mealPlans = [
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
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Meal Plans</h1>
          <p className="text-muted-foreground">
            Manage hostel meal plans and menus
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Meal Plan
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mealPlans.map((plan) => (
          <Card key={plan.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{plan.name}</span>
                <Badge variant="outline">{plan.status}</Badge>
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
                <div className="flex justify-end space-x-2">
                  <Button variant="ghost" size="icon">
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 