import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Utensils,
  Calendar,
  Clock,
  AlertCircle,
  CreditCard,
} from "lucide-react"

export function StudentMealPlans() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Meal Plans</h1>
        <p className="text-muted-foreground">
          Manage your meal plans and dining schedule
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Current Plan</CardTitle>
            <CardDescription>Your active meal plan details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <Utensils className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Premium Plan</p>
                <p className="text-sm text-muted-foreground">
                  3 meals per day
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Valid Until</p>
                <p className="text-sm text-muted-foreground">
                  December 31, 2024
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Dining Hours</p>
                <p className="text-sm text-muted-foreground">
                  Breakfast: 7-9 AM
                  <br />
                  Lunch: 12-2 PM
                  <br />
                  Dinner: 7-9 PM
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Changes</CardTitle>
            <CardDescription>Schedule modifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <AlertCircle className="h-5 w-5 text-yellow-500" />
                <div>
                  <p className="font-medium">Dining Hall Closure</p>
                  <p className="text-sm text-muted-foreground">
                    March 20, 2024 (Maintenance)
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <AlertCircle className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="font-medium">Special Menu</p>
                  <p className="text-sm text-muted-foreground">
                    March 25, 2024 (Festival)
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
          <CardDescription>Your meal plan payments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <CreditCard className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Premium Plan Renewal</p>
                  <p className="text-sm text-muted-foreground">
                    January 1, 2024
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">₹15,000</p>
                <p className="text-sm text-green-500">Paid</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <CreditCard className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Initial Plan</p>
                  <p className="text-sm text-muted-foreground">
                    August 1, 2023
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">₹15,000</p>
                <p className="text-sm text-green-500">Paid</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 