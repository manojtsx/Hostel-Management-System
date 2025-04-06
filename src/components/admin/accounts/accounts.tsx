"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  MoreVertical,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
import { useState } from "react"

interface Transaction {
  id: number
  date: string
  description: string
  category: string
  amount: number
  type: "Credit" | "Debit"
  status: "Completed" | "Pending" | "Failed"
}

export function AccountsManagement() {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 1,
      date: "2024-03-15",
      description: "Room Rent Collection",
      category: "Income",
      amount: 50000,
      type: "Credit",
      status: "Completed",
    },
    {
      id: 2,
      date: "2024-03-14",
      description: "Electricity Bill",
      category: "Utility",
      amount: 15000,
      type: "Debit",
      status: "Completed",
    },
    {
      id: 3,
      date: "2024-03-13",
      description: "Maintenance Work",
      category: "Maintenance",
      amount: 8000,
      type: "Debit",
      status: "Pending",
    },
    {
      id: 4,
      date: "2024-03-12",
      description: "Meal Plan Fees",
      category: "Income",
      amount: 25000,
      type: "Credit",
      status: "Completed",
    },
  ])

  const [isAddTransactionDialogOpen, setIsAddTransactionDialogOpen] = useState(false)
  const [isIncome, setIsIncome] = useState(true)
  const [newTransaction, setNewTransaction] = useState<Partial<Transaction>>({
    date: new Date().toISOString().split("T")[0],
    description: "",
    category: "",
    amount: 0,
    type: "Credit",
    status: "Pending",
  })

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-500"
      case "pending":
        return "bg-yellow-500"
      case "failed":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getAmountColor = (type: string) => {
    return type.toLowerCase() === "credit" ? "text-green-600" : "text-red-600"
  }

  const handleAddTransaction = () => {
    if (!newTransaction.description || !newTransaction.category || !newTransaction.amount) return

    const transaction: Transaction = {
      id: transactions.length + 1,
      date: newTransaction.date || new Date().toISOString().split("T")[0],
      description: newTransaction.description,
      category: newTransaction.category,
      amount: newTransaction.amount,
      type: isIncome ? "Credit" : "Debit",
      status: "Pending",
    }

    setTransactions([...transactions, transaction])
    setNewTransaction({
      date: new Date().toISOString().split("T")[0],
      description: "",
      category: "",
      amount: 0,
      type: "Credit",
      status: "Pending",
    })
    setIsAddTransactionDialogOpen(false)
  }

  const handleEditTransaction = (transactionId: number, updates: Partial<Transaction>) => {
    setTransactions(transactions.map(transaction => 
      transaction.id === transactionId ? { ...transaction, ...updates } : transaction
    ))
  }

  const handleDeleteTransaction = (transactionId: number) => {
    setTransactions(transactions.filter(transaction => transaction.id !== transactionId))
  }

  const calculateTotalBalance = () => {
    return transactions.reduce((total, transaction) => {
      return transaction.type === "Credit" 
        ? total + transaction.amount 
        : total - transaction.amount
    }, 0)
  }

  const calculateMonthlyIncome = () => {
    const currentMonth = new Date().getMonth()
    return transactions
      .filter(transaction => 
        new Date(transaction.date).getMonth() === currentMonth && 
        transaction.type === "Credit"
      )
      .reduce((total, transaction) => total + transaction.amount, 0)
  }

  const calculateMonthlyExpenses = () => {
    const currentMonth = new Date().getMonth()
    return transactions
      .filter(transaction => 
        new Date(transaction.date).getMonth() === currentMonth && 
        transaction.type === "Debit"
      )
      .reduce((total, transaction) => total + transaction.amount, 0)
  }

  const calculatePendingPayments = () => {
    return transactions
      .filter(transaction => transaction.status === "Pending")
      .reduce((total, transaction) => total + transaction.amount, 0)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Accounts</h1>
          <p className="text-muted-foreground">
            Manage hostel finances and transactions
          </p>
        </div>
        <div className="space-x-2">
          <Dialog open={isAddTransactionDialogOpen} onOpenChange={setIsAddTransactionDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" onClick={() => setIsIncome(false)}>
                <TrendingDown className="mr-2 h-4 w-4" />
                Record Expense
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Record New Expense</DialogTitle>
                <DialogDescription>
                  Fill in the details to record a new expense
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="date" className="text-right">
                    Date
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={newTransaction.date}
                    onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Input
                    id="description"
                    value={newTransaction.description}
                    onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">
                    Category
                  </Label>
                  <Select
                    value={newTransaction.category}
                    onValueChange={(value) => setNewTransaction({ ...newTransaction, category: value })}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Utility">Utility</SelectItem>
                      <SelectItem value="Maintenance">Maintenance</SelectItem>
                      <SelectItem value="Staff">Staff</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="amount" className="text-right">
                    Amount
                  </Label>
                  <Input
                    id="amount"
                    type="number"
                    value={newTransaction.amount}
                    onChange={(e) => setNewTransaction({ ...newTransaction, amount: Number(e.target.value) })}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddTransactionDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddTransaction}>Record Expense</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog open={isAddTransactionDialogOpen} onOpenChange={setIsAddTransactionDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setIsIncome(true)}>
                <TrendingUp className="mr-2 h-4 w-4" />
                Record Income
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Record New Income</DialogTitle>
                <DialogDescription>
                  Fill in the details to record a new income
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="date" className="text-right">
                    Date
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={newTransaction.date}
                    onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Input
                    id="description"
                    value={newTransaction.description}
                    onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">
                    Category
                  </Label>
                  <Select
                    value={newTransaction.category}
                    onValueChange={(value) => setNewTransaction({ ...newTransaction, category: value })}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Room Rent">Room Rent</SelectItem>
                      <SelectItem value="Meal Plan">Meal Plan</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="amount" className="text-right">
                    Amount
                  </Label>
                  <Input
                    id="amount"
                    type="number"
                    value={newTransaction.amount}
                    onChange={(e) => setNewTransaction({ ...newTransaction, amount: Number(e.target.value) })}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddTransactionDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddTransaction}>Record Income</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{calculateTotalBalance().toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Current balance
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Monthly Income</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">₹{calculateMonthlyIncome().toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Monthly Expenses</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">₹{calculateMonthlyExpenses().toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{calculatePendingPayments().toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {transactions.filter(t => t.status === "Pending").length} transactions
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>
            View and manage financial transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-2">
                      {transaction.type === "Credit" ? (
                        <ArrowUpRight className="h-4 w-4 text-green-500" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 text-red-500" />
                      )}
                      <span>{transaction.description}</span>
                    </div>
                  </TableCell>
                  <TableCell>{transaction.category}</TableCell>
                  <TableCell className={getAmountColor(transaction.type)}>
                    ₹{transaction.amount.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(transaction.status)}>
                      {transaction.status}
                    </Badge>
                  </TableCell>
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
                        <DropdownMenuItem onClick={() => handleEditTransaction(transaction.id, { status: "Completed" })}>
                          Mark as Completed
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditTransaction(transaction.id, { status: "Pending" })}>
                          Mark as Pending
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditTransaction(transaction.id, { status: "Failed" })}>
                          Mark as Failed
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleDeleteTransaction(transaction.id)}
                        >
                          Delete Transaction
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