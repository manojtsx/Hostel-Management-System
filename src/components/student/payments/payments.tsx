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
  CreditCard,
  Wallet,
  Receipt,
  Download,
  Plus,
  CheckCircle2,
  XCircle,
  Clock,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Payment {
  id: string
  date: string
  amount: number
  type: string
  status: "paid" | "pending" | "overdue"
  dueDate: string
  description: string
}

interface PaymentMethod {
  id: string
  type: "credit_card" | "debit_card" | "upi" | "net_banking"
  lastFour: string
  expiry: string
  isDefault: boolean
}

export function StudentPayments() {
  const [payments, setPayments] = useState<Payment[]>([
    {
      id: "1",
      date: "2024-03-01",
      amount: 5000,
      type: "Monthly Rent",
      status: "paid",
      dueDate: "2024-03-05",
      description: "March 2024 rent payment",
    },
    {
      id: "2",
      date: "2024-03-15",
      amount: 2000,
      type: "Meal Plan",
      status: "pending",
      dueDate: "2024-03-20",
      description: "March 2024 meal plan payment",
    },
    {
      id: "3",
      date: "2024-02-01",
      amount: 5000,
      type: "Monthly Rent",
      status: "paid",
      dueDate: "2024-02-05",
      description: "February 2024 rent payment",
    },
  ])

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: "1",
      type: "credit_card",
      lastFour: "4242",
      expiry: "12/25",
      isDefault: true,
    },
    {
      id: "2",
      type: "upi",
      lastFour: "1234",
      expiry: "",
      isDefault: false,
    },
  ])

  const [newPayment, setNewPayment] = useState<Partial<Payment>>({
    type: "",
    amount: 0,
    description: "",
  })

  const makePayment = () => {
    if (!newPayment.type || !newPayment.amount) {
      toast.error("Please fill in all required fields")
      return
    }

    const payment: Payment = {
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString(),
      amount: newPayment.amount!,
      type: newPayment.type!,
      status: "pending",
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      description: newPayment.description || "",
    }

    setPayments([...payments, payment])
    setNewPayment({ type: "", amount: 0, description: "" })
    toast.success("Payment initiated successfully")
  }

  const getStatusColor = (status: Payment["status"]) => {
    switch (status) {
      case "paid":
        return "bg-green-500"
      case "pending":
        return "bg-yellow-500"
      case "overdue":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusIcon = (status: Payment["status"]) => {
    switch (status) {
      case "paid":
        return <CheckCircle2 className="h-4 w-4" />
      case "pending":
        return <Clock className="h-4 w-4" />
      case "overdue":
        return <XCircle className="h-4 w-4" />
      default:
        return null
    }
  }

  const getPaymentMethodIcon = (type: PaymentMethod["type"]) => {
    switch (type) {
      case "credit_card":
      case "debit_card":
        return <CreditCard className="h-4 w-4" />
      case "upi":
      case "net_banking":
        return <Wallet className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Payments</h1>
        <p className="text-muted-foreground">
          View and manage your payments
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
            <CardDescription>Your recent payments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {payments.map((payment) => (
                <div
                  key={payment.id}
                  className="rounded-lg border p-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{payment.type}</h3>
                      <p className="text-sm text-muted-foreground">
                        {payment.description}
                      </p>
                    </div>
                    <Badge className={getStatusColor(payment.status)}>
                      <div className="flex items-center space-x-1">
                        {getStatusIcon(payment.status)}
                        <span>{payment.status}</span>
                      </div>
                    </Badge>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Date: {new Date(payment.date).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Due: {new Date(payment.dueDate).toLocaleDateString()}
                      </p>
                    </div>
                    <p className="font-medium">₹{payment.amount}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
            <CardDescription>Your saved payment methods</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div className="flex items-center space-x-4">
                    {getPaymentMethodIcon(method.type)}
                    <div>
                      <p className="font-medium">
                        {method.type === "credit_card" ||
                        method.type === "debit_card"
                          ? "Card"
                          : method.type.toUpperCase()}{" "}
                        ending in {method.lastFour}
                      </p>
                      {method.expiry && (
                        <p className="text-sm text-muted-foreground">
                          Expires {method.expiry}
                        </p>
                      )}
                    </div>
                  </div>
                  {method.isDefault && (
                    <Badge variant="secondary">Default</Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Make a Payment</CardTitle>
            <CardDescription>Initiate a new payment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="type">Payment Type</Label>
                <Select
                  value={newPayment.type}
                  onValueChange={(value) =>
                    setNewPayment({ ...newPayment, type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Monthly Rent">Monthly Rent</SelectItem>
                    <SelectItem value="Meal Plan">Meal Plan</SelectItem>
                    <SelectItem value="Maintenance">Maintenance</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  value={newPayment.amount}
                  onChange={(e) =>
                    setNewPayment({
                      ...newPayment,
                      amount: parseFloat(e.target.value),
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={newPayment.description}
                  onChange={(e) =>
                    setNewPayment({
                      ...newPayment,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <Button onClick={makePayment}>
                <Plus className="mr-2 h-4 w-4" />
                Make Payment
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Receipts</CardTitle>
            <CardDescription>Download your payment receipts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {payments
                .filter((payment) => payment.status === "paid")
                .map((payment) => (
                  <div
                    key={payment.id}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <div>
                      <p className="font-medium">{payment.type}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(payment.date).toLocaleDateString()}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 