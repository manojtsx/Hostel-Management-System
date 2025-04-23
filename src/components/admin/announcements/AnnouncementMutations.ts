import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addAnnouncement, deleteAnnouncement, editAnnouncement, updateAnnouncementStatus } from "./AnnouncementServer";
import { toast } from "sonner";
import { AnnouncementStatus } from "@prisma/client";

export default function useAnnouncementMutations() {
    const queryClient = useQueryClient();
    
    const { mutateAsync: createAnnouncement, isPending: isCreatingAnnouncement } = useMutation({
        mutationFn: async (data: string) => {
            return await addAnnouncement(data)
        },
        onSuccess: (data) => {
            if (data.success) {
                toast.success("Announcement created successfully.")
                queryClient.invalidateQueries({ queryKey: ["announcements"] })
            } else {
                toast.error(data.message)
            }
        },
        onError: (error) => {
            toast.error(error.message)
        }
    });

    const { mutateAsync: updateAnnouncement, isPending: isUpdatingAnnouncement } = useMutation({
        mutationFn: async (data: string) => {
            return await editAnnouncement(data)
        },
        onSuccess: (data) => {
            if (data.success) {
                toast.success("Announcement updated successfully.")
                queryClient.invalidateQueries({ queryKey: ["announcements"] })
            } else {
                toast.error(data.message)
            }
        },
        onError: (error) => {
            toast.error(error.message)
        }
    });

    const { mutateAsync: removeAnnouncement, isPending: isRemovingAnnouncement } = useMutation({
        mutationFn: async (announcementId: string) => {
            return await deleteAnnouncement(announcementId)
        },
        onSuccess: (data) => {
            if (data.success) {
                toast.success("Announcement deleted successfully.")
                queryClient.invalidateQueries({ queryKey: ["announcements"] })
            } else {
                toast.error(data.message)
            }
        },
        onError: (error) => {
            toast.error(error.message)
        }
    });

    const { mutateAsync: changeAnnouncementStatus, isPending: isChangingStatus } = useMutation({
        mutationFn: async ({ announcementId, status }: { announcementId: string, status: AnnouncementStatus }) => {
            return await updateAnnouncementStatus(announcementId, status)
        },
        onSuccess: (data) => {
            if (data.success) {
                toast.success(data.message)
                queryClient.invalidateQueries({ queryKey: ["announcements"] })
            } else {
                toast.error(data.message)
            }
        },
        onError: (error) => {
            toast.error(error.message)
        }
    });

    return {
        createAnnouncement,
        isCreatingAnnouncement,
        updateAnnouncement,
        isUpdatingAnnouncement,
        removeAnnouncement,
        isRemovingAnnouncement,
        changeAnnouncementStatus,
        isChangingStatus
    }
} 