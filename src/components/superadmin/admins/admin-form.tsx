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
import { Plus, Edit2, Loader2 } from "lucide-react"
import { useState } from "react"
import { getHostels } from "./AdminServerAction"
import { useDebounce } from "@/lib/debounce"
import { useQuery } from "@tanstack/react-query"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const adminFormSchema = z.object({
  adminId : z.string().optional(),
  adminName: z.string().min(2, "Name must be at least 2 characters"),
  adminEmail: z.string().email("Invalid email address"),
  adminPhone: z.string().min(10, "Phone number must be at least 10 digits"),
  hostel: z.object({
    hostelId: z.string(),
    hostelName: z.string(),
    hostelAddress: z.string(),
  }),
})

type AdminFormValues = z.infer<typeof adminFormSchema>

interface Hostel {
  hostelId : string
  hostelName : string
  hostelAddress : string
}

interface AdminFormProps {
  mode: "add" | "edit"
  initialData?: {
    adminId: string
    adminName: string
    adminEmail: string
    adminPhone: string
    hostel: Hostel
  }
  onSubmit: (data: AdminFormValues) => void
}

export function AdminForm({ mode, initialData, onSubmit }: AdminFormProps) {
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const debouncedSearchQuery = useDebounce(searchQuery, 500)

  const { data: hostels, isLoading: isLoadingHostels } = useQuery({
    queryKey: ["hostels", debouncedSearchQuery],
    queryFn: () => getHostels(debouncedSearchQuery),
  })

  const form = useForm<AdminFormValues>({
    resolver: zodResolver(adminFormSchema),
    defaultValues: initialData || {
      adminId: "",
      adminEmail: "",
      adminName: "",
      adminPhone: "",
      hostel: {
        hostelId: "",
        hostelName: "",
        hostelAddress: "",
      },
    },
  })

  const handleSubmit = (data: AdminFormValues) => {
    //  close only if the submit is successful
    try{
      onSubmit(data)
      setOpen(false)
      form.reset()
    }catch(err){
      console.log(err);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={mode === "add" ? "default" : "ghost"} size={mode === "add" ? "default" : "icon"}>
          {mode === "add" ? (
            <>
              <Plus className="h-4 w-4 mr-2" />
              Add Admin
            </>
          ) : (
            <Edit2 className="h-4 w-4" />
          )}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{mode === "add" ? "Add New Admin" : "Edit Admin"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="adminName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter admin name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="adminEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter email address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="adminPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="Enter phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="hostel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hostel</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(hostelId) => {
                        const selectedHostel = hostels?.hostels?.find(h => h.hostelId === hostelId);
                        if (selectedHostel) {
                          field.onChange(selectedHostel);
                        }
                      }}
                      value={field.value?.hostelId || ""}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select hostel" />
                      </SelectTrigger>
                      <SelectContent>
                        <div className="p-2">
                          <Input
                            placeholder="Search hostels..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="mb-2"
                          />
                        </div>
                        {isLoadingHostels ? (
                          <div className="flex items-center justify-center p-2">
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            <span>Loading...</span>
                          </div>
                        ) : hostels?.hostels?.length === 0 ? (
                          <div className="p-2 text-sm text-muted-foreground text-center">
                            No hostels found
                          </div>
                        ) : (
                          hostels?.hostels?.map((hostel) => (
                            <SelectItem key={hostel.hostelId} value={hostel.hostelId}>
                              {hostel.hostelName} - {hostel.hostelAddress}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {mode === "add" ? "Add Admin" : "Save Changes"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
} 