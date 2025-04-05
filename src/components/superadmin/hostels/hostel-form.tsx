"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Plus, Edit2 } from "lucide-react"
import { useState } from "react"

const hostelFormSchema = z.object({
  hostelId: z.string().optional(),
  hostelName: z.string().min(2, "Name must be at least 2 characters"),
  hostelAddress: z.string().min(5, "Address must be at least 5 characters"),
  totalRooms: z.coerce.number().min(1, "Must have at least 1 room"),
  totalBeds: z.coerce.number().min(1, "Must have at least 1 bed"),
  totalFloors: z.coerce.number().min(1, "Must have at least 1 floor"),
  hostelExpiryDate: z.date().refine((date) => date > new Date(), {
    message: "Hostel expiry date must be in the future",
  }),
})

type HostelFormValues = z.infer<typeof hostelFormSchema>

interface HostelFormProps {
  mode: "add" | "edit"
  initialData?: {
    hostelId: string
    hostelName: string
    hostelAddress: string
    totalRooms: number
    totalBeds: number
    totalFloors: number
    hostelExpiryDate: Date
  }
  onSubmit: (data: HostelFormValues) => void
}

export function HostelForm({ mode, initialData, onSubmit }: HostelFormProps) {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<HostelFormValues>({
    resolver: zodResolver(hostelFormSchema),
    defaultValues: initialData || {
      hostelId: "",
      hostelName: "",
      hostelAddress: "",
      totalRooms: 0,
      totalBeds: 0,
      totalFloors: 0,
      hostelExpiryDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
    },
  })

  const handleSubmit = (data: HostelFormValues) => {
    setIsLoading(true)
    // Convert the date string to a Date object
    const formattedData = {
      ...data,
      hostelExpiryDate: new Date(data.hostelExpiryDate)
    }
    onSubmit(formattedData)
    setOpen(false)
    form.reset()
    setIsLoading(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={mode === "add" ? "default" : "ghost"} size={mode === "add" ? "default" : "icon"}>
          {mode === "add" ? (
            <>
              <Plus className="h-4 w-4 mr-2" />
              Add Hostel
            </>
          ) : (
            <Edit2 className="h-4 w-4" />
          )}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{mode === "add" ? "Add New Hostel" : "Edit Hostel"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="hostelName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hostel Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter hostel name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="hostelAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter hostel address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="totalRooms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Rooms</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Enter total rooms" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="totalBeds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Beds</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Enter total beds" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="totalFloors"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Floors</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Enter total floors" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="hostelExpiryDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hostel Expiry Date</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      {...field}
                      value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''}
                      onChange={(e) => {
                        const date = new Date(e.target.value);
                        field.onChange(date);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            

            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {mode === "add" ? "Add Hostel" : "Save Changes"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
} 