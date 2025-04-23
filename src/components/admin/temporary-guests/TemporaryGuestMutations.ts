import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addTemporaryGuest, deleteTemporaryGuest, editTemporaryGuest, updateTemporaryGuestStatus } from "./TemporaryGuestServer"
import { toast } from "sonner"
import { GuestStatus } from "@prisma/client"

export default function useTemporaryGuestMutations() {
    const queryClient = useQueryClient()
    
    const { mutateAsync: createTemporaryGuest, isPending: isCreatingTemporaryGuest } = useMutation({
        mutationFn: async (data: string) => {
            return await addTemporaryGuest(data)
        },
        onSuccess: (data) => {
            if (data.success) {
                toast.success("Temporary guest created successfully.")
                queryClient.invalidateQueries({ queryKey: ["temporary-guests"] })
            } else {
                toast.error(data.message)
            }
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    const { mutateAsync: updateTemporaryGuest, isPending: isUpdatingTemporaryGuest } = useMutation({
        mutationFn: async (data: string) => {
            return await editTemporaryGuest(data)
        },
        onSuccess: (data) => {
            if (data.success) {
                toast.success("Temporary guest updated successfully.")
                queryClient.invalidateQueries({ queryKey: ["temporary-guests"] })
            } else {
                toast.error(data.message)
            }
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    const { mutateAsync: removeTemporaryGuest, isPending: isRemovingTemporaryGuest } = useMutation({
        mutationFn: async (guestId: string) => {
            return await deleteTemporaryGuest(guestId)
        },
        onSuccess: (data) => {
            if (data.success) {
                toast.success("Temporary guest deleted successfully.")
                queryClient.invalidateQueries({ queryKey: ["temporary-guests"] })
            } else {
                toast.error(data.message)
            }
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    const { mutateAsync: changeTemporaryGuestStatus, isPending: isUpdatingTemporaryGuestStatus } = useMutation({
        mutationFn: async ({ guestId, status }: { guestId: string, status: GuestStatus }) => {
            return await updateTemporaryGuestStatus(guestId, status)
        },
        onSuccess: (data) => {
            if (data.success) {
                toast.success("Temporary guest status updated successfully.")
                queryClient.invalidateQueries({ queryKey: ["temporary-guests"] })
            } else {
                toast.error(data.message)
            }
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    return {
        createTemporaryGuest,
        isCreatingTemporaryGuest,
        updateTemporaryGuest,
        isUpdatingTemporaryGuest,
        removeTemporaryGuest,
        isRemovingTemporaryGuest,
        changeTemporaryGuestStatus,
        isUpdatingTemporaryGuestStatus
    }
} 