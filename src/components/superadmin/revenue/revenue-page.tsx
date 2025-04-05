"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Search, TrendingUp, CreditCard, Users, Calendar, DollarSign, AlertCircle, Plus, LucideIcon } from "lucide-react"
import { useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface RevenueStat {
  title: string
  value: string
  description: string
  icon: LucideIcon
  trend: "up" | "down"
}

interface Subscription {
  id: number
  hostelName: string
  plan: "Basic" | "Premium" | "Enterprise"
  amount: string
  status: "Active" | "Pending" | "Cancelled" | "Expired"
  nextBilling: string
  startDate: string
  paymentMethod: string
}

interface Payment {
  id: number
  hostelName: string
  amount: string
  date: string
  status: "Completed" | "Pending" | "Failed"
  paymentMethod: string
  description: string
}

export default function RevenuePage() {
  const [revenueStats] = useState<RevenueStat[]>([
    {
      title: "Total Revenue",
      value: "$45,231.89",
      description: "+20.1% from last month",
      icon: TrendingUp,
      trend: "up",
    },
    {
      title: "Active Subscriptions",
      value: "2350",
      description: "+180 from last month",
      icon: CreditCard,
      trend: "up",
    },
    {
      title: "Active Hostels",
      value: "573",
      description: "+12 from last month",
      icon: Users,
      trend: "up",
    },
    {
      title: "Pending Payments",
      value: "$2,450.00",
      description: "5 pending payments",
      icon: AlertCircle,
      trend: "down",
    },
  ])

  const [subscriptions] = useState<Subscription[]>([
    {
      id: 1,
      hostelName: "Sunrise Residency",
      plan: "Premium",
      amount: "$99.99",
      status: "Active",
      nextBilling: "2024-04-15",
      startDate: "2024-01-01",
      paymentMethod: "Credit Card",
    },
    {
      id: 2,
      hostelName: "Green Valley Hostel",
      plan: "Basic",
      amount: "$49.99",
      status: "Active",
      nextBilling: "2024-04-20",
      startDate: "2024-02-01",
      paymentMethod: "Bank Transfer",
    },
  ])

  const [payments, setPayments] = useState<Payment[]>([
    {
      id: 1,
      hostelName: "Sunrise Residency",
      amount: "$99.99",
      date: "2024-03-15",
      status: "Completed",
      paymentMethod: "Credit Card",
      description: "Monthly subscription payment",
    },
    {
      id: 2,
      hostelName: "Green Valley Hostel",
      amount: "$49.99",
      date: "2024-03-14",
      status: "Pending",
      paymentMethod: "Bank Transfer",
      description: "Initial setup payment",
    },
  ])

  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false)
  const [newPayment, setNewPayment] = useState({
    hostelName: "",
    amount: "",
    paymentMethod: "",
    description: "",
  })

  const handleAddPayment = () => {
    const payment: Payment = {
      id: payments.length + 1,
      hostelName: newPayment.hostelName,
      amount: newPayment.amount,
      date: new Date().toISOString().split('T')[0],
      status: "Pending",
      paymentMethod: newPayment.paymentMethod,
      description: newPayment.description,
    }
    setPayments([payment, ...payments])
    setIsPaymentDialogOpen(false)
    setNewPayment({
      hostelName: "",
      amount: "",
      paymentMethod: "",
      description: "",
    })
  }

  const filteredSubscriptions = subscriptions.filter((subscription) => {
    const matchesSearch = subscription.hostelName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === "all" || subscription.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: Subscription["status"] | Payment["status"]) => {
    switch (status) {
      case "Active":
      case "Completed":
        return <Badge variant="default">{status}</Badge>
      case "Pending":
        return <Badge variant="secondary">{status}</Badge>
      case "Cancelled":
      case "Failed":
        return <Badge variant="destructive">{status}</Badge>
      case "Expired":
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPlanBadge = (plan: Subscription["plan"]) => {
    switch (plan) {
      case "Basic":
        return <Badge variant="outline">Basic</Badge>
      case "Premium":
        return <Badge variant="default">Premium</Badge>
      case "Enterprise":
        return <Badge variant="secondary">Enterprise</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Revenue & Subscription</h1>
          <p className="text-muted-foreground">Track revenue and manage subscriptions</p>
        </div>
        <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Payment
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Payment</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="hostelName">Hostel Name</Label>
                <Input
                  id="hostelName"
                  value={newPayment.hostelName}
                  onChange={(e) => setNewPayment({ ...newPayment, hostelName: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  value={newPayment.amount}
                  onChange={(e) => setNewPayment({ ...newPayment, amount: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="paymentMethod">Payment Method</Label>
                <Select
                  value={newPayment.paymentMethod}
                  onValueChange={(value) => setNewPayment({ ...newPayment, paymentMethod: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Credit Card">Credit Card</SelectItem>
                    <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                    <SelectItem value="PayPal">PayPal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newPayment.description}
                  onChange={(e) => setNewPayment({ ...newPayment, description: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsPaymentDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddPayment}>Add Payment</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {revenueStats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search subscriptions..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Cancelled">Cancelled</SelectItem>
            <SelectItem value="Expired">Expired</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Hostel Name</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>Next Billing</TableHead>
              <TableHead>Payment Method</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSubscriptions.map((subscription) => (
              <TableRow key={subscription.id}>
                <TableCell className="font-medium">
                  {subscription.hostelName}
                </TableCell>
                <TableCell>{getPlanBadge(subscription.plan)}</TableCell>
                <TableCell>{subscription.amount}</TableCell>
                <TableCell>{getStatusBadge(subscription.status)}</TableCell>
                <TableCell>{subscription.startDate}</TableCell>
                <TableCell>{subscription.nextBilling}</TableCell>
                <TableCell>{subscription.paymentMethod}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon">
                    <DollarSign className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Calendar className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Recent Payments</h2>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Hostel Name</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium">{payment.hostelName}</TableCell>
                  <TableCell>{payment.amount}</TableCell>
                  <TableCell>{payment.date}</TableCell>
                  <TableCell>{getStatusBadge(payment.status)}</TableCell>
                  <TableCell>{payment.paymentMethod}</TableCell>
                  <TableCell>{payment.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
} 