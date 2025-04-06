"use client"

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
  Plus,
  Edit,
  Trash,
  CheckCircle,
  XCircle,
  Info,
} from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
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

interface MealPlan {
  id: string
  name: string
  mealsPerDay: number
  price: number
  validUntil: string
  status: "active" | "expired" | "pending"
}

interface DiningSchedule {
  id: string
  mealType: "breakfast" | "lunch" | "dinner"
  startTime: string
  endTime: string
  location: string
}

interface SpecialEvent {
  id: string
  title: string
  date: string
  type: "closure" | "special-menu" | "holiday"
  description: string
}

interface Payment {
  id: string
  planName: string
  amount: number
  date: string
  status: "paid" | "pending" | "failed"
  transactionId: string
}

export function StudentMealPlans() {
  const [currentPlan, setCurrentPlan] = useState<MealPlan>({
    id: "1",
    name: "Premium Plan",
    mealsPerDay: 3,
    price: 15000,
    validUntil: "2024-12-31",
    status: "active",
  })

  const [diningSchedule, setDiningSchedule] = useState<DiningSchedule[]>([
    {
      id: "1",
      mealType: "breakfast",
      startTime: "07:00",
      endTime: "09:00",
      location: "Main Dining Hall",
    },
    {
      id: "2",
      mealType: "lunch",
      startTime: "12:00",
      endTime: "14:00",
      location: "Main Dining Hall",
    },
    {
      id: "3",
      mealType: "dinner",
      startTime: "19:00",
      endTime: "21:00",
      location: "Main Dining Hall",
    },
  ])

  const [specialEvents, setSpecialEvents] = useState<SpecialEvent[]>([
    {
      id: "1",
      title: "Dining Hall Closure",
      date: "2024-03-20",
      type: "closure",
      description: "Maintenance work in the dining hall",
    },
    {
      id: "2",
      title: "Special Menu",
      date: "2024-03-25",
      type: "special-menu",
      description: "Festival special menu available",
    },
  ])

  const [payments, setPayments] = useState<Payment[]>([
    {
      id: "1",
      planName: "Premium Plan Renewal",
      amount: 15000,
      date: "2024-01-01",
      status: "paid",
      transactionId: "TXN123456",
    },
    {
      id: "2",
      planName: "Initial Plan",
      amount: 15000,
      date: "2023-08-01",
      status: "paid",
      transactionId: "TXN123455",
    },
  ])

  const [isChangePlanDialogOpen, setIsChangePlanDialogOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<Partial<MealPlan>>({
    name: "",
    mealsPerDay: 3,
    price: 0,
  })

  const handleChangePlan = () => {
    if (!selectedPlan.name || !selectedPlan.price) {
      toast.error("Please fill in all required fields")
      return
    }

    setCurrentPlan({
      id: Date.now().toString(),
      ...selectedPlan,
      validUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      status: "pending",
    } as MealPlan)

    setIsChangePlanDialogOpen(false)
    setSelectedPlan({ name: "", mealsPerDay: 3, price: 0 })
    toast.success("Meal plan change requested successfully")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "expired":
        return "bg-red-500"
      case "pending":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const getEventIcon = (type: string) => {
    switch (type) {
      case "closure":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      case "special-menu":
        return <Info className="h-5 w-5 text-blue-500" />
      case "holiday":
        return <Calendar className="h-5 w-5 text-yellow-500" />
      default:
        return <Info className="h-5 w-5 text-gray-500" />
    }
  }

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
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Current Plan</CardTitle>
                <CardDescription>Your active meal plan details</CardDescription>
              </div>
              <Dialog open={isChangePlanDialogOpen} onOpenChange={setIsChangePlanDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Edit className="mr-2 h-4 w-4" />
                    Change Plan
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Change Meal Plan</DialogTitle>
                    <DialogDescription>
                      Select your new meal plan
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="plan">Plan</Label>
                      <Select
                        value={selectedPlan.name}
                        onValueChange={(value) => setSelectedPlan({ ...selectedPlan, name: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a plan" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Basic Plan">Basic Plan (1 meal/day)</SelectItem>
                          <SelectItem value="Standard Plan">Standard Plan (2 meals/day)</SelectItem>
                          <SelectItem value="Premium Plan">Premium Plan (3 meals/day)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="price">Price (₹)</Label>
                      <Input
                        id="price"
                        type="number"
                        value={selectedPlan.price || ""}
                        onChange={(e) => setSelectedPlan({ ...selectedPlan, price: parseInt(e.target.value) })}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsChangePlanDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleChangePlan}>Request Change</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <Utensils className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">{currentPlan.name}</p>
                <p className="text-sm text-muted-foreground">
                  {currentPlan.mealsPerDay} meals per day
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Valid Until</p>
                <p className="text-sm text-muted-foreground">
                  {currentPlan.validUntil}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className={getStatusColor(currentPlan.status)}>
                {currentPlan.status}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Dining Schedule</CardTitle>
            <CardDescription>Daily meal timings and locations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {diningSchedule.map((schedule) => (
              <div key={schedule.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium capitalize">{schedule.mealType}</p>
                    <p className="text-sm text-muted-foreground">
                      {schedule.startTime} - {schedule.endTime}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {schedule.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Special Events</CardTitle>
            <CardDescription>Upcoming changes and special menus</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {specialEvents.map((event) => (
              <div key={event.id} className="flex items-center space-x-4">
                {getEventIcon(event.type)}
                <div>
                  <p className="font-medium">{event.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {event.date}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {event.description}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
            <CardDescription>Your meal plan payments</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {payments.map((payment) => (
              <div key={payment.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <CreditCard className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{payment.planName}</p>
                    <p className="text-sm text-muted-foreground">
                      {payment.date}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Transaction ID: {payment.transactionId}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">₹{payment.amount}</p>
                  <Badge
                    className={
                      payment.status === "paid"
                        ? "bg-green-500"
                        : payment.status === "pending"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }
                  >
                    {payment.status}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 