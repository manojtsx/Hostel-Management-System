import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addEvent, deleteEvent, editEvent } from "./CalendarServer";
import { toast } from "sonner";

export default function useCalendarMutations() {
    const queryClient = useQueryClient();
    
    const { mutateAsync: createEvent, isPending: isCreatingEvent } = useMutation({
        mutationFn: async (data: string) => {
            return await addEvent(data)
        },
        onSuccess: (data) => {
            if (data.success) {
                toast.success("Event created successfully.")
                queryClient.invalidateQueries({ queryKey: ["events"] })
                queryClient.invalidateQueries({ queryKey: ["calendar-events"] })
            } else {
                toast.error(data.message)
            }
        },
        onError: (error) => {
            toast.error(error.message)
        }
    });

    const { mutateAsync: updateEvent, isPending: isUpdatingEvent } = useMutation({
        mutationFn: async (data: string) => {
            return await editEvent(data)
        },
        onSuccess: (data) => {
            if (data.success) {
                toast.success("Event updated successfully.")
                queryClient.invalidateQueries({ queryKey: ["events"] })
                queryClient.invalidateQueries({ queryKey: ["calendar-events"] })
            } else {
                toast.error(data.message)
            }
        },
        onError: (error) => {
            toast.error(error.message)
        }
    });

    const { mutateAsync: removeEvent, isPending: isRemovingEvent } = useMutation({
        mutationFn: async (eventId: string) => {
            return await deleteEvent(eventId)
        },
        onSuccess: (data) => {
            if (data.success) {
                toast.success("Event deleted successfully.")
                queryClient.invalidateQueries({ queryKey: ["events"] })
                queryClient.invalidateQueries({ queryKey: ["calendar-events"] })
            } else {
                toast.error(data.message)
            }
        },
        onError: (error) => {
            toast.error(error.message)
        }
    });

    return {
        createEvent,
        isCreatingEvent,
        updateEvent,
        isUpdatingEvent,
        removeEvent,
        isRemovingEvent
    }
} 